import styles from './button.module.css';

export type ButtonProps = Readonly<{
  text: string;
  variant: 'primary' | 'success' | 'danger' | 'outline';
  disabled?: boolean;
  onClick?: () => void;
}>

export const Button = (props: ButtonProps) => {
  return (
    <button
      disabled={props.disabled}
      className={`${styles.button} ${styles[props.variant]}`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  )
}