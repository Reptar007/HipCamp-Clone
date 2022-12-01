import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {getAllCampgroundsThunk, getSingleCampgroundThunk} from '../../store/campgrounds'
import { getReviewsByCampgroundThunk } from '../../store/reviews'
import './campgrounds.css'

let images = [
  "https://i.imgur.com/VTsp5yv.png",
  "https://i.imgur.com/MRvFAK5.png",
  "https://i.imgur.com/iFLd2aZ.png",
  "https://i.imgur.com/AifdQbp.png",
  "https://i.imgur.com/o0Hc1iD.png"
];

function AllCampgrounds() {
    const dispatch = useDispatch()
    const [count, setCount] = useState(0)

    
    useEffect(() => {
        dispatch(getAllCampgroundsThunk())
    }, [])
    
    useEffect(() => {
        const imageIdx = setInterval(() =>{
            setCount(count === images.length-1 ? 0 : count+1)
        }, 5000)
        
        return () => clearInterval(imageIdx)
    },)
    
    const campgrounds = useSelector(state => Object.values(state.campgrounds.allCampgrounds))

    return (
        <div className='campgrounds_container'>
            <h1>Explore the Outdoors</h1>
            <p>Discover what the great outdoors <br/> can offer you, book today!</p>
            <div className='landing_page_images'>
                <div className='campgrounds_searchbar'>
                    <h1>Ready for an adventure of a lifetime?</h1>
                </div>
                {images.map((im,index) => {
                    return (
                        <div
                        className={index === count ? 'slide active' : 'slide'}
                        key={index}
                        >
                            {index === count && (
                                <img src={im} alt='images' />
                            )}
                        </div>
                    )
                })}
            </div>
            <h2>Where to go:</h2>
            <div className='campsites'>
                {campgrounds.map(camp => (
                    <NavLink to={`campgrounds/${camp.id}`}>
                        <div 
                            onClick={() => {
                                dispatch(getSingleCampgroundThunk(camp.id))
                                dispatch(getReviewsByCampgroundThunk(camp.id));
    
                            }}
                            className='campsite_container'
                            key={camp?.id}
                            >
                            <img className='camp_images' src={camp?.Images[0]?.image_url} alt='camp-imgae' />
                            <div className='camp_banner'>{camp?.name}</div>
                        </div>
                    </NavLink>
                    ))}
            </div>
        </div>
    )
}

export default AllCampgrounds