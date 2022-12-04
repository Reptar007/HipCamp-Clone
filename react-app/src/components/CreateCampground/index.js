import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import './CreateCampground.css'
import AddressForm from './addressform';
import ActivityAmenityForm from './actamenform';
import CampgroundForm from './campgroundform';
import ImagesForm from './images';
import Review from './review';
import {createCampsiteThunk, updateCampsiteThunk} from '../../store/campgrounds'

function CreateCampground({ camp, update, setShowModal }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [page, setPage] = useState(1)
    const [state, setState] = useState({
      name: camp?.name || "",
      location: camp?.location || "",
      sites: camp?.sites || "",
      guests: camp?.guests || "",
      price: camp?.price || '',
      min_nights: camp?.min_nights || '',
      max_nights: camp?.max_nights || '',
      checkout_time: camp?.checkout_time || "00:00",
      checkin_time: camp?.checkin_time || "00:00",
      description: camp?.description || "",
      activities: camp?.Activites.map(act => act.id) || [],
      amenities: camp?.Amenities.map(am => am.id) || [],
      img1: camp?.Images[0].image_url || "",
      img2: camp?.Images[1].image_url || "",
      img3: camp?.Images[2].image_url || "",
    });
    const [validateErrors, setValidateErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
      const errors = {};
      if(state.location.length === 0) errors.location = "Opps location needs to be filled in"
      if(state.location.length > 50) errors.location = "Oh no location longer than 50 characters";
      if(state.name.length === 0) errors.name = "Opps name needs to be filled in";
      if(state.name.length > 50) errors.name = "Oh no name longer than 50 characters";
      if(state.description.length === 0) errors.description = "Opps description needs be filled"
      if(state.description.length > 250) errors.description = "Oh no description longer than 250 characters";
      if(!/^\d+$/.test(state.sites)) errors.sites = "Oh no sites needs to be a positive number";
      if (!/^\d+$/.test(state.guests)) errors.guests = "Oh no guests needs to be a positive number";
      if (!/^\d+$/.test(state.price)) errors.price = "Oh no price needs to be a positive  number";
      if (!/^\d+$/.test(state.min_nights)) errors.min_nights = "Oh no minimum nights needs to be a positive number";
      if (!/^\d+$/.test(state.max_nights)) errors.max_nights = "Oh no maximum nights needs to be a positive number";
      if (+state.min_nights > +state.max_nights) errors.min_nights = "Oh no minimum nights has to be smaller than maximum nights"
      if(state.checkin_time === '00:00') errors.checkin_time = "Oh no you need to pick a checkin time"
      if (state.checkout_time === "00:00") errors.checkout_time = "Oh no you need to pick a checkout time";
      if (!/^https?:\/\/.+\.(jpg|jpeg|png|JPG|JPEG|PNG)$/.test(state.img1)) errors.img1 = "Image must start with https:// and end with jpeg, jpg, or png";
      if (!/^https?:\/\/.+\.(jpg|jpeg|png|JPG|JPEG|PNG)$/.test(state.img2)) errors.img2 = "Image must start with https:// and end with jpeg, jpg, or png";
      if (!/^https?:\/\/.+\.(jpg|jpeg|png|JPG|JPEG|PNG)$/.test(state.img3)) errors.img3 = "Image must start with https:// and end with jpeg, jpg, or png";
      if (state.img1.length === 0) errors.img1 = "Oh no Image cant be empty"
      if (state.img2.length === 0) errors.img2 = "Oh no Image cant be empty";
      if (state.img3.length === 0) errors.img3 = "Oh no Image cant be empty";
      setValidateErrors(errors)
    }, [state])

    const next = () => setPage(page + 1)

    const back = () => setPage(page - 1)

    const handleChange = input => e => {
        if(['activities', 'amenities', 'images'].includes(input)) {
          setState({ ...state, [input]: [...state[input], e.target.value] });
        } else {
          setState({...state,[input]: e.target.value})
        }
    }

    let content;
    switch(page) {
        case 1:
            content = (
              <AddressForm
                next={next}
                state={state}
                change={handleChange}
                hasSubmitted={hasSubmitted}
                validateErrors={validateErrors}
              />
            );
            break
        case 2:
            content = (
              <CampgroundForm
                next={next}
                back={back}
                state={state}
                change={handleChange}
                setState={setState}
                hasSubmitted={hasSubmitted}
                validateErrors={validateErrors}
              />
            );
            break
        case 3:
            content = (
              <ActivityAmenityForm
                next={next}
                back={back}
                state={state}
                setState={setState}
              />
            );
            break
        case 4:
            content = (
              <ImagesForm
                next={next}
                back={back}
                state={state}
                change={handleChange}
                hasSubmitted={hasSubmitted}
                validateErrors={validateErrors}
              />
            );
            break
        case 5:
            content = (
              <Review
                back={back}
                state={state}
                update={update}
                hasSubmitted={hasSubmitted}
                validateErrors={validateErrors}
              />
            );
            break
        default:
            return null
    }

    const handleSumbit = async(e) => {
        e.preventDefault()
        

        setHasSubmitted(true);

        if (Object.keys(validateErrors).length > 0) return;

        const payload = {
          name: state.name,
          location: state.location,
          sites: state.sites,
          guests: state.guests,
          price: state.price,
          min_nights: state.min_nights,
          max_nights: state.max_nights,
          checkin_time: state.checkin_time,
          checkout_time: state.checkout_time,
          description: state.description,
          activities: state.activities,
          amenities: state.amenities,
          images: [state.img1, state.img2, state.img3]
        }

        if(update) {
          let updatedcampsite = await dispatch(updateCampsiteThunk(camp.id, payload))

          if (updatedcampsite && Object.keys(validateErrors).length === 0)
            setShowModal(false);
        } else {
          let newcampsite = await dispatch(createCampsiteThunk(payload))
  
          if (newcampsite && Object.keys(validateErrors).length === 0) {
            history.push("/");
          }
        }

        setState({
          name: "",
          location: "",
          sites: "",
          guests: "",
          price: 0,
          min_nights: 0,
          max_nights: 0,
          checkout_time: "",
          checkin_time: "",
          description: "",
          activities: [],
          amenities: [],
          img1: "",
          img2: "",
          img3: "",
          img4: "",
        });
        setPage(1)
        setHasSubmitted(false)
        setValidateErrors({})
    }

    return (
      <div className={update ? "" : "createform_container"}>
        <div className="createform">
          <h1 className="title_form">
            Create an Adventure <br /> of a Lifetime
          </h1>
          <div className="form_nav">
            <h4
              onClick={() => setPage(1)}
              className={
                page === 1 && Object.keys(validateErrors).length === 0
                  ? "selected"
                  : hasSubmitted &&
                    (validateErrors.location || validateErrors.description)
                  ? "errors"
                  : ""
              }
            >
              Location
            </h4>
            <h4
              className={
                page === 2 && Object.keys(validateErrors).length === 0
                  ? "selected"
                  : hasSubmitted &&
                    (validateErrors.name ||
                      validateErrors.sites ||
                      validateErrors.guests ||
                      validateErrors.price ||
                      validateErrors.min_nights ||
                      validateErrors.max_nights ||
                      validateErrors.checkin_time ||
                      validateErrors.checkout_time)
                  ? "errors"
                  : ""
              }
              onClick={() => setPage(2)}
            >
              Information
            </h4>
            <h4
              className={page === 3 ? "selected" : ""}
              onClick={() => setPage(3)}
            >
              Activites & Amenities
            </h4>
            <h4
              className={
                page === 4 && Object.keys(validateErrors).length === 0
                  ? "selected"
                  : hasSubmitted &&
                    (validateErrors.img1 ||
                      validateErrors.img2 ||
                      validateErrors.img3)
                  ? "errors"
                  : ""
              }
              onClick={() => setPage(4)}
            >
              Images
            </h4>
            <h4
              className={
                page === 5 && Object.keys(validateErrors).length === 0
                  ? "selected"
                  : ""
              }
              onClick={() => setPage(5)}
            >
              Review
            </h4>
          </div>
          <form onSubmit={handleSumbit}>{content}</form>
        </div>
      </div>
    );
}

export default CreateCampground