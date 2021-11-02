import React, {useState} from 'react'
import StarInput from './StarInput';
import '../addReview.css'

export default function AddReview({open, handleClick, onAdd}) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
 
  const handleSubmit = (e) => {
    e.preventDefault()
    const review = {
      rating: rating,
      text: text
    }
    onAdd(review)
    setRating(0)
    setText("")
  }

    return (
      <div className="addReviewDiv">
        <div id="myModal" className="modal" style={{display: open ? "block": "none"}}>
        <div className="modal-content">
          <span className="close" onClick={() => handleClick()}>&times;</span>
      
          <h1>What's your rating?</h1>
          <form onSubmit={handleSubmit}>
              <h2 className="rating-label">Rating</h2>
                <StarInput handleRate={(e) => setRating(e.target.value)}/>
              <br/>
              <h2>Review</h2>
              <input onChange={(e) => setText(e.target.value)}  type="text" id="text_val" value={text} placeholder="Start typing..."/><br/><br/>
              <input id="submit_btn" className="btn" type="submit" value="Submit review"/>
            </form> 
        </div>
      </div>
    </div>
    )
}
