import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlacesList from "../components/PlacesList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import ErrorModal from "../../shared/components/UI/ErrorModal";

const UserPlaces = () => {
  const { uid } = useParams();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [places, setPlaces] = useState();

  useEffect(() => {
    const fetchPlaces = async () => {
      const data = await sendRequest(
        uid
          ? `http://localhost:5000/api/places/user/${uid}`
          : "http://localhost:5000/api/places"
      );

      if (!error) {
        setPlaces(data);
      }
    };
    fetchPlaces();
  }, [uid]);
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner overlay />
        </div>
      )}
      {!isLoading && places && <PlacesList places={places} />}
    </>
  );
};

export default UserPlaces;
