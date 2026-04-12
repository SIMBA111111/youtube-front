// Spinner.tsx
import styles from "./styles.module.scss";

interface SpinnerProps {
    size?: number; // размер в пикселях
    color?: string; // цвет
    thickness?: number; // толщина линии
}

export const Spinner = ({ size = 40, color = "#007bff", thickness = 4 }: SpinnerProps) => {
    return (
        <div 
            className={styles.spinner}
            style={{
                width: size,
                height: size,
                borderWidth: thickness,
                borderColor: `${color}20`, // прозрачный цвет
                borderTopColor: color,
            }}
        />
    );
};