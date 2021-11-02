import React from 'react'
import ReadOnlyStar from './ReadOnlyStar'

export default function Review({review}) {
    return (
            <div className="rating-wrapper">
              <ReadOnlyStar percentage= {(review.rating / 5) * 100} />
            <p><strong>{review.rating}</strong>, {review.text}</p> 
            </div>           
  
    )
}
