import clsx from "clsx"
import { Text } from "../Text"

interface IOption {
    id: string
    name: string
}

interface IRadioButton {
    options: IOption[]
    name: string
    value?: string
    onChange?: (value: string) => void
    className: string
}

export const RadioButton: React.FC<IRadioButton> = ({
    options,
    name,
    value,
    onChange,
    className
}) => {
    return (
        <div className={clsx(className)}>
            {options?.map((option) => (
                <label key={option.id} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: 'pointer' }}>
                    <input
                        type="radio"
                        name={name}
                        value={option.id}
                        checked={value === option.id}
                        onChange={(e) => onChange?.(e.target.value)}
                    />
                    <Text>{option.name}</Text>
                </label>
            ))}
        </div>
    )
}