import React, { ReactElement } from "react";

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
}

export const Post = (props: PostProps): ReactElement => {
  return <React.Fragment>{props.post.title}</React.Fragment>;
};

export default Post;
