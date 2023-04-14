import React, { useRef, useEffect } from "react";

import Map from "ol/Map.js";
import View from "ol/View.js";
import Tile from "ol/layer/Tile.js";
import OSM from "ol/source/OSM.js";
import { fromLonLat } from "ol/proj";

import "./Map.css";

const MapComp = ({ center, zoom, className, style }) => {
  const mapRef = useRef();

  useEffect(() => {
    new Map({
      target: mapRef.current.id,
      layers: [
        new Tile({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([center.lng, center.lat]),
        zoom: zoom,
      }),
    });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${className}`}
      style={style}
      id="map"
    ></div>
  );
};

export default MapComp;
