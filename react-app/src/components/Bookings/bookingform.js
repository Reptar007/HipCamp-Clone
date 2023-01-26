import { useEffect, useState,useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { DateContext } from "../../context/dates";

import { addBookingThunk } from "../../store/booking";
import LoadingSpinner from "../Loading";

import "./bookingform.css";

function BookingForm() {

  const {checkIn, checkOut, setCheckIn} = useContext(DateContext)
  const dispatch = useDispatch();
  const history = useHistory();

  const [avg, setAvg] = useState(0);
  const [nights, setNights] = useState();
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.session.user);
  const camp = useSelector((state) => state.campgrounds.singleCamp.camp);
  const reviews = useSelector((state) =>
    Object.values(state.reviews.allreviews)
  );
  const min = camp?.min_nights;
  const max = camp?.max_nights;

  let sum = 0;

  reviews.forEach((review) => {
    sum += review.rating;
  });

  useEffect(() => {

    setAvg(parseFloat(sum / reviews.length).toFixed(2) || 0);
  }, [reviews,sum]);

  useEffect(() => {
 
    setNights((new Date(checkOut) - new Date(checkIn)) / (1000 * 3600 * 24));
  }, [checkIn, checkOut]);


  useEffect(() => {

    const dateErrors = [];
    if (!checkIn) {
      dateErrors.push("Please input a check-in date.");
    }
    if (!checkOut) {
      dateErrors.push("Please input a check-out date.");
    }
    if (nights < min) {
      dateErrors.push(`This camp has a minimum of ${min} nights`);
    }
    if (nights > max) {
      dateErrors.push(`This camp has a maximum of ${max} nights`);
    }
    setErrors(dateErrors);
    return dateErrors;
  },[nights,checkIn,checkOut,max,min])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    setIsLoading(true);

    
    if (errors.length > 0) {
        setIsLoading(false)
        return;
    }
    const payload = {
      campId: camp.id,
      start_date: checkIn,
      end_date: checkOut,
    };
    console.log(payload)

    let newbooking = await dispatch(addBookingThunk(payload));
    if (newbooking.errors) {
      let spliterror = newbooking.errors[0].split(":");
      let error = spliterror[1];
      setIsLoading(false)
      setErrors([error]);
      return;
    }
    if (newbooking && errors.length === 0) {
      history.push(`/profile`);
      
    }
    
    setHasSubmitted(false)
    setErrors([])
  };
  

  return (
    <>
      {isLoading ? (
        <div className="booking-container">
            <LoadingSpinner />
        </div>
      ) : (
        <div className="booking-container">
          <div className="booking-header">
            <h3>
              ${camp?.price} <span className="grey">/ night</span>
            </h3>
            <div className="booking-review">
              <h3>
                {avg} <i class="fa-thin fa-star fa-sm"></i>
              </h3>
              <i class="fa-solid fa-circle-small fa-2xs"></i>
              <h3>
                {reviews.length} <span className="grey">reviews</span>
              </h3>
            </div>
          </div>
          <div className="create-bookings">
            <form onSubmit={handleSubmit}>
              {errors && hasSubmitted && (
                <ul className="error-list">
                  {errors.map((error) => (
                    <li key={error}>
                      <i className="fa fa-exclamation-circle" /> {error}{" "}
                    </li>
                  ))}
                </ul>
              )}
              <div className="dates_container">
                <div className="date_input_containers">
                  <h4>CHECK-IN</h4>
                  <input 
                  type="date" 
                  value={checkIn}
                  onChange={(e) => setCheckIn(new Date(e.target.value))} 
                  disabled={true} />
                </div>
                <div className="date_input_containers">
                  <h4>CHECK-OUT</h4>
                  <input type="date" value={checkOut} disabled={true} />
                </div>
              </div>
              <div className="cart-bottom">
                <div className="cart-calc">
                  <div className="cart-font">
                    <span>
                      ${camp?.price} x {nights} nights
                    </span>
                    <span>${camp?.price * nights}</span>
                  </div>
                  <div className="cart-font">
                    <span>Service fee</span>
                    <span>${parseInt(camp?.price * nights * 0.14)}</span>
                  </div>
                </div>
                <div className="cart-total">
                  <span>Total before taxes</span>
                  <span>
                    $
                    {parseInt(camp?.price * nights * 0.14) +
                      camp?.price * nights +
                      parseInt(camp?.price / nights) || 0}
                  </span>
                </div>
              </div>
              {user ? (
                <button
                  className={
                    errors.length > 0 && hasSubmitted
                      ? "create-booking-error"
                      : "create-booking-submit"
                  }
                  type="submit"
                >
                  {errors.length > 0 && hasSubmitted ? "OOPS" : "RESERVE"}
                </button>
              ) : (
                <h3>Have to be logged in to reserve a camp</h3>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default BookingForm;
