function Review({back, state, update, hasSubmitted, validateErrors}) {
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
      description
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


    let content;

    Object.keys(validateErrors).length > 0 && hasSubmitted
      ? (content = (
          <div className="review">
            {Object.values(validateErrors).map((error) => (
              <h5 className="errors">{error}</h5>
            ))}
          </div>
        ))
      : (content = (
          <>
            <div className="review">
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
                <h6>{description}</h6>
              </div>
              <div>
                <h3>Activities:</h3>
                <div className="activity_review_container">
                  {state.activities.map((act) => (
                    <p>{activityname(act)}</p>
                  ))}
                </div>
              </div>
              <div>
                <h3>Amenities:</h3>
                <div className="activity_review_container">
                  {state.amenities.map((am) => (
                    <p>{amenityname(am)}</p>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <button onClick={back}>Back</button>
              <button type="submit">{update ? "Update" : "Submit"}</button>
            </div>
          </>
        ));
    return (
      <>
        <h1 className={Object.keys(validateErrors).length > 0 && hasSubmitted ? 'errors' : ''}>
          {Object.keys(validateErrors).length > 0 && hasSubmitted
            ? "Oh no something went wrong"
            : "Review your info!"}
        </h1>
        {content}
      </>
    );
}

export default Review