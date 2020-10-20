import React, { useState } from 'react'
import { Link } from 'wouter'
import defineWidthGifs from '../services/defineWidthGifs'
import GifsTagList from './GifsTagList'
import GifsUrlButton from './GifsUrlButton'
import './GifsList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'


export default function GifsList({ groupGifs, numCols}) {
  
    const [gifWidth, setGifWidth] = useState(defineWidthGifs(window.innerWidth, numCols))
    
    return (
        <div className="d-flex justify-content-between" >
            {
                groupGifs.map((col, ind) => {
                    return (
                        <div key={`Gifs-col-${ind + 1}`} >
                            {
                                col.map(({ id, title, originalHeight, originalWidth, url, path }) => {
                                    const gifHeight = gifWidth * originalHeight / originalWidth
                                    return (
                                        <div 
                                            tabIndex="0"
                                            className="card m-1 border-0" 
                                            key={id} 
                                            style={{ minWidth: "180px", maxWidth: "400px", height: gifHeight, background: "black" }} 
                                        >
                                            <img className="card-image w-100 h-100 rounded" src={url} alt={title} />                                            
                                            <div className="card-img-overlay" >
                                                <ul className="list-unstyled d-flex justify-content-center flex-wrap" >
                                                    <GifsTagList id={id} title={title} />
                                                </ul>
                                                <div className="wrapper">
                                                    <Link to={path} >
                                                        <a className="btn btn-primary m-1 py-0 px-1">
                                                            <FontAwesomeIcon icon={faExternalLinkAlt} />
                                                        </a> 
                                                    </Link>
                                                    <GifsUrlButton path={path} />
                                                </div>             
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}