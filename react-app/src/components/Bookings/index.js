import { useState,useEffect } from "react"
import DeleteBookingModal from "../DeleteBookingsModal"

function Bookings({ booking }) {
  
    const [nights, setNights] = useState();
    const dateFixer = (date) => {
      let split = date.split(" ");
      let fixed = split.slice(0, 4);
      return fixed.join(" ");
    };


    useEffect(() => {
        setNights(
          (new Date(booking.end_date) - new Date(booking.start_date)) / (1000 * 3600 * 24)
        );
    },[booking])


    return (
      <div key={booking.id} className="profile_camp">
        <div className="profile_img">
          <img src={booking?.camp?.Images[0]?.image_url} alt="images" />
        </div>
        <div className="camp_desc">
          <h4>
            {booking?.camp?.name}
          </h4>
          <h5>
            Dates: {dateFixer(booking.start_date)} to{" "}
            {dateFixer(booking.end_date)}
          </h5>
          <h5>
            Nights: {nights}
          </h5>
          <h5>
            Total: $
            {booking.camp.price * nights +
              parseInt(booking.camp.price * nights * 0.14)}
          </h5>
          <div className="camp_buttons">
            <DeleteBookingModal booking={booking}/>
          </div>
        </div>
      </div>
    );
}

export default Bookings


