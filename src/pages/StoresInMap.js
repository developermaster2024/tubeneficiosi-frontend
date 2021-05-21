import MapContainer from "../components/MapContainer";

const StoresInMap = ({stores}) => {
  return <div>
    <div>
      <MapContainer
        stores={stores}
        onMarkerClicked={(store) => console.log(store)}
      />
    </div>
  </div>;
};

export default StoresInMap;