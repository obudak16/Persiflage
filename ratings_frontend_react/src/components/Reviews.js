import React from 'react'
import Review from './Review'

export default function Reviews({ reviews }) {
    return (
        <>
        <h1>Reviews</h1>
        {reviews? reviews.map((review, index) => (
          <Review style={{marginTop: "2%"}} key={index} review={review}/>
        )) : <div></div> }
      </>
    )
}
