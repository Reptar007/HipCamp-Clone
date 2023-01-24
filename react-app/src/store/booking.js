const All_BOOKINGS = 'bookings/ALL'
const CREATE_BOOKING = 'bookings/POST'
const REMOVE_BOOKING = "Bookings/REMOVE_BOOKING";

/* ----- ACTION CREATOR -----*/

const get_all = bookings => {
    return {
        type: All_BOOKINGS,
        bookings
    }
}

const post = bookings => {
    return {
        type: CREATE_BOOKING,
        bookings
    }
}

const removeBooking = (booking) => ({
  type: REMOVE_BOOKING,
  booking,
});


/* ----- THUNKS CREATOR -----*/

export const getAllBookings = () => async dispatch => {
    const res = await fetch('/api/bookings')

    if(res.ok) {
        const bookings = await res.json()
        dispatch(get_all(bookings))
        return bookings
    }
}

export const addBookingThunk = (booking) => async (dispatch) => {
  const response = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }
    await dispatch(post(data.booking));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data) {
      return data;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};


export const removeBookingThunk = (bookingId) => async (dispatch) => {
  const response = await fetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    await dispatch(removeBooking(bookingId));
    return;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};




/* ----- REDUCER -----*/

const initialState = { allBookings: {}}

const bookingReducer = (state = initialState, action) => {
    let bookingStateObj = {...state}
    switch (action.type) {
        case All_BOOKINGS:
          bookingStateObj.allBookings = action.bookings
          return bookingStateObj
        case CREATE_BOOKING:
            bookingStateObj.allBookings[action.bookings.id] = action.bookings
            return bookingStateObj
        case REMOVE_BOOKING:
          delete bookingStateObj.allBookings[action.id]
          return bookingStateObj
        default:
            return state
    }
}

export default bookingReducer