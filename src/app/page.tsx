"use client";

import { Card } from "@/components/card/card";
import styles from "./page.module.css";
import { Input } from "@/components/input/input";
import { Label } from "@/components/label/label";
import { TextArea } from "@/components/textArea/textArea";
import { Button } from "@/components/button/button";
import { Post, PostProps } from "@/components/post/post";
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { createPost, fetchPosts } from "@/services/posts";
import Image from "next/image";
import { logout } from "@/store/features/authSlice";
import { Spinner } from "@/components/loading/loading";


export default function Home() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const username = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const [posts, setPosts] = useState<PostProps[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loadPosts = async () => {
    setIsLoading(true);
    const posts = await fetchPosts();
    setPosts(posts);
    setIsLoading(false);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (!isAuthenticated || !username) {
      router.push('/signup');
    }
  }, [isAuthenticated, username, router]);

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
      <div className={`${styles.homeWrapper} pageAnimation`}>
        <header className={styles.header}>
          <h2>CodeLeap Network</h2>
          <Button variant='ghost' onClick={() => dispatch(logout())}>
            <Image
              src={'/logout-icon.svg'}
              alt="Logout icon"
              width={32}
              height={30}
            />
          </Button>
        </header>
        <div className={styles.content}>
          <Card title="What’s on your mind?">
            <Label id="title" text="Title" className="mb8"></Label>
            <Input id="title" placeholder="Hello world" value={title} onChange={(e) => setTitle(e.target.value)}></Input>

            <Label id="content" text="Content" className="mt24 mb8"></Label>
            <TextArea id="content" placeholder="Content here" className="mb24" value={content} onChange={(e) => setContent(e.target.value)}></TextArea>

            <div className={styles.buttonWrapper}>
              <Button variant="primary" onClick={handleCreatePost} disabled={title.length === 0 || content.length === 0}>Create</Button>
            </div>
          </Card>
          <div className={styles.postWrapper}>
            {
              isLoading ?
                <div className={styles.spinnerWrapper}>
                  <Spinner></Spinner>
                </div>
                :
                <>
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
                </>
            }
          </div>
        </div>
      </div>
    </main>
  );
}
