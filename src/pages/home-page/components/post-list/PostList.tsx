import React, { ReactElement, useState, useMemo } from "react";
import { sortText, sortDateTime } from "utils";
import { Post, SearchField, Pagination, SortSelect } from "../";
import { IPost } from "../post";
import { SortByOption, SortOrderOption, Sort } from "../sort-select";

const DEFAULT_SORT: Sort = {
  field: SortByOption.DATE_CREATED,
  order: SortOrderOption.DESC,
};

export interface PostListProps {
  posts: IPost[];
  setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
}

export const PostList = (props: PostListProps): ReactElement => {
  const { posts, setPosts } = props;
  const [searchKey, setSearchKey] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [sort, setSort] = useState<Sort>(DEFAULT_SORT);

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

      let sorter: (a: IPost, b: IPost) => number;
      let items = newPageDataList.slice(start, end);
      const total = newPageDataList.length;

      if (sort.field === SortByOption.TITLE) sorter = sortText("title");
      else sorter = sortDateTime("dateCreated");

      items = items.sort((a: IPost, b: IPost) => {
        if (sort.order === SortOrderOption.ASC) return sorter(a, b);
        else return sorter(b, a);
      });

      return { items, total };
    },
    [posts, searchKey, currentPage, pageSize, sort]
  );

  return (
    <React.Fragment>
      <div className='d-flex justify-content-between align-items-center'>
        <SortSelect sort={sort} onChange={setSort} />
        <div className='w-25'>
          <SearchField searchKey={searchKey} onSearchDocument={setSearchKey} />
        </div>
      </div>
      {data.items.map((post) => (
        <Post
          key={post.id}
          post={post}
          onDelete={handleDeletePost}
          onUpdate={handleUpdatePost}
        />
      ))}
      <Pagination
        total={data.total}
        pageSize={pageSize}
        currentPage={currentPage}
        paginationNumber={5}
        onPageChanged={setCurrentPage}
        onSizeChange={setPageSize}
      />
    </React.Fragment>
  );
};

export default PostList;
