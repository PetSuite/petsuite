import React from 'react'
import { Link } from 'react-router-dom'

export default function Breadcrumb({data}){
    return(
        <nav aria-label="breadcrumb" style={styles.container}>
            <ol className="breadcrumb">
                {data.map((item,index)=>{
                    return (
                        <React.Fragment key={index}>
                            {index !== data.length-1 
                                ?
                                <React.Fragment>
                                <Link to ={`${item.path}`}><li className="breadcrumb-item">{item.label}</li></Link>
                                     <span>&nbsp;/&nbsp;</span>
                                </React.Fragment>
                                :
                                <li className="breadcrumb-item active">{item.label}</li>
                            }
                        </React.Fragment>
                    )
                })}
            </ol>
        </nav>
    )
}
const styles = {
    container: {
        width: '100%',
        
    }
}