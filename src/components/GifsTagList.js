import React from 'react'
import { Link } from 'wouter'


export default function GifsTagList({ id, title }) {

    return (
        <>
        {
            title.split(' ').slice(0, title.split(' ').indexOf('GIF'))
                .map((tag, index) => 
                    <li className="mx-2" key={`${id}-${tag}-${index}`} > 
                        <Link to={`/search/${tag}`}>
                            <a className="card-link" >{`#${tag}`}</a>
                        </Link>
                    </li>
                )
        }
        </>
    )
}