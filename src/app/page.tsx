import { Card } from "@/components/card/card";
import styles from "./page.module.css";
import { Input } from "@/components/input/input";
import { Label } from "@/components/label/label";
import { TextArea } from "@/components/textArea/textArea";
import { Button } from "@/components/button/button";
import { Post } from "@/components/post/post";
import { postMock } from "./postMock";

export default function Home() {
  return (
    <main className={styles.home}>
      <div className={styles.homeWrapper}>
        <header className={styles.header}>
          <h2>CodeLeap Network</h2>
        </header>
        <div className={styles.content}>
          <Card title="What’s on your mind?">
            <Label id="title" text="Title" className="mb8"></Label>
            <Input id="title" placeholder="Hello world"></Input>

            <Label id="content" text="Content" className="mt24 mb8"></Label>
            <TextArea id="content" placeholder="Content here" className="mb24"></TextArea>

            <div className={styles.buttonWrapper}>
              <Button children="Create" variant="primary"></Button>
            </div>
          </Card>
          <div className={styles.postWrapper}>
            {
              postMock.map(post => {
                return (
                  <Post
                    key={post.id}
                    title={post.title}
                    belongsToUser={post.belongsToUser}
                    username={post.username}
                    date={post.date}
                    children={post.children}
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
