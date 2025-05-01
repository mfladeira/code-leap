import { ReactNode } from 'react';
import styles from './button.module.css';

export type ButtonProps = Readonly<{
  children: ReactNode;
  variant: 'primary' | 'success' | 'danger' | 'outline' | 'ghost';
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
      {
        props.children
      }
    </button>
  )
}