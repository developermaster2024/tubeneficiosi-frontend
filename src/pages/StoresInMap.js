import { useEffect, useState } from "react";
import Map from "../components/googlemaps/Map";
import MapContainer from "../components/MapContainer";
import StoreInSideBar from "../components/StoreInSideBar";

const StoresInMap = ({ stores }) => {

  const [googleMapsOptions, setGoogleMapsOptions] = useState({ center: { lat: -34.61816057938619, lng: -58.48617933677675 }, zoom: 5 })

  const [googleMapsMarkers, setGoogleMapsMarkers] = useState([]);

  const [selectedStore, setSelectedStore] = useState(null);

  const hanleMapClick = (e) => {
    console.log(e);
  }

  useEffect(() => {

    setGoogleMapsMarkers(stores?.map((store) => {
      return {
        lat: store?.latitude,
        lng: store?.longitude,
        store: store
      }
    }));

  }, [stores])

  return <div>
    <div>
      <Map
        height="100vh"
        forStores
        options={googleMapsOptions}
        onClick={hanleMapClick}
        markers={googleMapsMarkers}
        onSelectedStore={(store) => { setSelectedStore(store) }} />
    </div>
    <StoreInSideBar store={selectedStore} onClose={() => { setSelectedStore(null) }} />
  </div>;
};

export default StoresInMap;