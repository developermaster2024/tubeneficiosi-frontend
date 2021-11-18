import { useEffect, useState } from "react";
import { IoClose, IoLocationSharp } from "react-icons/io5";
import useLocations from "../hooks/useLocations";
import CustomInput from "./CustomInput";

const SearchAddressFilter = ({ name, values, onChange, label }) => {
  const [showList, setShowList] = useState(false);

  const [locationFilters, setLocationFilters] = useState({
    name: "",
    perPage: 200,
    page: 1,
  });

  const [selectedLocation, setSelectedLocation] = useState(null);

  const [
    { locations, error: locationsError, loading: locationsLoading },
    getLocations,
  ] = useLocations({
    options: { manual: true, useCache: false },
    params: {
      ...locationFilters,
    },
  });

  useEffect(() => {
    if (selectedLocation) {
      onChange?.({
        target: { name: name, value: selectedLocation?.id, type: "checkbox" },
      });
      setLocationFilters((oldLocationsFilters) => {
        return {
          ...oldLocationsFilters,
          name: selectedLocation?.parentLocation?.name
            ? `${selectedLocation?.name}, ${selectedLocation?.parentLocation?.name}`
            : selectedLocation?.name,
        };
      });
    } else {
      onChange?.({
        target: { name: name, value: "", type: "checkbox" },
      });
      setLocationFilters((oldLocationsFilters) => {
        return {
          ...oldLocationsFilters,
          name: ''
        };
      });
    }
  }, [selectedLocation]);

  useEffect(() => {
    getLocations({
      params: {
        ...locationFilters,
      },
    });
  }, [locationFilters]);

  const handleChange = (e) => {
    setLocationFilters((oldLocationsFilters) => {
      return {
        ...oldLocationsFilters,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleLocationClick = (customLocation) => {
    setSelectedLocation(customLocation);    
  };

  return (
    <div>
      <h1 className="mb-4 flex items-center space-x-2 text-gray-500">
        <IoLocationSharp /> Indique su Ubicación
      </h1>
      <CustomInput
        name="name"
        id="locationsnameinput"
        autoComplete="off"
        placeholder={`Ejemplo: "Buenos Aires"`}
        type="text"
        onChange={handleChange}
        value={locationFilters?.name}
        onFocus={() => {
          setShowList(true);
        }}
        onBlur={() => {
          setTimeout(() => {
            setShowList(false);
          }, [100]);
        }}
      />
      {selectedLocation && (
        <div className="flex items-center justify-between bg-main mt-4 p-1 text-white rounded-full animate__animated animate__fadeInLeft">
          <p>
            {selectedLocation?.name}
            {selectedLocation?.parentLocation?.name
              ? `, ${selectedLocation?.parentLocation?.name}`
              : null}
          </p>
          <IoClose
            className="text-xl cursor-pointer"
            onClick={() => {
              setSelectedLocation(null);
            }}
          />
        </div>
      )}
      {locationsLoading ? (
        <div className="text-center text-xl mt-1 animate__animated animate__fadeIn">
          Cargando
        </div>
      ) : showList ? (
        locations?.length > 0 ? (
          <ul
            className="space-y-1 p-1 custom-scrollbar animate__animated animate__fadeIn mt-1"
            style={{ maxHeight: 500, overflowY: "auto" }}
          >
            {locations?.map((customLocation, i) => {
              return (
                <li
                  onClick={() => {
                    handleLocationClick(customLocation);
                  }}
                  key={i}
                  className="p-1 text-gray-500 hover:bg-main hover:text-white capitalize border-b cursor-pointer"
                >
                  {customLocation?.parentLocation?.name
                    ? `${customLocation?.name}, ${customLocation?.parentLocation?.name}`
                    : customLocation?.name}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-center text-gray-500 mt-2">
            No se encontraron resulados
          </div>
        )
      ) : null}
    </div>
  );
};

export default SearchAddressFilter;