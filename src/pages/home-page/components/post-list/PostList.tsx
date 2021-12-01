import React, { ReactElement, useState, useMemo } from "react";
import { Post, IPost, SearchField, Pagination } from "../";

export interface PostListProps {
  posts: IPost[];
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

export const PostList = (props: PostListProps): ReactElement => {
  const { posts, setPosts } = props;
  const [searchKey, setSearchKey] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(1);

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

  const data: { items: IPost[]; total: number } = useMemo(
    function getPageDataList() {
      const start = (currentPage - 1) * pageSize;
      const end = currentPage * pageSize;
      let newPageDataList = posts;

      if (searchKey)
        newPageDataList = newPageDataList?.filter((data: IPost) =>
          Object.values(data).some((value) =>
            value?.toString().toLowerCase().includes(searchKey.toLowerCase())
          )
        );

      const items = newPageDataList.slice(start, end);
      const total = newPageDataList.length;
      return { items, total };
    },
    // eslint-disable-next-line
    [posts, searchKey, currentPage, pageSize]
  );

  return (
    <React.Fragment>
      <SearchField searchKey={searchKey} onSearchDocument={setSearchKey} />
      {data.items.map((post) => (
        <Post
          key={post.id}
          post={post}
          onDelete={handleDeletePost}
          onUpdate={handleUpdatePost}
        />
      ))}
      {data.total > 0 && (
        <Pagination
          total={data.total}
          pageSize={pageSize}
          currentPage={currentPage}
          paginationNumber={5}
          onPageChanged={setCurrentPage}
          onSizeChange={setPageSize}
        />
      )}
    </React.Fragment>
  );
};

export default PostList;
