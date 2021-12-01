import React, { ReactElement, useState, useEffect } from "react";
import { Post, IPost, SearchField } from "../";

export interface PaginationConfig {
  page: number;
  size: number;
}

export interface PostListProps {
  posts: IPost[];
  pagination: PaginationConfig;
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

export const PostList = (props: PostListProps): ReactElement => {
  const { posts, pagination, setPosts } = props;
  const [dataList, setDataList] = useState<IPost[]>([]);
  const [searchKey, setSearchKey] = useState<string>("");

  const handleDeletePost = (postId: React.Key): void => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  const handleUpdatePost = (updatedPost: IPost): void => {
    setPosts((prev) =>
      prev.reduce((newPost: IPost[], current: IPost) => {
        newPost.push(current.id === updatedPost.id ? updatedPost : current);
        return newPost;
      }, [])
    );
  };

  useEffect(
    function getPageDataList() {
      const start = (pagination.page - 1) * pagination.size;
      const end = pagination.page * pagination.size;
      let newPageDataList = posts;
      if (searchKey)
        newPageDataList = newPageDataList?.filter((data: IPost) =>
          Object.values(data).some((value) =>
            value?.toString().toLowerCase().includes(searchKey.toLowerCase())
          )
        );
      setDataList(newPageDataList.slice(start, end));
    },
    // eslint-disable-next-line
    [posts, searchKey, pagination]
  );

  return (
    <React.Fragment>
      <SearchField searchKey={searchKey} onSearchDocument={setSearchKey} />
      {dataList.map((post) => (
        <Post
          key={post.id}
          post={post}
          onDelete={handleDeletePost}
          onUpdate={handleUpdatePost}
        />
      ))}
    </React.Fragment>
  );
};

export default PostList;
