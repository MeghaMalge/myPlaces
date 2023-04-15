import React from "react";

import Modal from "./Modal";

import "./ErrorModal.css";

const ErrorModal = (props) => {
  return (
    <Modal
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      contentClass="error-modal"
      footer={
        <button className="text-button" onClick={props.onClear}>
          Okay
        </button>
      }
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
