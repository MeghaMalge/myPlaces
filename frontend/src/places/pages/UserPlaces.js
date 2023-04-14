import React from "react";
import { useParams } from "react-router-dom";

import PlacesList from "../components/PlacesList";

const UserPlaces = () => {
  const { uid } = useParams();
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

  let filtered_places = uid
    ? PLACES.filter((place) => place.creator === uid)
    : PLACES;
  return <PlacesList places={filtered_places} />;
};

export default UserPlaces;
