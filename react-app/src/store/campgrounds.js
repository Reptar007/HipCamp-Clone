//constants
const All_CAMPGROUNDS = 'campgrounds/ALL'
const SINGLE_CAMPSITE = 'campgrounds/SINGLE'

/* ----- ACTIONS CREATOR ----- */

const get_all = campgrounds => {
    return {
        type: All_CAMPGROUNDS,
        campgrounds
    }
}

const get_one = campground => {
  return {
    type: SINGLE_CAMPSITE,
    campground
  }
}

/* ----- THUNKS CREATOR ----- */

export const getAllCampgroundsThunk = () => async dispatch => {
    const res = await fetch('/api/campgrounds/')

    if(res.ok) {
        const campgrounds = await res.json()
        dispatch(get_all(campgrounds))
        return campgrounds
    }
}

export const getSingleCampgroundThunk = (id) => async dispatch => {
  const res = await fetch(`/api/campgrounds/${id}`)

  if(res.ok) {
    const campground = await res.json()
    dispatch(get_one(campground))
    return campground
  }
}

/* ----- Reducer ----- */

const initialState = { allCampgrounds: {}, singleCamp: {}};

const campgroundReducer = (state = initialState, action) => {
  let campgroundStateObj = { ...state };
  switch (action.type) {
    case All_CAMPGROUNDS:
      campgroundStateObj.allCampgrounds = action.campgrounds;
      return campgroundStateObj;
    case SINGLE_CAMPSITE:
      campgroundStateObj.singleCamp = action.campground
      return campgroundStateObj
    default:
      return state;
  }
};

export default campgroundReducer