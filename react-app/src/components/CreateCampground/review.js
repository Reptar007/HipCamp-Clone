function Review({back, state, update}) {
    const {
      name,
      location,
      sites,
      guests,
      price,
      min_nights,
      max_nights,
      checkout_time,
      checkin_time,
      description,
      img1,
      img2,
      img3,
      img4
    } = state;

    const activityname = (id) => {
      if (id === 1) return "Hiking"
      if (id === 2) return "Sailboat"
      if (id === 3) return "Biking"
      if (id === 4) return "Swimming"
      if (id === 5) return "Fishing"
      if (id === 6) return "Wildlife Watching"
      if (id === 7) return "Climbing"
      if (id === 8) return "Horseback"
    }

    const amenityname = id => {
      if (id === 3) return "Wifi";
      if (id === 4) return "Drinking Water";
      if (id === 6) return "Bins";
      if (id === 7) return "Showers";
      if (id === 8) return "Toliets";
      if (id === 9) return "Kitchen";
      if (id === 11) return "Parking";
      if (id === 12) return "Campfires";
      if (id === 13) return "Pets"
    }
    return (
      <>
        <h1>Review your info!</h1>
        <div className='review'>
          <div>
            <h3>Name:</h3>
            <p>{name}</p>
          </div>
          <div>
            <h3>Location:</h3>
            <p>{location}</p>
          </div>
          <div>
            <h3>Number of Sites:</h3>
            <p>{sites}</p>
          </div>
          <div>
            <h3>Guests per sites:</h3>
            <p>{guests}</p>
          </div>
          <div>
            <h3>Price:</h3>
            <p>${price}</p>
          </div>
          <div>
            <h3>Minimum nights:</h3>
            <p>{min_nights}</p>
          </div>
          <div>
            <h3>Maximum nights:</h3>
            <p>{max_nights}</p>
          </div>
          <div>
            <h3>Checkin time:</h3>
            <p>{checkin_time}</p>
          </div>
          <div>
            <h3>Checkout time:</h3>
            <p>{checkout_time}</p>
          </div>
          <div>
            <h3>Description:</h3>
            <p>{description}</p>
          </div>
          <div>
            <h3>Activities:</h3>
            {state.activities.map(act => (
              <p>{activityname(act)}</p>
            ))}
          </div>
          <div>
            <h3>Amenities:</h3>
            {state.amenities.map(am => (
              <p>{amenityname(am)}</p>
            ))}
          </div>
          <div>
            <h3>Images:</h3>
            <p>{img1}</p>
            <p>{img2}</p>
            <p>{img3}</p>
            <p>{img4}</p>
          </div>
        </div>
        <div>
          <button onClick={back}>Back</button>
          <button type="submit">{update ? 'Update': 'Submit'}</button>
        </div>
      </>
    );
}

export default Review