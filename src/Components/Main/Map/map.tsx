import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useContext } from "react";
import { markersContext } from "../../../Context/context";

const containerStyle = {
  width: "50%",
  height: "400px",
};

const center = {
  lat: 54.8985,
  lng: 23.9036,
};

export default function Maps() {
  const { coordinates, setMarkers } = useContext(markersContext);

  function mapClickEventHandler(event: any) {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkers([...coordinates, newMarker]);
  }

  function markerClickEventHandler(index: number) {
    const updatedMarkers = coordinates.filter((_, i) => i !== index);
    setMarkers(updatedMarkers);
  }

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        onClick={mapClickEventHandler}
      >
        {coordinates.map((marker, index) => (
          <div>
            <Marker
              key={index}
              position={marker}
              onClick={() => markerClickEventHandler(index)}
            />
          </div>
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
