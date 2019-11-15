import React from 'react'

const Pagination = ({pages, fetch}) =>{
    console.log(pages)
    const { total,lastPage } = pages
    const page = parseInt(pages.page)
    if (pages){
        return(
            <React.Fragment>
                <hr />
                <nav style={{ display : 'flex', justifyContent: 'center'}}>
                    <ul className="pagination">
                        <li className={`page-item ${page===1 ? 'disabled' : ''}`}>
                        <a className="page-link" onClick={ () => fetch(page-1) }>Previous</a>
                        </li>
                        {page!==1 ? <li className="page-item"><a onClick={ () => fetch(page-1)} className="page-link">{page-1}</a></li> : ''}
                        <li className="page-item active" >
                        <a className="page-link">{page}</a>
                        </li>
                        {lastPage!==page ? <li className="page-item"><a onClick={ () => fetch(page+1)} className="page-link">{page+1}</a></li> : ''}
                        <li className={`page-item ${page===lastPage ? 'disabled' : ''}`}>
                        <a className="page-link" onClick={ () => fetch(page+1) }>Next</a>
                        </li>
                    </ul>
                </nav>
            </React.Fragment>
        )
    }
    else {
        return <div></div>
    }
   
}

export default Pagination