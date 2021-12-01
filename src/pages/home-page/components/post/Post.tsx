import React, { ReactElement, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Stack from "react-bootstrap/Stack";
import { EditModal, DeleteModal } from "./components";

export interface IPostItem {
  title: string;
  description: string;
}

export interface IPost extends IPostItem {
  id: React.Key;
  dateCreated: Date;
}

export interface PostProps {
  post: IPost;
  onDelete: (postId: React.Key) => void;
  onUpdate: (post: IPost) => void;
}

export const Post = (props: PostProps): ReactElement => {
  const { post, onDelete: triggerDelete, onUpdate: triggerUpdate } = props;
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const handleDelete = (): void => {
    triggerDelete(post.id);
  };

  const handleOpenEditModal = (): void => {
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (): void => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseEditModal = (): void => {
    setIsEditModalOpen(false);
  };

  const handleClosedeleteModal = (): void => {
    setIsDeleteModalOpen(false);
  };

  return (
    <React.Fragment>
      <Card className='my-3'>
        <Card.Header className='d-flex justify-content-end'>
          <CloseButton onClick={handleOpenDeleteModal} />
        </Card.Header>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.description}</Card.Text>
          <Stack direction='horizontal' gap={1}>
            <Button variant='outline-secondary'>View</Button>
            <Button variant='light' onClick={handleOpenEditModal}>
              Edit
            </Button>
          </Stack>
        </Card.Body>
      </Card>
      <EditModal
        post={post}
        isVisible={isEditModalOpen}
        onEditPost={triggerUpdate}
        onClose={handleCloseEditModal}
      />
      <DeleteModal
        title={post.title}
        isVisible={isDeleteModalOpen}
        onDeletePost={handleDelete}
        onClose={handleClosedeleteModal}
      />
    </React.Fragment>
  );
};

export default Post;
