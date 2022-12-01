import { useState, useEffect } from 'react'
import {useSelector, useDispatch } from 'react-redux'
import {useParams} from 'react-router-dom'
import { getSingleCampgroundThunk } from '../../store/campgrounds'
import { getReviewsByCampgroundThunk } from '../../store/reviews'
import Reviews from '../Reviews'
import Essentials from './essentials'
import Amenities from './amenities'
import Activities from './activities'
import './SingleCamp.css'

function SingleCampsite() {
    const [current, setCurrent] = useState(0)

    const dispatch = useDispatch()

    const {campgroundId} = useParams()

    const camp = useSelector(state => state?.campgrounds?.singleCamp?.camp)
    const host = useSelector(state => state.campgrounds.singleCamp.host)
    const length = camp?.Images?.length
    

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1)
    }

    useEffect(() => {
        dispatch(getSingleCampgroundThunk(+campgroundId))
        dispatch(getReviewsByCampgroundThunk(+campgroundId));
    },[])    

    let content;
    let parking = camp.Amenities.find(amenity => amenity.id === 11)
    if(parking) {
      content = (
        <>
          <i class="fa-solid fa-car"></i>
          <h4> Parking </h4>
        </>
      )
    } else {
      content = (
        <>
          <i class="fa-thin fa-person-walking"></i>
          <h4> Walk to </h4>
        </>
      );
    }
    

    return (
      <div className="singleCamp_container">
        <section className="slider">
          <button className="left-arrow" onClick={prevSlide}>
            <i class="fa-solid fa-arrow-left"></i>
          </button>
          <button className="right-arrow" onClick={nextSlide}>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
          {camp?.Images?.map((image, index) => {
            return (
              <div
                className={
                  index === current ? "single_slider active" : "single_slider"
                }
                key={index}
              >
                {index === current && (
                  <img
                    className="slider_image"
                    src={image?.image_url}
                    alt="all images"
                  />
                )}
              </div>
            );
          })}
        </section>
        <div className="body_container">
          <div className="camp_info">
            <h1 className="camp_name">{camp?.name}</h1>
            <div className="camp_host">
              <div className="host">
                <div className="userImage">
                  <i class="fa-solid fa-user"></i>
                </div>
                <div className="hosted_by">
                  Hosted by:
                  <br />
                  {host?.username}
                </div>
              </div>
              <div className="camp_bio">{camp?.description}</div>
            </div>
            <div className="camp_boxes">
              <div className="area">
                <h2>Campsite Area</h2>
                <div className="area_icons">
                  <div className="area_icons_tents">
                    <i class="fa-light fa-tents"></i>
                    <h4> Tents </h4>
                  </div>
                  <div className="area_icons_sites">
                    <i class="fa-light fa-map-pin"></i>
                    <h4> {camp?.sites} sites</h4>
                  </div>
                  <div className="area_icons_guest">
                    <i class="fa-thin fa-people"></i>
                    <h4> {camp?.guests} guests per site</h4>
                  </div>
                  <div className="area_icons_parking">
                    {content}
                  </div>
                </div>
              </div>
              <Essentials camp={camp} />
              <Amenities camp={camp} />
            </div>
            <div className="details">
              <div className="detail_name">
                <h3>Details:</h3>
              </div>
              <div className="detail_check">
                <div className="checkin">
                  <h4>Check in:</h4>
                  <h4> After {camp?.checkin_time}</h4>
                </div>
                <div className="checkin">
                  <h4>Check out:</h4>
                  <h4>Before {camp?.checkout_time}</h4>
                </div>
              </div>
              <div className="detail_booking">
                <div className="checkin">
                  <h4>Minimum Nights:</h4>
                  <h4>{camp?.min_nights}</h4>
                </div>
                <div className="checkin">
                  <h4>Maximum Nights:</h4>
                  <h4>{camp?.max_nights}</h4>
                </div>
              </div>
            </div>
            <Activities camp={camp} />
            <Reviews />
          </div>
          <div className="bookings"></div>
        </div>
      </div>
    );
}

export default SingleCampsite