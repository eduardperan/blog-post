import React, { ReactElement, useState } from "react";
import Button from "react-bootstrap/Button";
import { PostList, IPost, AddModal } from "./components";

export const HomePage = (): ReactElement => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  const handleOpenAddModal = (): void => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = (): void => {
    setIsAddModalOpen(false);
  };

  const handleAddPost = (newPost: IPost): void => {
    setPosts((prev) => [...prev, newPost]);
  };

  return (
    <React.Fragment>
      <Button
        className='w-100 my-3'
        variant='light'
        size='lg'
        onClick={handleOpenAddModal}
      >
        Create post
      </Button>
      {posts.length > 0 && <PostList posts={posts} setPosts={setPosts} />}
      <AddModal
        isVisible={isAddModalOpen}
        onAddPost={handleAddPost}
        onClose={handleCloseAddModal}
      />
    </React.Fragment>
  );
};

export default HomePage;
