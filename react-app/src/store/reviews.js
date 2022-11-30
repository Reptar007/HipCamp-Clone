/* ----- CONSTANTS ----- */
const CAMPGROUND_REVIEW = 'review/CAMPGROUND'
const CREATE_REVIEW = 'review/CREATE'
const UPDATE_REVIEW = 'review/UPDATE'
const DELETE_REVIEW = 'review/DELETE'

/* ----- ACTIONS CREATOR ----- */

const get_by_id = reviews => {
    return {
        type: CAMPGROUND_REVIEW,
        reviews
    }
}

const post = review => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

const put = review => {
    return {
        type: UPDATE_REVIEW,
        review
    }
}

const deleteReview = id => {
    return {
        type: DELETE_REVIEW,
        id
    }
}

/* ----- THUNKS CREATOR ----- */

export const getReviewsByCampgroundThunk = (id) => async dispatch => {
    const res = await fetch(`/api/reviews/campground/${id}`)

    if(res.ok) {
        const reviews = await res.json()
        dispatch(get_by_id(reviews))
        return reviews
    }
}

export const postAReviewThunk = (id, payload) => async dispatch => {
    const res = await fetch(`/api/reviews/campground/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if(res.ok) {
        const review = await res.json()
        dispatch(post(review))
        return review
    }
}

export const updateAReviewThunk = (id, payload) => async dispatch => {
    const res = await fetch(`/api/reviews/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if(res.ok) {
        const review = await res.json()
        dispatch(put(review))
        return review
    }
}

export const deleteAReviewThunk = id => async dispatch => {
    const res = await fetch(`/api/reviews/${id}`, {
        method: "DELETE"
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(deleteReview(id))
    }
}

/* ----- Reducer ----- */

const initialState = { allreviews: {}}

const reviewReducer =(state=initialState, action) => {
    let reviewStateObj = {...state}
    switch(action.type) {
        case CAMPGROUND_REVIEW:
            reviewStateObj.allreviews = action.reviews
            return reviewStateObj
        case CREATE_REVIEW:
            reviewStateObj.allreviews[action.review.id] = action.review
            return reviewStateObj
        case UPDATE_REVIEW:
            reviewStateObj.allreviews[action.review.id] = action.review
            return reviewStateObj
        case DELETE_REVIEW:
            delete reviewStateObj.allreviews[action.id]
            return reviewStateObj
        default:
            return reviewStateObj
    }
}

export default reviewReducer