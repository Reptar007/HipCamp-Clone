

function ImagesForm({next, back, state, change, hasSubmitted, validateErrors}){
    

    return (
      <>
        <h2>Images</h2>
        <p> The more images you add the better changes of getting booked!</p>
        <h3 className={hasSubmitted && validateErrors.img1 ? "errors" : ""}>
          Image 1:
        </h3>
        <input
          value={state.img1}
          onChange={change("img1")}
          className={hasSubmitted && validateErrors.img1 ? "error_outline" : ""}
        />
        {hasSubmitted && validateErrors.img1 && (
          <h6 className="errors">{validateErrors.img1}</h6>
        )}

        <h3 className={hasSubmitted && validateErrors.img2 ? "errors" : ""}>
          Image 2:
        </h3>
        <input
          value={state.img2}
          onChange={change("img2")}
          className={hasSubmitted && validateErrors.img2 ? "error_outline" : ""}
        />
        {hasSubmitted && validateErrors.img2 && (
          <h6 className="errors">{validateErrors.img2}</h6>
        )}

        <h3 className={hasSubmitted && validateErrors.img3 ? "errors" : ""}>
          Image 3:
        </h3>
        <input
          value={state.img3}
          onChange={change("img3")}
          className={hasSubmitted && validateErrors.img3 ? "error_outline" : ""}
        />

        {hasSubmitted && validateErrors.img3 && (
          <h6 className="errors">{validateErrors.img3}</h6>
        )}
        <div>
          <button onClick={back}>Back</button>
          <button onClick={next}>Next</button>
        </div>
      </>
    );
}

export default ImagesForm