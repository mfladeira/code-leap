'use client'

import styles from './post.module.css';
import Image from 'next/image';
import { Button } from '../button/button';
import { timeAgo } from '@/app/utils/timeAgo';
import { Modal } from '../modal/modal';
import { Card } from '../card/card';
import * as Dialog from '@radix-ui/react-dialog';
import { Input } from '../input/input';
import { Label } from '../label/label';
import { TextArea } from '../textArea/textArea';

export type PostProps = Readonly<{
  title: string;
  content: string;
  belongsToUser?: boolean;
  username: string;
  date: string;
  onClickDeleteButton?: () => void;
  onClickSaveButton?: () => void;
}>

export const Post = (props: PostProps) => {
  return (
    <div className={styles.post}>
      <header className={styles.header}>
        <h2 className={styles.title}>{props.title}</h2>
        {
          props.belongsToUser &&
          <div className={styles.modalWrapper}>
            <Modal
              trigger={
                <Button variant='ghost'>
                  <Image
                    src={'/delete-icon.svg'}
                    alt="Delete icon"
                    width={32}
                    height={30}
                  />
                </Button>
              }
            >
              <Card title='Are you sure you want to delete this item?'>
                <div className={styles.buttonWrapper}>
                  <Dialog.Close asChild>
                    <Button variant='outline'>Cancel</Button>
                  </Dialog.Close>
                  <Button variant='danger' onClick={props.onClickDeleteButton}>Delete</Button>
                </div>
              </Card>
            </Modal>

            <Modal
              trigger={
                <Button variant='ghost'>
                  <Image
                    src={'/edit-icon.svg'}
                    alt="Edit icon"
                    width={32}
                    height={30}
                  />
                </Button>
              }
            >
              <Card title='Edit item'>
                <Label id='title' text='Title'></Label>
                <Input id='title' value={props.title} className='mt8 mb24' onChange={() => { }}></Input>
                <Label id='content' text='Content' className='mb8'></Label>
                <TextArea id='content' value={props.content} onChange={() => { }}></TextArea>
                <div className={styles.buttonWrapper}>
                  <Dialog.Close asChild>
                    <Button variant='outline'>Cancel</Button>
                  </Dialog.Close>
                  <Button variant='success' onClick={props.onClickSaveButton}>Save</Button>
                </div>
              </Card>
            </Modal>
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
            props.content
          }
        </div>
      </div>
    </div>
  )
}