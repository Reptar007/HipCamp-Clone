function Review({back, state}) {
    const {
      name,
      location,
      acres,
      capacity,
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
    return (
      <div>
        <h4>Name: {name}</h4>
        <h4>Location: {location}</h4>
        <h4>Acres: {acres}</h4>
        <h4>Capacity: {capacity}</h4>
        <h4>Price: {price}</h4>
        <h4>Minimum nights: {min_nights}</h4>
        <h4>Maximum nights: {max_nights}</h4>
        <h4>Check out time: {checkout_time}</h4>
        <h4>Check in time: {checkin_time}</h4>
        <h4>Description: {description}</h4>
        <h4>Images:</h4>
        <p>{img1}</p>
        <p>{img2}</p>
        <p>{img3}</p>
        <p>{img4}</p>
        <h4>Activities: {state.activities}</h4>
        <h4>Amenities: {state.amenities}</h4>
        <button onClick={back}>Back</button>
        <button type="submit">Submit</button>
      </div>
    );
}

export default Review