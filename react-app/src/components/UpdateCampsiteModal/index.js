import { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateCampground  from '../CreateCampground/index'

function UpdateCampsite({ camp }) {
  const [showModal, setShowModal] = useState(false);
  const [update, setUpdate] = useState(true)
  return (
    <div
    >
      <button onClick={() => setShowModal(true)}>
        <i class="fa-solid fa-pen"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateCampground camp={camp} update={update} setShowModal={setShowModal}/>
        </Modal>
      )}
    </div>
  );
}

export default UpdateCampsite;
