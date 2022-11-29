import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import './CreateCampground.css'
import AddressForm from './addressform';
import ActivityAmenityForm from './actamenform';
import CampgroundForm from './campgroundform';
import ImagesForm from './images';
import Review from './review';
import {createCampsiteThunk} from '../../store/campgrounds'

function CreateCampground() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [page, setPage] = useState(1)
    const [state, setState] = useState({
      name: "",
      location: "",
      acres: "",
      capacity: "",
      price: 0,
      min_nights: 0,
      max_nights: 0,
      checkout_time: "",
      checkin_time: "",
      description: "",
      activities: [],
      amenities: [],
      img1: '',
      img2: '',
      img3: '',
      img4: ''
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
            content = <Review back={back} state={state}/>
            break
        default:
            return null
    }

    const handleSumbit = async(e) => {
        e.preventDefault()

        const payload = {
          name: state.name,
          location: state.location,
          acres: state.acres,
          capacity: state.capacity,
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

        let newcampsite = await dispatch(createCampsiteThunk(payload))

        if(newcampsite) {
          history.push('/')
        }

        setState({
          name: "",
          location: "",
          acres: "",
          capacity: "",
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
      <div className="createform_container">
        <div className="createform">
          <h1 className='title_form'>
            Create an Adventure <br /> of a Lifetime
          </h1>
          <form onSubmit={handleSumbit}>{content}</form>
        </div>
      </div>
    );
}

export default CreateCampground