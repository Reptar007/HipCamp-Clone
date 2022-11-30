import {useState} from 'react'
import { useDispatch } from 'react-redux';
import { updateAReviewThunk } from '../../store/reviews';
import StarHovering from '../Reviews/rating';


function ReviewForm({ review, camp, setShowModal }) {
    const [stars, setStars] = useState(Math.floor(review.rating));
    const [body, setBody] = useState(review.body);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
      e.preventDefault();

      const payload = {
        rating: stars,
        body,
      };

      let updateReview = await dispatch(updateAReviewThunk(review.id, payload));
      
      if(updateReview) {
        setShowModal(false)
      }

      setBody("");
      setStars();
    };

    return (
      <form 
      onSubmit={handleSubmit}
      className="background_modal">
        <h2>Update You Review</h2>
        <textarea
        className='update_textarea'
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <p>{`${body.length}/150`}</p>
        <div className="ratings_reviews">
          <StarHovering stars={stars} setStars={setStars} />
          <button>Update</button>
        </div>
      </form>
    );
}

export default ReviewForm