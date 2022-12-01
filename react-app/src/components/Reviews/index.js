import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import StarHovering from './rating'
import ReviewFormModal from '../UpdateReviewModal'
import { postAReviewThunk,deleteAReviewThunk } from '../../store/reviews'
import './reviews.css'

function Reviews() {
    const [stars, setStars] = useState(0)
    const [body, setBody] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [validateErrors, setValidateErrors] = useState([]);

    const dispatch = useDispatch()
    const history = useHistory()

    const reviews = useSelector(state => Object.values(state.reviews.allreviews))
    const camp = useSelector(state=> state?.campgrounds?.singleCamp)
    const user = useSelector(state => state.session.user)
    const found = reviews.some(review => review?.author_id=== user?.id)

    useEffect(() => {
      const errors = [];
      if (body.length === 0) errors.push("Oh no you left the body empty");
      if (body.length > 150) errors.push("This is a tad too long");
      if (stars === 0) errors.push("Don't forget to add some stars!")
      setValidateErrors(errors);
    }, [body, stars]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setHasSubmitted(true)


        if (validateErrors.length > 0) return;

        const payload = {
            rating: stars,
            body
        }

        let newreview = await dispatch(postAReviewThunk(camp?.camp?.id, payload));
        if (newreview && validateErrors.length === 0) {
          history.push(`/campgrounds/${camp?.camp?.id}`);
        }

        setBody('')
        setStars(0)
        setValidateErrors([]);
        setHasSubmitted(false)
    }

    let content;

    if(!user) {
      content = (
        <div className='no_form'>
          <h3>Want to say something snazzy?</h3>
          <h4> Login or Signup to so do!</h4>
        </div>
      )
    } else if (user && found) {
      content = (
        <div className="no_form">
          <h3>Hmmmmm.....</h3>
          <h4> Seems like you already made a review, you can update or delete that review!</h4>
        </div>
      );

    } else if (user && camp?.host?.id === user?.id) {
      content = (
        <div className="no_form">
          <h3>Hmmmmm.....</h3>
          <h4>Seems like you you own this campground, you can't review your own spot silly goose</h4>
        </div>
      )
    }else {
      content = (
        <>
        <h3>Write A Review</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className={validateErrors.length > 0 && hasSubmitted ? 'error_outline' : ''}
          />
          <p>{`${body.length}/150`}</p>
          <div className="ratings_reviews">
            <StarHovering stars={stars} setStars={setStars} />
            <button>Submit</button>
          </div>
        </form>
        {hasSubmitted &&
          validateErrors.length > 0 &&
          validateErrors.map((error, idx) => (
            <h5 key={idx} className='errors'>{error}</h5>
          ))
            }
        </>
      )
    }

    return (
      <div className="reviews_container">
        {content}
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