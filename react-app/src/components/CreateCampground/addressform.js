import {useState} from 'react'


function AddressForm({ next, change, state }) {
   
    return (
      <>
        <h3>Location</h3>
        <p>You can pick anywhere your heart desires</p>
        <input
          type="text"
          value={state.location}
          onChange={change("location")}
        />
        <h3>Description</h3>
        <p>
          Give your a place a description so everyone can know how great it is!
        </p>
        <textarea
          value={state.description}
          onChange={change("description")}
        />

        {`${state.description.length} / 250`}
        <button onClick={next}>Next</button>
      </>
    );
}

export default AddressForm