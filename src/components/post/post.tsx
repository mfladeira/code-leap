import { ReactNode } from 'react';
import styles from './post.module.css';
import Image from 'next/image';
import { Button } from '../button/button';
import { timeAgo } from '@/app/utils/timeAgo';

export type PostProps = Readonly<{
  title: string;
  children: ReactNode;
  belongsToUser?: boolean;
  username: string;
  date: string;
}>

export const Post = (props: PostProps) => {
  return (
    <div className={styles.post}>
      <header className={styles.header}>
        <h2 className={styles.title}>{props.title}</h2>
        {
          props.belongsToUser &&
          <div className={styles.buttonWrapper}>
            <Button variant='ghost'>
              <Image
                src={'/delete-icon.svg'}
                alt="Delete icon"
                width={32}
                height={30}
              />
            </Button>
            <Button variant='ghost'>
              <Image
                src={'/edit-icon.svg'}
                alt="Edit icon"
                width={32}
                height={30}
              />
            </Button>
          </div>
        }
      </header>
      <div className={styles.postContentWrapper}>
        <div className={styles.headerPost}>
          <span className={styles.username}>{props.username}</span>
          <span className={styles.date}>{timeAgo(props.date)}</span>
        </div>
        <div className={styles.contentPost}>
          {
            props.children
          }
        </div>
      </div>
    </div>
  )
}