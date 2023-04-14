import React from "react";
import PlaceItem from "./PlaceItem";

import "./PlacesList.css";

const PlacesList = ({ places }) => {
  if (places.length === 0)
    return (
      <div className="center">
        <h2>No Places Found</h2>
      </div>
    );

  return (
    <div className="places-list">
      {places.map((place) => (
        <PlaceItem key={place.id} place={place} />
      ))}
    </div>
  );
};

export default PlacesList;
