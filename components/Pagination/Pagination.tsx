import ReactPaginate from "react-paginate";
import css from './Pagination.module.css';

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (selectedPage: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const handlePageClick = (event: { selected: number }) => {
        onPageChange(event.selected + 1);
    };

    if (totalPages <= 1) return null;

    return (
     <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={totalPages}
      previousLabel="<"
      renderOnZeroPageCount={null}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      />
    );
};

export default Pagination;