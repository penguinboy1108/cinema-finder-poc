import "maplibre-gl/dist/maplibre-gl.css";
import Map, { Marker, useMap, Popup } from "react-map-gl";
// eslint-disable-next-line import/no-webpack-loader-syntax
import maplibregl from "maplibre-gl";
import useEventListener from "@use-it/event-listener";
import { useSnackbar } from "notistack";
import { MapContextProvider } from "./context";
import { totalBounds } from "../../data/bounds";
import { useState } from "react";
import maplibreglWorker from "maplibre-gl/dist/maplibre-gl-csp-worker";
import { DivIcon } from "leaflet";
maplibregl.workerClass = maplibreglWorker;

const MaplibreMarker = ({ lat, lon, cinema }) => {
  const handleClick = () => {
    // console.log(lat, lon, cinema);
    window.dispatchEvent(
      new CustomEvent("map.snapTo", { detail: { lat, lng: lon, cinema } })
    );
  };

  return (
    <Marker
      longitude={lon}
      latitude={lat}
      anchor="bottom"
      onClick={handleClick}
    />
  );
};

const convertBounds = ([w, s, e, n]) => [
  // MapLibre expects bounds to be [LngLatBoundsLike](https://maplibre.org/maplibre-gl-js-docs/api/geography/#lnglatboundslike)
  // as such the are either LngLat objects in [sw, ne] order or an array of numbers in [w, s, e, n] order.
  [w, s],
  [e, n],
];

const MapSnappingEventListener = () => {
  const map = useMap().current;
  const [selected, setSelected] = useState(null);

  useEventListener("map.snapTo", ({ detail: { lat, lng, cinema } }) => {
    map?.flyTo({ center: [lng, lat], zoom: 14 }); // 顺序 [lng, lat]
    setSelected({ lat, lng, cinema });
    // console.log(cinema);
  });

  return (
    <>
      {selected && (
        <div
          longitude={selected.lng}
          latitude={selected.lat}
          onClose={() => setSelected(null)}
        ></div>
      )}
    </>
  );
};

const MaplibreMap = ({ children }) => {
  console.log("render Maplibre map");

  const bounds = convertBounds(totalBounds); // => [[w, s], [e, n]]
  return (
    <Map
      mapLib={maplibregl}
      mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=46DCXvzkGNIvqAgCljGV"
      initialViewState={{
        bounds,
        fitBoundsOptions: { padding: 24 }, // 👈 padding 放在 fitBoundsOptions 里更标准
      }}
      // 真正限制交互范围
      maxBounds={bounds}
      padding={24}
    >
      <MapSnappingEventListener />
      <MapContextProvider value={{ Marker: MaplibreMarker }}>
        {children}
      </MapContextProvider>
    </Map>
  );
};
export default MaplibreMap;
