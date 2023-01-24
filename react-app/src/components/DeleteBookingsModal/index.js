import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteForm from './DeleteFrom'

function DeleteBookingModal({ booking }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="signupNav" onClick={() => setShowModal(true)}>
        <i class="fa-solid fa-trash-can"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteForm booking={booking} setShowModal={() => setShowModal()} />
        </Modal>
      )}
    </>
  );
}

export default DeleteBookingModal;
