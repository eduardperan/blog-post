import React, { ReactElement } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Stack from "react-bootstrap/Stack";

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
}

export const Post = ({
  post: { id, title, description },
  onDelete,
}: PostProps): ReactElement => {
  return (
    <Card className='my-3'>
      <Card.Header className='d-flex justify-content-end'>
        <CloseButton onClick={() => onDelete(id)} />
      </Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Stack direction='horizontal' gap={1}>
          <Button variant='outline-secondary'>View</Button>
          <Button variant='light'>Edit</Button>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default Post;
