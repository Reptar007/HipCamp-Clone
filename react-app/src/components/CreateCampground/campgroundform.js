function CampgroundForm({next, back, change, state}) {
  

    return (
      <>
        <input
          type="text"
          value={state.name}
          onChange={change("name")}
          placeholder="Name"
        />
        <input
          type="text"
          value={state.acres}
          onChange={change("acres")}
          placeholder="acres"
        />
        <input
          type="text"
          value={state.capacity}
          onChange={change("capacity")}
          placeholder="capacity"
        />
        <input
          type="text"
          value={state.price}
          onChange={change("price")}
          placeholder="price"
        />
        <input
          type="text"
          value={state.min_nights}
          onChange={change("min_nights")}
          placeholder="Minimum Nights"
        />
        <input
          type="text"
          value={state.max_nights}
          onChange={change("max_nights")}
          placeholder="Maximum Nights"
        />
        <input
          type="text"
          value={state.checkout_time}
          onChange={change("checkout_time")}
          placeholder="Check out time"
        />
        <input
          type="text"
          value={state.checkin_time}
          onChange={change("checkin_time")}
          placeholder="Check in time"
        />

        <button onClick={back}>Back</button>
        <button onClick={next}>Next</button>
      </>
    );
}

export default CampgroundForm