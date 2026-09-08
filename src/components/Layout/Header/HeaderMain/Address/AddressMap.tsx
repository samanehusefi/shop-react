import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

interface AddressMapProps {
  position: [number, number];
}

const MapController = ({ position }: AddressMapProps) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, 15);
  }, [map, position]);

  return null;
};

const AddressMap = ({ position }: AddressMapProps) => {
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      {/* <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      /> */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        className="map-light"
      />

      <MapController position={position} />

      <Marker position={position} />
    </MapContainer>
  );
};

export default AddressMap;
