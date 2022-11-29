

function ImagesForm({next, back, state, change}){
    

    return (
      <>
        <h2>Images</h2>
        <p> The more images you add the better changes of getting booked!</p>
        <h3>Image 1: </h3>
        <input value={state.img1} onChange={change("img1")} />
        <h3>Image 2: </h3>
        <input value={state.img2} onChange={change("img2")} />
        <h3>Image 3: </h3>
        <input value={state.img3} onChange={change("img3")} />
        <h3>Image 4: </h3>
        <input value={state.img4} onChange={change("img4")} />
        <div>
          <button onClick={back}>Back</button>
          <button onClick={next}>Next</button>
        </div>
      </>
    );
}

export default ImagesForm