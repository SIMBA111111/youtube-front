    'use client';

    import { Dispatch, ReactNode, SetStateAction, useEffect, useRef, useState } from 'react';

    import { SearcherDropDown } from './dropdown/dropdown';

    import styles from './styles.module.scss';
    import { Svg } from '../Svg';

    type size = { mPrimary: 18 } | { mWhite: 18 } | { lPrimary: 24 };

    export interface IElement {
        id: string
        value: string
    }

    interface ISearcher {
        selectedElement: IElement
        setSelectedElement: Dispatch<SetStateAction<IElement>>
        getElementsByName: (name: string) => Promise<Array<IElement>>
        placeholder: string;
        addonLeft?: ReactNode;
        addonRight?: ReactNode;
        isActiveDefault?: boolean;
        facadeWord?: string;
    }

    export const Searcher: React.FC<ISearcher> = ({
        selectedElement,
        setSelectedElement,
        getElementsByName,
        placeholder,
        addonLeft,
        addonRight,
        isActiveDefault = true,
        facadeWord,
    }) => {
        const [isActive, setIsActive] = useState<boolean>(isActiveDefault);
        const [isVisible, setIsVisible] = useState<boolean>(true);
        const [value, setValue] = useState<string>(selectedElement.value || '');
        const [elements, setElements] = useState<Array<IElement> | null>([]);

        useEffect(() => {
            setValue(selectedElement.value || '')
        }, [selectedElement])

        const inputRef = useRef<HTMLInputElement>(null)

        const handleIsAvtive = async () => {
            setIsActive((prev: boolean) => !prev);
            setValue('');
        };

        const handleOnChange = async (value: string) => {
            setIsVisible(true);
            setValue(value);
        };

        const clearValue = async () => {
            setValue('')
            inputRef.current?.focus()
        }

        useEffect(() => {
            if (value.length > 2) {
                getElementsByName(value).then((data: IElement[] | string) => {
                    console.log('getElementsByName = ', data);
                    
                    if (Array.isArray(data)) {
                        setElements(data);
                    }
                });
            } else {
                setElements(null);
            }
        }, [value]);

        return (
            <div className={styles.input__container}>
                <div onClick={() => handleIsAvtive()} className={styles.addonLeft}>
                    {addonLeft}
                </div>
                <input
                    type="text"
                    placeholder={placeholder}
                    className={
                        styles.input
                    }
                    ref={inputRef}
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleOnChange(e.target.value)
                    }
                />
                {!isActive && (
                    <div onClick={() => handleIsAvtive()}>{facadeWord}</div>
                )}
                <div className={styles.addonRight}>
                    {addonRight}
                </div>
                <div className={styles.cross} onClick={clearValue}>
                    {value && <Svg name='cross'/>}
                </div>

                <SearcherDropDown
                    elements={elements}
                    setSelectedElement={setSelectedElement}
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                    isActive={isActive}
                    setValue={setValue}
                />
            </div>
        );
    };
