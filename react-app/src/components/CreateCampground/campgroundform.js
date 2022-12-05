
function CampgroundForm({ next, back, change, state, hasSubmitted, validateErrors}) {
  return (
    <>
      <h5 className={hasSubmitted && validateErrors.name ? "errors" : ""}>
        Name
      </h5>
      <input
        type="text"
        value={state.name}
        onChange={change("name")}
        className={hasSubmitted && validateErrors.name ? "error_outline" : ""}
      />
      {hasSubmitted && validateErrors.name && (
        <h6 className="errors">{validateErrors.name}</h6>
      )}

      <h5 className={hasSubmitted && validateErrors.sites ? "errors" : ""}>
        Number of Sites
      </h5>
      <input
        type="text"
        value={state.sites}
        onChange={change("sites")}
        className={hasSubmitted && validateErrors.sites ? "error_outline" : ""}
      />
      {hasSubmitted && validateErrors.sites && (
        <h6 className="errors">{validateErrors.sites}</h6>
      )}

      <h5 className={hasSubmitted && validateErrors.sites ? "errors" : ""}>
        Number of Guest per Site
      </h5>
      <input
        type="text"
        value={state.guests}
        onChange={change("guests")}
        className={hasSubmitted && validateErrors.guests ? "error_outline" : ""}
      />
      {hasSubmitted && validateErrors.guests && (
        <h6 className="errors">{validateErrors.guests}</h6>
      )}

      <h5 className={hasSubmitted && validateErrors.guests ? "errors" : ""}>
        Price per night
      </h5>
      <input
        type="text"
        value={state.price}
        onChange={change("price")}
        className={hasSubmitted && validateErrors.price ? "error_outline" : ""}
      />
      {hasSubmitted && validateErrors.price && (
        <h6 className="errors">{validateErrors.price}</h6>
      )}

      <div className="numbers">
        <div className="text">
          <h5
            className={
              hasSubmitted && validateErrors.min_nights ? "errors" : ""
            }
          >
            Minimum # of nights
          </h5>
          <input
            value={state.min_nights}
            onChange={change("min_nights")}
            className={
              hasSubmitted && validateErrors.min_nights ? "error_outline" : ""
            }
          />
          {hasSubmitted && validateErrors.min_nights && (
            <h6 className="errors">{validateErrors.min_nights}</h6>
          )}
        </div>
        <div className="text">
          <h5
            className={
              hasSubmitted && validateErrors.max_nights ? "errors" : ""
            }
          >
            Maximum # of nights
          </h5>
          <input
            value={state.max_nights}
            onChange={change("max_nights")}
            className={
              hasSubmitted && validateErrors.max_nights ? "error_outline" : ""
            }
          />
          {hasSubmitted && validateErrors.max_nights && (
            <h6 className="errors">{validateErrors.max_nights}</h6>
          )}
        </div>
      </div>
      <div className="time">
        <div>
          <h5
            className={
              hasSubmitted && validateErrors.checkin_time ? "errors" : ""
            }
          >
            Checkin Time
          </h5>
          <select
            value={state.checkin_time}
            onChange={change("checkin_time")}
            className={
              hasSubmitted && validateErrors.checkin_time ? "error_outline" : ""
            }
          >
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
          {hasSubmitted && validateErrors.checkin_time && (
            <h6 className="errors">{validateErrors.checkin_time}</h6>
          )}
        </div>
        <div>
          <h5
            className={
              hasSubmitted && validateErrors.checkout_time ? "errors" : ""
            }
          >
            Checkout Time
          </h5>
          <select
            value={state.checkout_time}
            onChange={change("checkout_time")}
            className={
              hasSubmitted && validateErrors.checkout_time
                ? "error_outline"
                : ""
            }
          >
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
          {hasSubmitted && validateErrors.checkout_time && (
            <h6 className="errors">{validateErrors.checkout_time}</h6>
          )}
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
