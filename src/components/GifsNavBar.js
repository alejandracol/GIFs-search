import React, { useState } from 'react'
import { useLocation, Link } from 'wouter'
import logo from '../images/logo.png'
import PoweredByGIPHY from '../images/PoweredByGIPHY.png'
import './GifsNavBar.css'


export default function GifsNavBar() {
    const [keyword, setKeyword] = useState("")
    const [location, setLocation] = useLocation("");

    let handleChange = (e) => {
      setKeyword(e.target.value)
    }
    let handleSubmit = (e) => {
        e.preventDefault()
        setLocation(`/search/${keyword}`)
    }

    return (
        <nav className="App-nav d-flex flex-column flex-md-row align-items-center py-3 px-2 px-sm-3 fixed-top bg-white" >
            <Link to='/search/trending'>
                <img tabIndex="0" src={logo} alt="logo" />
            </Link>
            <form className="input-group my-2 my-md-0 mx-md-3">
                <input 
                    type="search" 
                    className="form-control" 
                    onChange={handleChange}
                    value={keyword}
                    placeholder="Search for GIFs" 
                    aria-label="Search for GIFs" 
                />
                <div className="input-group-append">
                    <button 
                    type="submit" 
                    className="btn btn-outline-secondary" 
                    onClick={handleSubmit}
                    >
                    Search
                    </button>
                </div>
            </form>
            <img src={PoweredByGIPHY} alt="GIPHY atribution mark" />
        </nav>
    )
}