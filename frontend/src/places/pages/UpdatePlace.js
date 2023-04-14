import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UI/Card";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./PlaceForm.css";

const PLACES = [
  {
    id: "p1",
    title: "Yosemite National Park",
    description:
      "One of the most visited national parks in the United States, Yosemite National Park is prized for its jaw-dropping beauty that comprises magnificent granite cliffs, mountains, waterfalls and glaciers.",
    address: "California, USA",
    location: {
      lat: 37.865101,
      lng: -119.53833,
    },
    creator: "u1",
    imageUrl:
      "https://ca-times.brightspotcdn.com/dims4/default/142edaf/2147483647/strip/false/crop/2776x2082+0+0/resize/1486x1115!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fb8%2Fb9%2Fcdbd80b342de8799e96892fe7307%2Fyosemite-closed02.JPEG",
  },
  {
    id: "p2",
    title: "Yosemite National Park",
    description:
      "One of the most visited national parks in the United States, Yosemite National Park is prized for its jaw-dropping beauty that comprises magnificent granite cliffs, mountains, waterfalls and glaciers.",
    address: "California, USA",
    location: {
      lat: 37.865101,
      lng: -119.53833,
    },
    creator: "u2",
    imageUrl:
      "https://img0.oastatic.com/img2/73855996/1080x610r/view-of-yosemite-falls-on-a-hike-in-yosemite.jpg",
  },
];

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { pid } = useParams();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const identifiedPlace = PLACES.find((p) => p.id === pid);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <button
        className="text-button"
        type="submit"
        disabled={!formState.isValid}
      >
        UPDATE PLACE
      </button>
    </form>
  );
};

export default UpdatePlace;
