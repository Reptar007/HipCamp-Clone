import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ReviewForm from "./ReviewFrom";


function ReviewFormModal({ review, camp }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        <i class="fa-solid fa-pen"></i>
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReviewForm setShowModal={setShowModal} review={review} camp={camp}/>
        </Modal>
      )}
    </>
  );
}

export default ReviewFormModal;