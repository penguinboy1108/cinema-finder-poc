import {
  MapContainer,
  // Rectangle,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import useEventListener from "@use-it/event-listener";
import { useSnackbar } from "notistack";
import { totalBounds } from "../../data/bounds";
import MapContext from "./context";
import { useState } from "react";
// Have to override these url's so that it finds the bundles the correct images
Icon.Default.imagePath =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/";

const MapSnappingEventListener = () => {
  const { enqueueSnackbar } = useSnackbar();
  const map = useMap();
  const [selected, setSelected] = useState(null);

  useEventListener("map.snapTo", ({ detail: { lat, lng, cinema } }) => {
    try {
      map?.flyTo([lat, lng], 14, { duration: 0.5, easeLinearity: 1 });
      setSelected({ lat, lng, cinema }); // ✅ 保存影院信息用于 Popup
    } catch (e) {
      console.error(e);
      enqueueSnackbar("Unexpected error while attempting map navigation", {
        variant: "error",
      });
    }
  });

  return (
    <>
      {selected && (
        <div
          position={[selected.lat, selected.lng]}
          eventHandlers={{ remove: () => setSelected(null) }}
        ></div>
      )}
    </>
  );
};

const convertBounds = ([w, s, e, n]) => [
  // Leaflet expects boundings boxes to be an array consisting of the corners of the box.
  // These corners are [lat, lon] [LatLng docs](https://leafletjs.com/reference.html#latlng)
  [s, w],
  [n, e],
];

const LeafletMarker = ({ lat, lon, cinema }) => (
  <Marker
    position={[lat, lon]} // Leaflet 顺序是 [lat, lng]
    eventHandlers={{
      click: () =>
        window.dispatchEvent(
          new CustomEvent("map.snapTo", {
            detail: { lat, lng: lon, cinema }, // 事件里统一用 {lat,lng}
          })
        ),
    }}
  />
);
const LeafletMap = ({ children }) => {
  console.log("render Leaflet map");
  return (
    <>
      <MapContainer
        bounds={convertBounds(totalBounds)}
        maxBounds={convertBounds(totalBounds)}
        maxBoundsViscosity={1.0}
        style={{ height: "100%", backgroundColor: "#99b3cc" }}
        zoomSnap={0.5}
        zoomDelta={0.5}
        minZoom={2}
        maxZoom={18}
        whenCreated={(map) => {
          // 切换后保证尺寸正确
          setTimeout(() => map.invalidateSize(), 0);
        }}
      >
        <MapSnappingEventListener />

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapContext.Provider value={{ Marker: LeafletMarker }}>
          {children}
        </MapContext.Provider>
      </MapContainer>
    </>
  );
};
export default LeafletMap;
