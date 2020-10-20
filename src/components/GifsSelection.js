import React, { useEffect, useState } from 'react'
import { requestGifsById } from '../services/requestGifs'
import GifsUrlButton from './GifsUrlButton'
import GifsTagList from './GifsTagList'
import PageError from './PageError'
import './GifsSelection.css'


export default function GifsSelection({ params: { keyword } }) {
    const [id, setId] = useState(keyword.match(/\w+$/)[0])
    const [dataGif, setDataGif] = useState({ username: "", source: "", source_tld: "", title: "", url: "", path: ""})
    const [logError, setLogError] = useState(false)

    useEffect(() => {
        requestGifsById(id)
            .then(response => {
                if (response.code) {
                   setLogError(response)
                } else {
                    setLogError(false)
                    setDataGif(response)
                }
            })
            .catch(() => {
                window.location.reload()
            })  
    }, [id])   
    
    return (
        <div className="App-content px-2 px-sm-3">
            {(!logError) && (
                <div className="card mb-3" >
                    <img className="card-img-top" src={dataGif.url} alt={dataGif.title} />
                    <div className="card-body">
                        <h5 className="card-title pr-2">
                            {dataGif.title} <small className="align-top pr-5"><GifsUrlButton path={dataGif.path} /></small>
                        </h5>
                        <ul className="ml-n2 list-unstyled d-flex flex-wrap" >
                            <GifsTagList id={id} title={dataGif.title} />
                        </ul>                
                    </div>
                    {(dataGif.username || dataGif.source_tld) && (
                        <div className="card-footer">
                            Source: <a 
                                        href={dataGif.source ? dataGif.source : "#"} 
                                        target={dataGif.source ? "_blank" : "_self"} 
                                        className="card-link"
                                    > 
                                        {dataGif.username || dataGif.source_tld}
                                    </a>
                        </div>
                    )}
                </div>
            )}
            {(logError) && (
                <PageError logError={logError} />
            )}
        </div>
    )
}