import { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import StarHovering from './rating'
import ReviewFormModal from '../UpdateReviewModal'
import { postAReviewThunk,deleteAReviewThunk } from '../../store/reviews'
import './reviews.css'

function Reviews() {
    const [stars, setStars] = useState()
    const [body, setBody] = useState('')

    const dispatch = useDispatch()
    const history = useHistory()

    const reviews = useSelector(state => Object.values(state.reviews.allreviews))
    const camp = useSelector(state=> state?.campgrounds?.singleCamp)
    const user = useSelector(state => state.session.user)

    console.log(camp?.camp?.id)
    const handleSubmit = async(e) => {
        e.preventDefault();

        const payload = {
            rating: stars,
            body
        }

        let newreview = await dispatch(postAReviewThunk(camp?.camp?.id, payload));
        if(newreview) {
            history.push(`/campgrounds/${camp?.camp?.id}`)
        }

        setBody('')
        setStars()

    }

    return (
      <div className="reviews_container">
        <h3>Write A Review</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <p>{`${body.length}/150`}</p>
          <div className="ratings_reviews">
            <StarHovering stars={stars} setStars={setStars} />
            <button>Submit</button>
          </div>
        </form>
        <div className="reviews_wrapper">
          <h3>{reviews.length} Written Reviews</h3>
          <div className="reviews_body">
            {reviews.map((review) => (
              <div className="single_review">
                <div className="single_review_author">
                  {review.author.username}
                </div>
                <div className="single_review_body">{review.body}</div>
                {user?.id === review.author_id && (
                  <div className="review_buttons">
                    <ReviewFormModal camp={camp} review={review} />
                    <button
                      onClick={() => dispatch(deleteAReviewThunk(review.id))}
                    >
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}

export default Reviews