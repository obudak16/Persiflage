import React from 'react'
import '../readOnlyStar.css'

export default function ReadOnlyStar({percentage}) {
    return (
        <div className="rating-item fa-2x">
            <div className="stars-outer">
                <div className="stars-inner" style={{width: percentage + '%'}}></div>
            </div>
        </div>
    )
}
