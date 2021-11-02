import ReadOnlyStar from "./components/ReadOnlyStar";
import { useState , useEffect} from 'react'
import AddReview from "./components/AddReview";
import Reviews from "./components/Reviews";

const backendHost = "127.0.0.1:8000"
const ws = new WebSocket(`ws:/${backendHost}/ws/`);

function App() {
  const getReviewEndpoint = `http://${backendHost}/get-ratings/`;
  const addReviewEndpoint = `http://${backendHost}/add-rating/`;
  
  const [open, setOpen] = useState(false);
  const [currentRating, setcurrentRating] = useState(0);
  const [reviews, setReviews] = useState([]);
 
  ws.onmessage = (e) => {
    const reviewsFromServer = JSON.parse(e.data).data
    setReviews(reviewsFromServer.ratings)
    setcurrentRating(reviewsFromServer.rating)
  }
  
  useEffect(() => {
    getReviews()
  }, [])

  
  const getReviews = async () => {
    const reviewsFromServer = await fetchReviews()
    setReviews(reviewsFromServer.ratings)
    setcurrentRating(reviewsFromServer.rating)
  }

  // Fetch Reviews
  const fetchReviews = async () => {
    const res = await fetch(getReviewEndpoint)
    const data = await res.json()
    return data
  }

  // Add Review
  const addReview = async (review) => {
    await fetch(addReviewEndpoint, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(review),
    })
    
    setOpen(false)
    // send message to web socket
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
          action: "list",
          request_id: new Date().getTime(),
      }))
    }
    
  }

  return (
    <div className="App">
      <div className="body-wrapper">
        
        <h1 id="title">The Minimalist Entrepreneur</h1>
        
        <div className="current-rating-wrapper">
          <h1 className="current-rating-num">{currentRating}</h1>
          <div className="current-rating">
            <ReadOnlyStar percentage={(Math.round(currentRating) / 5) * 100}/>
          </div>
          <button id="add-review-btn" className="btn" onClick={() => setOpen(true)}>Add review</button>
          <AddReview onAdd={addReview} open={open} handleClick={()=>setOpen(false)}/>
        </div>
        
        <hr className="solid"></hr>
      
        <Reviews reviews={reviews}/>
      </div>
    </div>
  );
}

export default App;
