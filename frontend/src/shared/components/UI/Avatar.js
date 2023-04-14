import React from "react";

import "./Avatar.css";

const Avatar = ({ imageUrl, alt, className, width, height }) => {
  return (
    <img
      src={imageUrl}
      alt={alt}
      className={`avatar ${className}`}
      width={width}
      height={height}
    />
  );
};

export default Avatar;
