
function CampgroundForm({ next, back, change, state, setState }) {
  return (
    <>
      <h5>Name</h5>
      <input type="text" value={state.name} onChange={change("name")} />
      <h5>Number of Sites</h5>
      <input type="text" value={state.sites} onChange={change("sites")} />
      <h5>Numer of Guest per Site</h5>
      <input type="text" value={state.guests} onChange={change("guests")} />
      <h5>Price per night</h5>
      <input type="text" value={state.price} onChange={change("price")} />
      <h5>Minimum number of nights</h5>
      <input
        value={state.min_nights}
        onChange={change("min_nights")}
      />
      <h5>Maximum number of nights</h5>
      <input
        value={state.max_nights}
        onChange={change("max_nights")}
      />
      <div className="time">
        <div>
          <h5>Checkin Time</h5>
          <select value={state.checkin_time} onChange={change("checkin_time")}>
            <option>00:00</option>
            <option>01:00</option>
            <option>02:00</option>
            <option>03:00</option>
            <option>04:00</option>
            <option>05:00</option>
            <option>06:00</option>
            <option>07:00</option>
            <option>08:00</option>
            <option>09:00</option>
            <option>10:00</option>
            <option>11:00</option>
            <option>12:00</option>
            <option>13:00</option>
            <option>14:00</option>
            <option>15:00</option>
            <option>16:00</option>
            <option>17:00</option>
            <option>18:00</option>
            <option>19:00</option>
            <option>20:00</option>
            <option>21:00</option>
            <option>22:00</option>
            <option>23:00</option>
            <option>24:00</option>
          </select>
        </div>
        <div>
          <h5>Checkout Time</h5>
          <select value={state.checkout_time} onChange={change("checkout_time")}>
            <option>00:00</option>
            <option>01:00</option>
            <option>02:00</option>
            <option>03:00</option>
            <option>04:00</option>
            <option>05:00</option>
            <option>06:00</option>
            <option>07:00</option>
            <option>08:00</option>
            <option>09:00</option>
            <option>10:00</option>
            <option>11:00</option>
            <option>12:00</option>
            <option>13:00</option>
            <option>14:00</option>
            <option>15:00</option>
            <option>16:00</option>
            <option>17:00</option>
            <option>18:00</option>
            <option>19:00</option>
            <option>20:00</option>
            <option>21:00</option>
            <option>22:00</option>
            <option>23:00</option>
            <option>24:00</option>
          </select>
        </div>
      </div>
      <div>
        <button onClick={back}>Back</button>
        <button onClick={next}>Next</button>
      </div>
    </>
  );
}

export default CampgroundForm;
