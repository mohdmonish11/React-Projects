import React, { useState } from 'react';
import isEmpty from 'lodash-es/isEmpty';
import Pagination from '../Pagination/Pagination';
import "./Result.css";


const Result =(apidata)=>{

  const [currentPage, setCurrentPage] = useState(0);
  const [issuePerPage] = useState(5);
  
  const pagesVisited = currentPage * issuePerPage;
  const currentIssues = (apidata.apidata).slice(pagesVisited, pagesVisited + issuePerPage);

  const result = currentIssues;

  return (
    <div>
      <div className="table">
        <table>
          <thead className="table-heading">
            <tr>
              <th>Img</th>
              <th>User</th>
              <th>Issues</th>
              <th>State</th>
              <th>Created At</th>
            </tr>
          </thead>
          {!isEmpty(result) && result.map(data => {
            const {title, state, created_at, id, html_url} = data;
            return(
              <tbody key={id}>
                <tr className="table-content">
                  <td><img src={data.user.avatar_url} height='50' width='50' alt='user'/></td>
                  <td>{data.user.login}</td>
                  <td><a href={html_url} target='_blank' rel="noreferrer">{title}</a></td>
                  <td>{state}</td>
                  <td>{created_at}</td>
                </tr>
              </tbody>
            )})
          }
        </table>
      </div>
        {!isEmpty(apidata) &&<Pagination issuePerPage={issuePerPage} 
        totalIssues={(apidata.apidata).length} setCurrentPage={setCurrentPage}/>}
    </div>
  
  )
}

export default Result;