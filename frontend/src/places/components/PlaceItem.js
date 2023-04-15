import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../shared/components/UI/Card";
import MapComp from "../../shared/components/UI/Map";
import Modal from "../../shared/components/UI/Modal";

import "./PlaceItem.css";

const PlaceItem = ({ place }) => {
  const [show, setShow] = useState(false);

  const openModalHandler = () => {
    setShow(true);
  };

  const closeModalHandler = () => {
    setShow(false);
  };
  return (
    <>
      <Modal
        show={show}
        onCancel={closeModalHandler}
        header={place.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <button className="text-button" onClick={closeModalHandler}>
            CLOSE
          </button>
        }
      >
        <div className="map-container">
          <MapComp center={place.location} zoom={8} />
        </div>
      </Modal>
      <li className="place">
        <Card className="place-card">
          <div className="place-image">
            <img
              src={place.imageUrl}
              alt={place.title}
              width="100%"
              height="100%"
            />
          </div>
          <h2 className="place-title">{place.title}</h2>
          <p className="place-description">{place.description}</p>
          <div className="buttons-container">
            <button className="text-button" onClick={openModalHandler}>
              VIEW ON MAP
            </button>
            <section className="icon-btn-container">
              <Link to={`/places/${place._id}`}>
                <button className="icon-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="white"
                    className="w-6 h-6 icon-svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>
              </Link>
              <button className="icon-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="white"
                  className="w-6 h-6 icon-svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </section>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
