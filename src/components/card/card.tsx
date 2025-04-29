import {  ReactNode } from 'react';
import styles from './card.module.css';

export type CardProps = Readonly<{
  title: string;
  width: string;
  children: ReactNode
}>

export const Card = (props: CardProps) => {
  return (
    <div className={styles.card} style={{ width: props.width }}>
      <h2 className={styles.title}>{props.title}</h2>
      {
        props.children
      }
    </div>
  )
}