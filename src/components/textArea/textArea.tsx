import styles from './textArea.module.css';

export type TextAreaProps = Readonly<{
  id: string;
  value?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}>

export const TextArea = (props: TextAreaProps) => {
  return (
    <textarea
      id={props.id}
      onChange={props.onChange}
      className={`${styles.textArea} ${props.className}`}
      placeholder={props.placeholder}
      value={props.value}
    />
  )
}