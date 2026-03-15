import { IKeyboardLayout, IKeyboardProps, IPosition } from './types';

class VirtualKeyboard {
    private input: HTMLInputElement | null;
    private keyboardElement: HTMLDivElement | null = null;
    private isOpen: boolean = false;
    private isDraggable: boolean;
    private onClose?: () => void;
    private onKeyPress?: (key: string) => void;
    private position: IPosition = { x: 0, y: 0 };
    private isDragging: boolean = false;
    private dragOffset: IPosition = { x: 0, y: 0 };
    private currentLayout: IKeyboardLayout;
    private isShiftActive: boolean = false;

    private readonly defaultLayout: IKeyboardLayout = {
        rows: [
            ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
            ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"],
            ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
            ['Shift', 'Space', 'Backspace', 'Enter', 'Close']
        ],
        shiftRows: [
            ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}'],
            ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"'],
            ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?'],
            ['Shift', 'Space', 'Backspace', 'Enter', 'Close']
        ]
    };

    constructor(props: IKeyboardProps) {
        this.input = props.inputElement;
        this.isDraggable = props.isDraggable ?? true;
        this.onClose = props.onClose;
        this.onKeyPress = props.onKeyPress;
        this.currentLayout = this.defaultLayout;
        
        this.init();
    }

    private init(): void {
        this.createKeyboardElement();
        this.setupEventListeners();
    }

    private createKeyboardElement(): void {
        this.keyboardElement = document.createElement('div');
        this.keyboardElement.className = 'virtual-keyboard';
        this.keyboardElement.style.cssText = `
            display: none;
            position: fixed;
            background: #2d2d2d;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            z-index: 10000;
            user-select: none;
            font-family: 'Segoe UI', sans-serif;
            min-width: 600px;
        `;

        this.keyboardElement.innerHTML = this.generateKeyboardHTML();
        document.body.appendChild(this.keyboardElement);
    }

    private generateKeyboardHTML(): string {
        const layout = this.isShiftActive ? 
            this.currentLayout.shiftRows || this.currentLayout.rows : 
            this.currentLayout.rows;

        return `
            <div class="keyboard-header" style="
                padding: 8px 12px;
                background: #1a1a1a;
                border-radius: 8px 8px 0 0;
                cursor: ${this.isDraggable ? 'move' : 'default'};
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #fff;
            ">
                <span>Экранная клавиатура</span>
                <button class="keyboard-drag-handle" style="
                    background: none;
                    border: none;
                    color: #fff;
                    cursor: move;
                    font-size: 16px;
                ">⋮⋮</button>
            </div>
            <div class="keyboard-content" style="
                padding: 16px;
            ">
                ${layout.map(row => `
                    <div style="
                        display: flex;
                        justify-content: center;
                        gap: 6px;
                        margin-bottom: 6px;
                    ">
                        ${row.map(key => `
                            <button class="keyboard-key ${key === 'Space' ? 'space-key' : ''}" 
                                    data-key="${key}"
                                    style="
                                        min-width: ${key === 'Space' ? '200px' : key.length > 1 ? '70px' : '40px'};
                                        height: 40px;
                                        background: ${key === 'Close' ? '#dc3545' : '#3d3d3d'};
                                        border: none;
                                        border-radius: 4px;
                                        color: white;
                                        font-size: 14px;
                                        cursor: pointer;
                                        transition: background 0.2s;
                                        padding: 0 8px;
                                    "
                                    onmouseover="this.style.background='${key === 'Close' ? '#c82333' : '#4d4d4d'}'"
                                    onmouseout="this.style.background='${key === 'Close' ? '#dc3545' : '#3d3d3d'}'">
                                ${key}
                            </button>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
        `;
    }

    private setupEventListeners(): void {
        if (!this.keyboardElement) return;

        // Обработчики клавиш
        const keys = this.keyboardElement.querySelectorAll('.keyboard-key');
        keys.forEach(key => {
            key.addEventListener('click', (e) => {
                e.stopPropagation();
                const keyValue = (e.currentTarget as HTMLButtonElement).dataset.key;
                if (keyValue) this.handleKeyPress(keyValue);
            });
        });

        // Перетаскивание
        if (this.isDraggable) {
            const header = this.keyboardElement.querySelector('.keyboard-header');
            if (header) {
                header.addEventListener('mousedown', this.startDragging.bind(this));
            }
        }

        // Предотвращаем закрытие при клике на клавиатуру
        this.keyboardElement.addEventListener('mousedown', (e) => e.stopPropagation());
        
        // Глобальный обработчик для закрытия по клику вне клавиатуры
        document.addEventListener('mousedown', this.handleClickOutside.bind(this));
        document.addEventListener('mouseup', this.stopDragging.bind(this));
        document.addEventListener('mousemove', this.drag.bind(this));
    }

    private handleKeyPress(key: string): void {
        if (!this.input) return;

        switch (key) {
            case 'Backspace':
                this.input.value = this.input.value.slice(0, -1);
                break;
            case 'Space':
                this.input.value += ' ';
                break;
            case 'Enter':
                this.input.value += '\n';
                break;
            case 'Shift':
                this.toggleShift();
                break;
            case 'Close':
                this.hide();
                if (this.onClose) this.onClose();
                break;
            default:
                this.input.value += key;
        }

        // Триггерим события
        if (this.input.value !== undefined) {
            this.input.dispatchEvent(new Event('input', { bubbles: true }));
            this.input.dispatchEvent(new Event('change', { bubbles: true }));
        }

        if (this.onKeyPress) this.onKeyPress(key);
    }

    private toggleShift(): void {
        this.isShiftActive = !this.isShiftActive;
        if (this.keyboardElement) {
            const content = this.keyboardElement.querySelector('.keyboard-content');
            if (content) {
                content.innerHTML = this.generateKeyboardHTML().split('keyboard-content')[1] || '';
            }
            this.setupEventListeners(); // Переназначаем обработчики
        }
    }

    private startDragging(e: MouseEvent): void {
        if (!this.isDraggable || !this.keyboardElement) return;
        
        e.preventDefault();
        this.isDragging = true;
        
        const rect = this.keyboardElement.getBoundingClientRect();
        this.dragOffset = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
        
        this.keyboardElement.style.cursor = 'grabbing';
    }

    private drag(e: MouseEvent): void {
        if (!this.isDragging || !this.keyboardElement) return;
        
        e.preventDefault();
        
        const newX = e.clientX - this.dragOffset.x;
        const newY = e.clientY - this.dragOffset.y;
        
        // Ограничиваем перетаскивание в пределах окна
        const maxX = window.innerWidth - this.keyboardElement.offsetWidth;
        const maxY = window.innerHeight - this.keyboardElement.offsetHeight;
        
        this.position.x = Math.max(0, Math.min(newX, maxX));
        this.position.y = Math.max(0, Math.min(newY, maxY));
        
        this.keyboardElement.style.left = `${this.position.x}px`;
        this.keyboardElement.style.top = `${this.position.y}px`;
    }

    private stopDragging(): void {
        if (this.isDragging && this.keyboardElement) {
            this.isDragging = false;
            this.keyboardElement.style.cursor = 'default';
        }
    }

    private handleClickOutside(e: MouseEvent): void {
        if (!this.keyboardElement || !this.isOpen) return;
        
        if (!this.keyboardElement.contains(e.target as Node)) {
            // Можно реализовать автозакрытие, если нужно
            // this.hide();
        }
    }

    // Публичные методы
    public show(): void {
        if (this.keyboardElement) {
            this.keyboardElement.style.display = 'block';
            this.isOpen = true;
            
            // Центрируем при первом показе
            if (this.position.x === 0 && this.position.y === 0) {
                this.centerKeyboard();
            }
        }
    }

    public hide(): void {
        if (this.keyboardElement) {
            this.keyboardElement.style.display = 'none';
            this.isOpen = false;
        }
    }

    public toggle(): void {
        if (this.isOpen) {
            this.hide();
        } else {
            this.show();
        }
    }

    private centerKeyboard(): void {
        if (!this.keyboardElement) return;
        
        const width = this.keyboardElement.offsetWidth;
        const height = this.keyboardElement.offsetHeight;
        
        this.position = {
            x: (window.innerWidth - width) / 2,
            y: (window.innerHeight - height) / 2
        };
        
        this.keyboardElement.style.left = `${this.position.x}px`;
        this.keyboardElement.style.top = `${this.position.y}px`;
    }

    public destroy(): void {
        if (this.keyboardElement) {
            document.body.removeChild(this.keyboardElement);
            this.keyboardElement = null;
        }
        
        document.removeEventListener('mousedown', this.handleClickOutside.bind(this));
        document.removeEventListener('mouseup', this.stopDragging.bind(this));
        document.removeEventListener('mousemove', this.drag.bind(this));
    }

    public setInput(input: HTMLInputElement): void {
        this.input = input;
    }

    public get isKeyboardOpen(): boolean {
        return this.isOpen;
    }
}

export default VirtualKeyboard;