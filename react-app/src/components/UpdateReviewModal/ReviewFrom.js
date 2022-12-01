import {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { updateAReviewThunk } from '../../store/reviews';
import StarHovering from '../Reviews/rating';


function ReviewForm({ review, camp, setShowModal }) {
    const [stars, setStars] = useState(Math.floor(review.rating));
    const [body, setBody] = useState(review.body);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [validateErrors, setValidateErrors] = useState([]);


    const dispatch = useDispatch();

    useEffect(() => {
      const errors = [];
      if (body.length === 0) errors.push("Oh no you left the body empty");
      if (body.length > 150) errors.push("This is a tad too long");
      if (stars === 0) errors.push("Don't forget to add some stars!");
      setValidateErrors(errors);
    }, [body, stars]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setHasSubmitted(true);

      if (validateErrors.length > 0) return;

      const payload = {
        rating: stars,
        body,
      };

      let updateReview = await dispatch(updateAReviewThunk(review.id, payload));
      
      if(updateReview) {
        setShowModal(false)
      }

      setBody("");
      setStars(0);
      setValidateErrors([]);
      setHasSubmitted(false);
    };

    return (
      <form onSubmit={handleSubmit} className="background_modal">
        <h2>Update You Review</h2>
        <textarea
          className={
            validateErrors.length > 0 && hasSubmitted
              ? "update_textarea error_outline"
              : "update_textarea"
          }
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <p>{`${body.length}/150`}</p>
        <div className="ratings_reviews">
          <StarHovering stars={stars} setStars={setStars} />
          {hasSubmitted &&
            validateErrors.length > 0 &&
            validateErrors.map((error, idx) => (
              <h5 key={idx} className="errors">
                {error}
              </h5>
            ))}
          <button>Update</button>
        </div>
      </form>
    );
}

export default ReviewForm