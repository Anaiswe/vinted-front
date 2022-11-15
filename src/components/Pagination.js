// import { useState } from "react";
const Pagination = ({ page, setPage }) => {
  //   const [page, setPage] = useState(1);
  return (
    <div className="button-page">
      <button onClick={() => setPage(page - 1)}>← Page précédente</button>
      <button onClick={() => setPage(page + 1)}>Page suivante →</button>
    </div>
  );
};

export default Pagination;
