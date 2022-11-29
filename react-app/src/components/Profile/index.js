
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
              <div>
                <h2>{user.username}</h2>
              </div>
            </div>
            <div className='profile_email'>
                <h2>Email:</h2>
                <h2>{user.email}</h2>
            </div>
          </div>
          <div className="profile_right">
            <h3>Campgrounds:</h3>
            {userCamps?.map(camp => (
                <div className='profile_camp'>
                    <div className='profile_img'>
                        <img src={camp?.Images[0]?.image_url} alt='images ' />
                    </div>
                    <div>
                        <h4>{camp?.name}</h4>
                        <UpdateCampsite camp={camp} />
                        <button
                            onClick={() => dispatch(deleteCampsiteThunk(camp.id))}
                        >Delete</button>
                    </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    );
}

export default Profile