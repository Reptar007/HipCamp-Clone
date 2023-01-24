//constants
const All_CAMPGROUNDS = 'campgrounds/ALL'
const SINGLE_CAMPSITE = 'campgrounds/SINGLE'
const CREATE_CAMP = 'campgrounds/CREATE'
const DELETE_CAMP = 'campgrounds/DELETE'
const UPDATE_CAMP = 'campgrounds/UPDATE'

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

const post = campground => {
  return {
    type: CREATE_CAMP,
    campground
  }
}

const deleteCamp = id => {
  return {
    type: DELETE_CAMP,
    id
  }
}

const update = campground => {
  return {
    type: UPDATE_CAMP,
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

export const createCampsiteThunk = (payload) => async dispatch => {
  const res = await fetch("/api/campgrounds/host", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if(res.ok) {
    const campground = await res.json()
    dispatch(post(campground))
    return campground
  }
}

export const deleteCampsiteThunk = (id) => async dispatch => {
  const res = await fetch(`/api/campgrounds/host/${id}`, {
    method: "DELETE"
  })

   if (res.ok) {
        const data = await res.json()
        dispatch(deleteCamp(id))
    }
}

export const updateCampsiteThunk = (id, payload) => async (dispatch) => {
  const res = await fetch(`/api/campgrounds/host/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if(res.ok) {
    const campground = await res.json()
    dispatch(update(campground))
    return campground
  }
};

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
    case CREATE_CAMP:
      campgroundStateObj.allCampgrounds[action.campground.id] = action.campground
      return campgroundStateObj
    case UPDATE_CAMP:
      campgroundStateObj.allCampgrounds[action.campground.id] = action.campground
      return campgroundStateObj
    case DELETE_CAMP:
      delete campgroundStateObj.allCampgrounds[action.id]
      return campgroundStateObj
    default:
      return state;
  }
};

export default campgroundReducer