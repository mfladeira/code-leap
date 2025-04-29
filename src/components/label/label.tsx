import styles from './label.module.css';

export type LabelProps = Readonly<{
  id: string;
  text: string;
  className?: string;
}>

export const Label = (props: LabelProps) => {
  return (
    <label htmlFor={props.id} className={`${styles.label} ${props.className}`}>
      {props.text}
    </label>
  )
}