import React, { ReactElement, useState } from "react";
import Button from "react-bootstrap/Button";
import { Post, IPost, AddModal } from "./components";

export const HomePage = (): ReactElement => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const closeAddModal = (): void => {
    setIsAddModalOpen(false);
  };

  const handleAddPost = (newPost: IPost): void => {
    setPosts((prev) => [...prev, newPost]);
  };

  const handleDeletePost = (postId: React.Key): void => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  return (
    <React.Fragment>
      <Button
        className='w-100 my-3'
        variant='light'
        size='lg'
        onClick={() => setIsAddModalOpen(true)}
      >
        Create post
      </Button>
      <hr />
      {posts.map((post) => (
        <Post key={post.id} post={post} onDelete={handleDeletePost} />
      ))}
      <AddModal
        isVisible={isAddModalOpen}
        onAddPost={handleAddPost}
        onClose={closeAddModal}
      />
    </React.Fragment>
  );
};

export default HomePage;
