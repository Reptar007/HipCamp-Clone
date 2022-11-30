
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCampgroundsThunk, deleteCampsiteThunk } from '../../store/campgrounds';
import UpdateCampsite from '../UpdateCampsiteModal';
import './Profile.css'
function Profile() {
    const user = useSelector(state => state?.session.user)
    const camps = useSelector(state => Object.values(state?.campgrounds.allCampgrounds))
    const userCamps = camps?.filter(camp => camp.host == user.id)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCampgroundsThunk())
    }, [])

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
            <h3>Campgrounds:</h3>
            <div className="camp_container">
              {userCamps?.map((camp) => (
                <div className="profile_camp">
                  <div className="profile_img">
                    <img src={camp?.Images[0]?.image_url} alt="images " />
                  </div>
                  <div className='camp_desc'>
                    <h4>{camp?.name}</h4>
                    <h5>{camp?.location}</h5>
                    <h5>${camp?.price} per night</h5>
                    <div className='camp_buttons'>
                      <UpdateCampsite camp={camp} />
                      <button
                        onClick={() => dispatch(deleteCampsiteThunk(camp.id))}
                      >
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
}

export default Profile