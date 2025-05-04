import { PostType } from "@/types/post";

export const fetchPosts = async (): Promise<Array<PostType>> => {
  const response = await fetch("https://dev.codeleap.co.uk/careers/");
  const data = await response.json();
  return data.results;
};

export const createPost = async (title: string, content: string, username: string): Promise<{ title: string, content: string, username: string }> => {
  const response = await fetch('https://dev.codeleap.co.uk/careers/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      content,
      username
    }),
  });
  const data = await response.json();
  return data;
}

export const deletePost = async (id: number): Promise<void> => {
  await fetch(`https://dev.codeleap.co.uk/careers/${id}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const editPost = async (id: number, title: string, content: string): Promise<{ title: string, content: string }> => {
  const response = await fetch(`https://dev.codeleap.co.uk/careers/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      content,
    }),
  });
  const data = await response.json();
  return data;
}