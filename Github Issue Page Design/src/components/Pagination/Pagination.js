import React from 'react';
import ReactPaginate from "react-paginate";
import "./Pagination.css";


const Pagination =({issuePerPage, totalIssues, setCurrentPage})=>{

  const pageCount = Math.ceil(totalIssues / issuePerPage);

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  return(
    <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
  )
}

export default Pagination;