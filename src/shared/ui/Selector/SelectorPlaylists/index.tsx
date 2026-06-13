import { useState, useRef, useEffect, FC } from 'react';
import { Svg } from '../../Svg';
import styles from './styles.module.scss'
import { Text } from '../../Text';
import { CreatePlaylistModal } from '../../Modal/Modals/CreatePlaylistModal';


// Типы для опций
export interface IOption {
    value: string;
    label: string;
}

// Компонент дропдауна
interface IDropdownProps {
    options: IOption[];
    isOpen: boolean;
    onSelect: (option: IOption[]) => void;
    selectedOption?: IOption[];
    showFooter: boolean
}

const Dropdown: FC<IDropdownProps> = ({ 
    options, 
    isOpen, 
    onSelect, 
    selectedOption, 
    showFooter
}) => {
    const [tempSelected, setTempSelected] = useState<IOption[]>([]);
    const [optionsState, setOptionsState] = useState<IOption[]>([]);
    const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);

    useEffect(() => {
        if (options && options.length > 0) {
            setOptionsState([...options]); // создаем копию
        }
    }, [options]);

    useEffect(() => {
        if (isOpen) {
            setTempSelected(selectedOption || []);
        }

        return (
            setIsVisibleModal(false)
        )
    }, [isOpen, selectedOption]);

    if (!isOpen) return null;

    const handleCheckboxChange = (option: IOption, checked: boolean) => {
        if (checked) {
            setTempSelected(prev => [...prev, option]);
        } else {
            setTempSelected(prev => prev.filter(item => item.value !== option.value));
        }
    };

    const handleOk = () => {
        onSelect(tempSelected);
    };

    const handleCreatePlaylist = (e: React.MouseEvent) => {
        // e.stopPropagation(); // 🟢 ВАЖНО!
        // e.preventDefault();
        console.log('handleCreatePlaylist');
        setIsVisibleModal(true);
    };

    const handleVisibleCreatePlaylistModal = (newValue: boolean) => {
        setIsVisibleModal(newValue)
    }

    return (
        <div className={styles.options}>
            <div className={styles.options_container}>
                {optionsState.map((o: IOption) => (
                    <label key={o.value} className={styles.item}>
                        <input 
                            type="checkbox" 
                            className={styles.checkbox}
                            checked={tempSelected?.some(item => item.value === o.value)}
                            onChange={(e) => handleCheckboxChange(o, e.target.checked)}
                        />
                        <Text>{o.label}</Text>
                    </label>
                ))}
            </div>

            <div className={styles.footer}>
                {showFooter && (
                    <div className={styles.createPlaylist} onClick={handleCreatePlaylist}>
                        <Svg name='playlist' />
                        <Text>Новый плейлист</Text>
                    </div>
                )}
                <button className={styles.btn} onClick={handleOk}>
                    <Text>OK</Text>
                </button>
            </div>
            <CreatePlaylistModal 
                key={isVisibleModal ? 'open' : 'closed'}
                isVisibleModal={isVisibleModal} 
                setIsVisibleModal={handleVisibleCreatePlaylistModal}
                setOptionsState={setOptionsState}
            />
        </div>
    );
};

// Основной компонент селектора
interface ISelectorPlaylistProps {
    options: IOption[];
    placeholder?: string;
    onChange?: (option: IOption[]) => void;
    defaultValue?: IOption[];
    showFooter?: boolean
}

export const SelectorPlaylist: FC<ISelectorPlaylistProps> = ({ 
    options, 
    placeholder = 'Выберите вариант',
    onChange,
    defaultValue,
    showFooter = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<IOption[] | undefined>(defaultValue);
    const selectorRef = useRef<HTMLDivElement>(null);

    console.log('defaultValue = ', defaultValue);
    

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
    const handleSelect = (option: IOption[]) => {
        setSelectedOption(option);
        setIsOpen(false);
        onChange?.(option);
    };

    // Обработка нажатия на селектор
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div ref={selectorRef} style={{ position: 'relative', width: '350px' }} className={styles.selectorPlaylist}>
            <div
                onClick={toggleDropdown}
                style={{
                    padding: '8px 12px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '4px',
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
                <span style={{ color: selectedOption ? '' : '' }} className={styles.text}>
                    {selectedOption && selectedOption.length > 0 && (
                        selectedOption.map((o: IOption, index) => 
                            <span key={index}>{o.label + (selectedOption[++index] ? ', ' : '')}</span>
                    )) || placeholder}
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
                showFooter={showFooter}
            />
        </div>
    );
};