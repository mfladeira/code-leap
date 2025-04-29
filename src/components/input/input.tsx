import styles from './input.module.css';

export type InputProps = Readonly<{
  placeholder?: string;
  id: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}>

export const Input = (props: InputProps) => {
  return (
    <input
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      type="text"
      className={`${styles.input} ${props.className}`}
      placeholder={props.placeholder}
    />
  )
}