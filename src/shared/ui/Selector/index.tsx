import { useState, useRef, useEffect, FC } from 'react';

// Типы для опций
export interface IOption {
    value: string;
    label: string;
}

// Компонент дропдауна
interface IDropdownProps {
    options: IOption[];
    isOpen: boolean;
    onSelect: (option: IOption) => void;
    selectedOption?: IOption;
}

const Dropdown: FC<IDropdownProps> = ({ 
    options, 
    isOpen, 
    onSelect, 
    selectedOption 
}) => {
    if (!isOpen) return null;

    return (
        <ul style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            margin: 0,
            padding: 0,
            listStyle: 'none',
            backgroundColor: '#fff',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            zIndex: 1000,
            maxHeight: '200px',
            overflowY: 'auto'
        }}>
            {options.map((option) => (
                <li
                    key={option.value}
                    onClick={() => onSelect(option)}
                    style={{
                        padding: '8px 12px',
                        cursor: 'pointer',
                        backgroundColor: selectedOption?.value === option.value ? '#e6f7ff' : 'transparent',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f5f5f5';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 
                            selectedOption?.value === option.value ? '#e6f7ff' : 'transparent';
                    }}
                >
                    {option.label}
                </li>
            ))}
        </ul>
    );
};

// Основной компонент селектора
interface ISelectorProps {
    options: IOption[];
    placeholder?: string;
    onChange?: (option: IOption) => void;
    defaultValue?: IOption;
}

export const Selector: FC<ISelectorProps> = ({ 
    options, 
    placeholder = 'Выберите вариант',
    onChange,
    defaultValue 
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<IOption | undefined>(defaultValue);
    const selectorRef = useRef<HTMLDivElement>(null);

    // Закрытие дропдауна при клике вне компонента
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Обработка выбора опции
    const handleSelect = (option: IOption) => {
        setSelectedOption(option);
        setIsOpen(false);
        onChange?.(option);
    };

    // Обработка нажатия на селектор
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div ref={selectorRef} style={{ position: 'relative', width: '250px' }}>
            <div
                onClick={toggleDropdown}
                style={{
                    padding: '8px 12px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '4px',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#40a9ff';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#d9d9d9';
                }}
            >
                <span style={{ color: selectedOption ? '#000' : '#bfbfbf' }}>
                    {selectedOption?.label || placeholder}
                </span>
                <span style={{
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s'
                }}>
                    ▼
                </span>
            </div>
            
            <Dropdown
                options={options}
                isOpen={isOpen}
                onSelect={handleSelect}
                selectedOption={selectedOption}
            />
        </div>
    );
};