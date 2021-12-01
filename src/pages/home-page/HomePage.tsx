import React, { ReactElement, useState } from "react";
import Button from "react-bootstrap/Button";
import { Post, IPost } from "./components";

export const HomePage = (): ReactElement => {
  const [posts, setPost] = useState<IPost[]>([]);

  return (
    <React.Fragment>
      <Button className='w-100 my-3' variant='light' size='lg'>
        Create post
      </Button>
      <hr />
      {posts.map((post) => {
        <Post key={post.id} post={post} />;
      })}
    </React.Fragment>
  );
};

export default HomePage;
