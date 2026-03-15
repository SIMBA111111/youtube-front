// types.ts
export interface IKeyboardLayout {
    rows: string[][];
    shiftRows?: string[][];
}

export interface IKeyboardProps {
    inputElement: HTMLInputElement | null;
    onClose?: () => void;
    onKeyPress?: (key: string) => void;
    isDraggable?: boolean;
}

export interface IPosition {
    x: number;
    y: number;
}