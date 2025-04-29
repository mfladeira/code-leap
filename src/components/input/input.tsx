import styles from './input.module.css';

export type InputProps = Readonly<{
  placeholder?: string;
  id: string;
  label: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}>

export const Input = (props: InputProps) => {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={props.id} className={styles.label}>
        {props.label}
      </label>
      <input
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        type="text"
        className={styles.input}
        placeholder={props.placeholder}
      />
    </div>
  )
}