import React, { useState, useEffect, useRef } from 'react'
import { requestGifs } from '../services/requestGifs'
import defineColsGifs from '../services/defineColsGifs'
import sortGifs from '../services/sortGifs'
import GifsList from './GifsList'
import PageError from './PageError'
import './GifsSearch.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'


export default function GifsSearch({ params: {keyword} }) {
    const [currKeyword, setCurrKeyword] = useState(keyword)
    const [loading, setLoading] = useState(false)
    const [gifs, setGifs] = useState([])
    const [numCols, setNumCols] = useState(defineColsGifs(window.innerWidth))
    const [groupGifs, setGroupGifs] = useState([])
    const [offset, setOffset] = useState(0)
    const [logError, setLogError] = useState(false)
    const numGifs = 30

    if ("onhashchange" in window ) {
        if (decodeURI(window.location.href.match(/[^/]+$/)[0]) !== currKeyword) {
            setCurrKeyword(decodeURI(window.location.href.match(/[^/]+$/)[0]))
            setOffset(0)
        }
    }

    const prevKeywordRef = useRef();
    useEffect(() => {
        prevKeywordRef.current = currKeyword;
    }, [currKeyword]);
    const prevKeyword = prevKeywordRef.current;
    
    useEffect(() => {
        setLoading(true)
        requestGifs({ currKeyword, offset, numGifs })
        .then(response => {
            if (response.code) {
                setLogError(response)
            } else {
                setLogError(false)
                if (currKeyword !== prevKeyword) {
                    window.scroll(0, 0)
                    setGifs(response)
                } else {
                    setGifs(gifs.concat(response))
                }
            }
            window.setTimeout(() => setLoading(false), 500)
        })      
        .catch(() => {
            window.location.reload()
        })  
    }, [currKeyword, offset])

    useEffect(() => {
        setGroupGifs(sortGifs({ gifs, numCols }))
    }, [gifs, numCols])

    let loadMoreGifs = (e) => {
        e.preventDefault()
        setOffset(offset + numGifs)
        window.setTimeout( () => {
            window.scrollBy(0, 0.6 * window.innerHeight)
        }, 500)
    }

    window.addEventListener("resize", () => {
        const newNumCols = defineColsGifs(window.innerWidth);
        if (numCols !== newNumCols) {
        setNumCols(newNumCols)
        }
    })


    return (
        <div className="App-content text-center px-1 px-sm-2" > 
            {(loading) && (
                <div className="spinner position-fixed"> 
                    <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
            {(!logError) && (
                <div> 
                    <GifsList groupGifs={groupGifs} numCols={numCols} />
                    <div className="fixed-bottom" >
                        <button 
                            type="button" 
                            className="btn btn-dark mb-3"
                            onClick={loadMoreGifs}
                            disabled={loading}
                        >
                            more gifs <FontAwesomeIcon icon={faAngleDoubleRight} />
                        </button>
                    </div>
                </div>
            )}
            {(logError) && (
                <PageError logError={logError} />
            )}
        </div> 
    )    
}