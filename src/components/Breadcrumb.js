import React from 'react'

export default function Breadcrumb(){
    return(
        <nav aria-label="breadcrumb" style={styles.container}>
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item"><a href="#">Library</a></li>
                <li className="breadcrumb-item active" aria-current="page">Data</li>
            </ol>
        </nav>
    )
}
const styles = {
    container: {
        width: '100%',
        
    }
}