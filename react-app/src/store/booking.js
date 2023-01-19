const All_BOOKINGS = 'bookings/ALL'

/* ----- ACTION CREATOR -----*/

const get_all = bookings => {
    return {
        type: All_BOOKINGS,
        bookings
    }
}

/* ----- THUNKS CREATOR -----*/

export const getAllBookings = () => async dispatch => {
    const res = await fetch('/api/bookings')

    if(res.ok) {
        const bookings = await res.json()
        dispatch(get_all(bookings))
        return bookings
    }
}

/* ----- REDUCER -----*/

const initialState = { allBookings: {}}

const bookingReducer = (state = initialState, action) => {
    let bookingStateObj = {...state}
    switch (action.type) {
        case All_BOOKINGS:
            bookingStateObj.allBookings = action.bookings.bookings
            return bookingStateObj
        default:
            return state
    }
}

export default bookingReducer