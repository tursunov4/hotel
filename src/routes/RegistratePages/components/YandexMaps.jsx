import React, { useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

const MapComponent = () => {
  const mapState = {
    center: [55.751574, 37.573856],
    zoom: 10,
  };

  const [placemarkGeometry, setPlacemarkGeometry] = useState(null); // Начальное значение - нет метки

  const handleMapClick = (event) => {
    const clickedCoordinates = event.get("coords");
    setPlacemarkGeometry(clickedCoordinates); // Устанавливаем координаты для новой метки
    console.log(clickedCoordinates);
  };
  return (
    <div className="map_component">
      <YMaps width="100%" height="100%">
        <Map
          state={mapState}
          width="100%"
          height="100%"
          onClick={handleMapClick}
        >
          {placemarkGeometry && <Placemark geometry={placemarkGeometry} />}
        </Map>
      </YMaps>
    </div>
  );
};

export default MapComponent;
