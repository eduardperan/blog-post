import React, { ReactElement } from "react";

export interface IPost {
  id: number;
  title: string;
  description: string;
  dateCreated: Date;
}

export interface PostProps {
  post: IPost;
}

export const Post = (props: PostProps): ReactElement => {
  return <React.Fragment>{props.post.title}</React.Fragment>;
};

export default Post;
