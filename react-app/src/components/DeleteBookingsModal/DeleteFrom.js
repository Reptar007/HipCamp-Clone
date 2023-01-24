import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import './delete.css'

import { removeBookingThunk } from "../../store/booking";

function DeleteFrom({ booking, setShowModal }) {
    const dispatch = useDispatch()

    const [check, setCheck] = useState()
    const user = useSelector(state => state.session.user)
    const [hasSubmitted, setHasSubmitted] = useState();
    const [errors, setErrors] = useState([]);
    
    useEffect(() => {
        const errors = []
        if(check !== `${user.username} deleting booking`) errors.push('Must match what is above')
        setErrors(errors)
    }, [check])

    const onSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)

        if(errors.length > 0) return

        let canceled = await dispatch(removeBookingThunk(booking.id))
        
        setShowModal(false)
        

        setCheck('')
        setErrors([]);
        setHasSubmitted(false);
    }

  return (
    <form 
    onSubmit={onSubmit}
    className="background_modal">
      <h2>To confirm cancellation type what's below in the field provided:</h2>
      <h3>{`${user.username} deleting booking`}</h3>
      <input type="text" value={check} onChange={(e) => setCheck(e.target.value)} />
      {hasSubmitted && errors.length > 0 && 
        errors.map((error, idx) => (
            <h5 key={idx} className='errors'>
                {error}
            </h5>
        ))
      }
      <button>Cancel</button>
    </form>
  );
}

export default DeleteFrom;
