'use client'

import styles from './post.module.css';
import Image from 'next/image';
import { Button } from '../button/button';
import { timeAgo } from '@/app/utils/timeAgo';
import { Modal } from '../modal/modal';
import { Card } from '../card/card';
import { Input } from '../input/input';
import { Label } from '../label/label';
import { TextArea } from '../textArea/textArea';
import { deletePost, editPost } from '@/services/posts';
import { useState } from 'react';

export type PostProps = Readonly<{
  id: number;
  title: string;
  content: string;
  username: string;
  created_datetime: string;
  belongsToUser?: boolean;
  onPostChange?: () => void;
}>

export const Post = (props: PostProps) => {
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDeletePost = async () => {
    await deletePost(props.id);
    setIsDeleteModalOpen(false);
    props.onPostChange?.();
  }

  const handleEditPost = async () => {
    await editPost(props.id, title, content);
    setIsEditModalOpen(false);
    props.onPostChange?.();
  }

  return (
    <div className={styles.post}>
      <header className={styles.header}>
        <h2 className={styles.title}>{props.title}</h2>
        {
          props.belongsToUser &&
          <div className={styles.modalWrapper}>
            <Button variant='ghost' onClick={() => setIsDeleteModalOpen(true)}>
              <Image
                src={'/delete-icon.svg'}
                alt="Delete icon"
                width={32}
                height={30}
              />
            </Button>
            <Modal open={isDeleteModalOpen}>
              <Card title='Are you sure you want to delete this item?'>
                <div className={styles.buttonWrapper}>
                  <Button variant='outline' onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                  <Button variant='danger' onClick={handleDeletePost}>Delete</Button>
                </div>
              </Card>
            </Modal>

            <Button variant='ghost' onClick={() => setIsEditModalOpen(true)}>
              <Image
                src={'/edit-icon.svg'}
                alt="Edit icon"
                width={32}
                height={30}
              />
            </Button>
            <Modal open={isEditModalOpen}>
              <Card title='Edit item'>
                <Label id={`title-${props.id}`} text='Title'></Label>
                <Input id={`title-${props.id}`} value={title} className='mt8 mb24' onChange={(e) => setTitle(e.target.value)}></Input>
                <Label id={`content-${props.id}`} text='Content' className='mb8'></Label>
                <TextArea id={`content-${props.id}`} value={content} onChange={(e) => setContent(e.target.value)}></TextArea>
                <div className={styles.buttonWrapper}>
                  <Button variant='outline' onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                  <Button variant='success' onClick={handleEditPost}>Save</Button>
                </div>
              </Card>
            </Modal>
          </div>
        }
      </header>

      <div className={styles.postContentWrapper}>
        <div className={styles.headerPost}>
          <span className={styles.username}>@{props.username}</span>
          <span className={styles.date}>{timeAgo(props.created_datetime)}</span>
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