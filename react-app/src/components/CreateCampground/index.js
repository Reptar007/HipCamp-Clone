import {useState} from 'react'
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
      name: camp?.name || " ",
      location: camp?.location || "",
      sites: camp?.sites || "",
      guests: camp?.guests || "",
      price: camp?.price || 0,
      min_nights: camp?.min_nights || 0,
      max_nights: camp?.max_nights || 0,
      checkout_time: camp?.checkout_time || "00:00",
      checkin_time: camp?.checkin_time || "00:00",
      description: camp?.description || "",
      activities: camp?.Activites.map(act => act.id) || [],
      amenities: camp?.Amenities.map(am => am.id) || [],
      img1: camp?.Images[0].image_url || "",
      img2: camp?.Images[1].image_url || "",
      img3: camp?.Images[2].image_url || "",
      img4: camp?.Images[3].image_url || "",
    });

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
            content = <AddressForm next={next} state={state} change={handleChange}/>
            break
        case 2:
            content = (
              <CampgroundForm
                next={next}
                back={back}
                state={state}
                change={handleChange}
                setState={setState}
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
            content = <ImagesForm next={next} back={back} state={state} change={handleChange} />
            break
        case 5:
            content = <Review back={back} state={state} update={update}/>
            break
        default:
            return null
    }

    const handleSumbit = async(e) => {
        e.preventDefault()

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
          images: [state.img1, state.img2, state.img3, state.img4]
        }

        if(update) {
          let updatedcampsite = await dispatch(updateCampsiteThunk(camp.id, payload))

          if(updatedcampsite) setShowModal(false)
        } else {
          let newcampsite = await dispatch(createCampsiteThunk(payload))
  
          if(newcampsite) {
            history.push('/')
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
    }

    return (
      <div className={update ? "" : "createform_container"}>
        <div className="createform">
          <h1 className="title_form">
            Create an Adventure <br /> of a Lifetime
          </h1>
          <form onSubmit={handleSumbit}>{content}</form>
        </div>
      </div>
    );
}

export default CreateCampground