import React from "react";
import UsersList from "../components/UsersList";

export default function Users() {
  const USERS = [
    {
      id: "u1",
      name: "Max",
      image:
        "https://w7.pngwing.com/pngs/393/427/png-transparent-sunglasses-boy-cartoon-animation-sunglasses-boy-child-face-black-hair.png",
      places: 2,
    },
    {
      id: "u2",
      name: "John",
      image: "https://img.lovepik.com/element/45006/1086.png_300.png",
      places: 1,
    },
    {
      id: "u3",
      name: "Linda",
      image:
        "https://sg-res.9appsdownloading.com/sg/res/jpg/07/13/642f200e34f397b53e524e12a9b6-4ur.jpg?x-oss-process=style/hq",
      places: 4,
    },
  ];
  return <UsersList users={USERS} />;
}
