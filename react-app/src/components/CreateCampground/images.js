

function ImagesForm({next, back, state, change}){
    

    return (
      <>
        <input value={state.img1} onChange={change("img1")} />
        <input value={state.img2} onChange={change("img2")} />
        <input value={state.img3} onChange={change("img3")} />
        <input value={state.img4} onChange={change("img4")} />
        <button onClick={back}>Back</button>
        <button onClick={next}>Next</button>
      </>
    );
}

export default ImagesForm