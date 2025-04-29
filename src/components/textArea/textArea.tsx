import styles from './textArea.module.css';

export type TextAreaProps = Readonly<{
  id: string;
  value?: string;
  placeholder?: string;
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}>

export const TextArea = (props: TextAreaProps) => {
  return (
    <div className={styles.textAreaWrapper}>
      <label htmlFor={props.id} className={styles.label}>{props.label}</label>
      <textarea
        id={props.id}
        onChange={props.onChange}
        className={styles.textArea}
        placeholder={props.placeholder}
        value={props.value}
      />
    </div>
  )
}