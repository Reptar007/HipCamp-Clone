
import { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCampgroundsThunk, deleteCampsiteThunk } from '../../store/campgrounds';
import { getAllBookings } from '../../store/booking';
import Bookings from '../Bookings';

import UpdateCampsite from '../UpdateCampsiteModal';
import './Profile.css'
function Profile() {

    const [page, setPage] = useState(1)
    const user = useSelector(state => state?.session.user)
    const camps = useSelector(state => Object.values(state?.campgrounds?.allCampgrounds))
    const bookings = useSelector(state => Object.values(state?.bookings?.allBookings))
    const userCamps = camps?.filter(camp => camp.host === +user.id)
  

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCampgroundsThunk())
        dispatch(getAllBookings())
    }, [])

    let content;
    switch(page) {
      case 1:
        content = (
          <>
            { userCamps.length > 0 ?userCamps?.map((camp) => (
              <div className="profile_camp">
                <div className="profile_img">
                  <img src={camp?.Images[0]?.image_url} alt="images " />
                </div>
                <div className="camp_desc">
                  <h4>{camp?.name}</h4>
                  <h5>{camp?.location}</h5>
                  <h5>${camp?.price} per night</h5>
                  <div className="camp_buttons">
                    <UpdateCampsite camp={camp} />
                    <button
                      onClick={() => dispatch(deleteCampsiteThunk(camp.id))}
                    >
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              </div>
            )) :
            <h1>Don't be shy click 'Host' above to start making money off your campsite</h1>
          }
          </>
        )
        break
      case 2:
        content = (
          <>
            <h6>*to modify a booking you must first cancel then go back and select new dates from your desired campsite</h6>
            {bookings.length > 0 ? bookings?.map((booking) => (
              <Bookings booking={booking} />
            )) : 
            <h1>Explore our camps and book today!</h1>
          }
          </>
        );
        break
      default:
        return null
    }



    return (
      <div className="profile_container">
        <div className="profile_wrapper">
          <div className="profile_left">
            <div className="profile_user">
              <div className="profile_image">
                <i class="fa-solid fa-user"></i>
              </div>
              <div className="user_title">
                <h5>Welcome Back!</h5>
                <h3>{user.username}</h3>
              </div>
            </div>
            <div className="profile_email">
              <div className="email_title">
                <h4>Trusted Contempo</h4>
              </div>
              <div className="email">
                <i class="fa-sharp fa-solid fa-badge-check"></i>
                <h4>Email:</h4>
                <h4>{user.email}</h4>
              </div>
            </div>
          </div>
          <div className="profile_right">
            <div className="profile_nav">
              <h3
                className={page === 1 ? "selected" : ""}
                onClick={() => setPage(1)}
              >
                My Campgrounds
              </h3>
              <h3
                className={page === 2 ? "selected" : ""}
                onClick={() => setPage(2)}
              >
                My Bookings
              </h3>
            </div>
            <div className="camp_container">{content}</div>
          </div>
        </div>
      </div>
    );
}

export default Profile