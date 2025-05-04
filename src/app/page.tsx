"use client";

import { Card } from "@/components/card/card";
import styles from "./page.module.css";
import { Input } from "@/components/input/input";
import { Label } from "@/components/label/label";
import { TextArea } from "@/components/textArea/textArea";
import { Button } from "@/components/button/button";
import { Post, PostProps } from "@/components/post/post";
import { useAppSelector } from '@/store/hooks'
import { useEffect, useState } from "react";
import { getItem } from "./utils/localStorageFunctions";
import { useRouter } from 'next/navigation'
import { createPost, fetchPosts } from "@/services/posts";


export default function Home() {
  const router = useRouter();

  const  name = useAppSelector((state) => state.auth.user);

  const username = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const [posts, setPosts] = useState<PostProps[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const loadPosts = async () => {
    const posts = await fetchPosts();
    setPosts(posts);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (!isAuthenticated || !username) {
      router.push('/signup');
    }
  }, [isAuthenticated, username]);

  const handleCreatePost = async () => {
    if (!title.trim() || !content.trim()) return;

    try {
      const data = await createPost(title, content, username);
      await loadPosts();
      setTitle('');
      setContent('');
      console.log('Post created:', data);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }

  return (
    <main className={styles.home}>
      <div className={styles.homeWrapper}>
        <header className={styles.header}>
          <h2>CodeLeap Network</h2>
        </header>
        <div className={styles.content}>
          <Card title="What’s on your mind?">
            <Label id="title" text="Title" className="mb8"></Label>
            <Input id="title" placeholder="Hello world" value={title} onChange={(e) => setTitle(e.target.value)}></Input>

            <Label id="content" text="Content" className="mt24 mb8"></Label>
            <TextArea id="content" placeholder="Content here" className="mb24" value={content} onChange={(e) => setContent(e.target.value)}></TextArea>

            <div className={styles.buttonWrapper}>
              <Button variant="primary" onClick={handleCreatePost}>Create</Button>
            </div>
          </Card>
          <div className={styles.postWrapper}>
            {
              posts.map(post => {
                return (
                  <Post
                    id={post.id}
                    key={post.id}
                    title={post.title}
                    belongsToUser={post.username === username}
                    username={post.username}
                    created_datetime={post.created_datetime}
                    content={post.content}
                    onPostChange={loadPosts}
                  >
                  </Post>
                )
              })
            }
          </div>
        </div>
      </div>
    </main>
  );
}
