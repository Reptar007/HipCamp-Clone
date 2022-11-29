import {useState} from 'react'


function AddressForm({ next, change, state }) {
   
    return (
      <>
        <input
          type="text"
          value={state.location}
          onChange={change("location")}
          placeholder="Street Address"
        />
        <input
          type="text"
          value={state.description}
          onChange={change("description")}
          placeholder="description"
        />
        <button onClick={next}>Next</button>
      </>
    );
}

export default AddressForm