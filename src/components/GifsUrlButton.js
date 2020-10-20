import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'


export default function GifsUrlButton({ path }) {
    const [urlButton, setUrlButton] = useState("")

    return (
        <div className="position-relative d-inline-block">
            <button 
                type="button" 
                className="btn btn-info m-1 py-0 px-1" 
                onMouseEnter={() => setUrlButton("copy url")}
                onFocus={() => setUrlButton("copy url")}
                onClick={(e) => {
                    e.preventDefault()
                    navigator.clipboard.writeText(window.location.origin + path)
                    setUrlButton("copied!")
                }}
                onMouseLeave={() => setUrlButton("")}
                onBlur={() => setUrlButton("")}
            >
                <FontAwesomeIcon icon={faLink} />
            </button>    
            { (urlButton) && (
                <span 
                    className="position-absolute badge badge-info ml-1 pr-2" 
                    style={{borderRadius: "40px 40px 40px 10px"}}
                >
                    {urlButton}
                </span>
            )}
        </div>
    )
}