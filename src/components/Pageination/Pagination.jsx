import s from "./Pagination.module.scss";

// Created using this video: https://www.youtube.com/watch?v=wAGIOCqS8tk
export const Pagination = ({ totalPosts, postsPerPage, setCurrentPage }) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className={s.Pageination}>
      {pages.map((page, index) => {
        return (
          <button key={index} onClick={() => setCurrentPage(page)}>
            {page}
          </button>
        );
      })}

      {/* <span>Forrige side</span>
      <span>side 1 / 3</span>
      <span>Næste side</span> */}
    </div>
  );
};
