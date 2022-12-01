
function AddressForm({ next, change, state, hasSubmitted, validateErrors}) {
   
    return (
      <>
        <h3 className={hasSubmitted && validateErrors.location ? "errors" : ""}>
          Location
        </h3>
        <p>You can pick anywhere your heart desires</p>
        <input
          type="text"
          value={state.location}
          onChange={change("location")}
          className={
            hasSubmitted && validateErrors.location ? "error_outline" : ""
          }
        />
        {hasSubmitted && validateErrors.location && (
          <h5 className="errors">{validateErrors.location}</h5>
        )}
        <h3
          className={
            hasSubmitted && validateErrors.description ? "errors" : ""
          }
        >
          Description
        </h3>
        <p>
          Give your a place a description so everyone can know how great it is!
        </p>
        <textarea
          value={state.description}
          onChange={change("description")}
          className={
            hasSubmitted && validateErrors.description ? "error_outline " : ""
          }
        />
        {hasSubmitted && validateErrors.description && (
          <h5 className="errors">{validateErrors.description}</h5>
        )}
        {`${state.description.length} / 250`}
        <button onClick={next}>Next</button>
      </>
    );
}

export default AddressForm