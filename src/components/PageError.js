import React from 'react'
import { Link } from 'wouter'
import './PageError.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrown } from '@fortawesome/free-regular-svg-icons'

export default function PageError({ logError }) {
    return (
        <div className="page-error d-flex justify-content-center align-items-center text-center text-secondary" >
            <div className="alert" role="alert">
                <FontAwesomeIcon icon={faFrown} size="4x" />
                <h5 className="mt-3">ERROR {logError.code}</h5>
                <hr />
                <p>{logError.message}</p>
                <p>Try searching or go to  
                    <Link to={`/search/trending`}>
                        <a className="alert-link text-info" > GIFs home page</a>
                    </Link>
                </p>
            </div>                
        </div>
    )
}