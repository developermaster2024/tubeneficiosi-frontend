import { useEffect, useState } from "react";
import Container from "../components/Container";
import GridIcon from "../components/GridIcon";
import ListIcon from "../components/ListIcon";
import Pagination from "../components/Pagination";
import Button from "../components/Button";
import ChevronRightIcon from "../components/ChevronRightIcon";
import LeftSidebarLayout from "../components/LeftSidebarLayout";
import clsx from "clsx";
import StoresCollection from "../components/StoresCollection";
import { Link } from "react-router-dom";
import LocationMarker from "../components/LocationMarker";
import StoresInMap from "./StoresInMap";
import CategoryCheckbox from "../components/CategoryCheckbox";
import { storeDiscounts } from "../util/discounts";
import { cards } from "../util/cards";
import adsBanner from '../assets/images/banner.jpg';
import adsBanner2 from '../assets/images/banner2.jpg';
import storesBanner from '../assets/images/storesbanner.webp';


import useStores from "../hooks/useStores";
import useCategories from "../hooks/useCategories";
import { useAuth } from "../contexts/AuthContext";

import { Swiper, SwiperSlide } from 'swiper/react';
import StoreDiscountCard from "../components/StoreDiscountCard";
import RatingsFilter from "../components/RatingsFilter";

const latLngs = [
  { lat: -34.605349, lng: -58.478619 },
  { lat: -34.615521, lng: -58.408581 },
  { lat: -34.571149, lng: -58.430211 },
  { lat: -34.654504, lng: -58.486859 },
  { lat: -34.569453, lng: -58.499905 },
  { lat: -34.651057, lng: -58.521639 },
  { lat: -34.638347, lng: -58.433749 },
  { lat: -34.622245, lng: -58.516489 },
  { lat: -34.649928, lng: -58.404566 },
  { lat: -34.584943, lng: -58.435809 },
];

const Stores = () => {

  const { setLoading, setCustomAlert } = useAuth();

  const [filters, setFilters] = useState({ page: 1, perPage: 12, storeCategoryId: [], rating: null, cardDiscount: null });
  const [viewType, setViewType] = useState('grid');
  const [canShowLoading, setCanShowLoading] = useState(false);

  const [{ stores, total, size, numberOfPages, error, loading }, getStores] = useStores({
    params: {
      ...filters
    }
  });

  const [{ categories, error: errorCategories }, getCategories] = useCategories()


  useEffect(() => {
    setLoading({ show: true, message: "Obteniendo Informacion" });
    Promise.all([getStores(), getCategories()]).then((values) => {
      setLoading({ show: false, message: "" });
      setCanShowLoading(true);
    })
  }, []);

  useEffect(() => {
    console.log(stores);
  }, [stores])

  useEffect(() => {
    if (canShowLoading) {
      setLoading({ show: loading, message: "Cargando tiendas" });
    }
  }, [loading]);

  useEffect(() => {
    if (error) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${error?.response?.status === 400 ? error?.response?.data.message[0] : error?.response?.data.message}.`, severity: "error" });
    }
    if (errorCategories) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${errorCategories?.response?.status === 400 ? errorCategories?.response?.data.message[0] : errorCategories?.response?.data.message}.`, severity: "error" });
    }
  }, [error, errorCategories]);

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      const value = filters[e.target.name].includes(Number(e.target.value));
      if (value) {
        const newValues = filters[e.target.name].filter(n => n !== Number(e.target.value));
        console.log(newValues);
        setFilters((oldFilters) => {
          return {
            ...oldFilters,
            [e.target.name]: newValues
          }
        });
      } else {
        setFilters((oldFilters) => {
          return {
            ...oldFilters,
            [e.target.name]: [Number(e.target.value), ...oldFilters[e.target.name]]
          }
        });
      }
      return;
    }


    setFilters((oldFilters) => {
      return {
        ...oldFilters,
        [e.target.name]: e.target.value
      }
    })
  }

  return <>
    <Link to={'/stores/burguerking'}>
      <div className="h-[35vh] w-full" style={{ backgroundImage: `url(${storesBanner})`, backgroundSize: '100% 100%' }}>
      </div>
    </Link>
    <div className="bg-white shadow-sm">
      <Container className="py-5">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold">Tiendas</h2>

          <div className="flex space-x-4">
            <span
              className={clsx(['inline-flex items-center space-x-1 cursor-pointer', viewType !== 'grid' && 'opacity-75'])}
              onClick={() => setViewType('grid')}
            >
              <GridIcon className="w-4 h-4" />
              <span>Vista de grilla</span>
            </span>
            <span
              className={clsx(['inline-flex items-center space-x-1 cursor-pointer', viewType !== 'list' && 'opacity-75'])}
              onClick={() => setViewType('list')}
            >
              <ListIcon className="w-4 h-4" />
              <span>Vista de lista</span>
            </span>
            <span
              className={clsx(['inline-flex items-center space-x-1 cursor-pointer', viewType !== 'map' && 'opacity-75'])}
              onClick={() => setViewType('map')}
            >
              <LocationMarker className="w-4 h-4" />
              <span>Ver en mapa</span>
            </span>
            <Link to="/stores" className="inline-flex items-center space-x-1">
              <span className="px-1.5 py-0.5 text-xs bg-yellow-100 text-red-500 font-semibold rounded-lg">{total}</span>
              <span>Comercios</span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
    <Container withMargin className="mb-20">
      <LeftSidebarLayout
        leftSide={<div className="space-y-5">
          <div>
            <h4 className="text-xl font-semibold mb-2">Categorias</h4>
            <ul className="text-gray-800 space-y-2 max-h-56 overflow-y-auto">
              {categories.map((category, i) =>
                <div key={i} className="flex items-center space-x-4">
                  <input onChange={handleChange} name="storeCategoryId" value={category.id} checked={filters.storeCategoryId.includes(category.id)} className="text-main focus:ring-white" id={`${category.name}-${i}`} type="checkbox" />
                  <label htmlFor={`${category.name}-${i}`}>
                    <p>{category.name}</p>
                  </label>
                </div>
              )}
            </ul>
          </div>

          {/* Rating */}
          <RatingsFilter />

          {/*Cards*/}
          <div>
            <h4 className="text-xl font-semibold mb-2">Selecciona tu tarjeta</h4>

            <ul className="text-gray-800 space-y-2 max-h-56 overflow-y-auto">
              {cards.map((card, i) =>
                <CategoryCheckbox
                  key={i}
                  label={card.name}
                  children={card.children}
                />
              )}
            </ul>
          </div>

          <Button
            color="white"
            endAdorment={<ChevronRightIcon className="w-3 h-3" fill="none" />}
            to="/benefits"
          >
            Beneficios
          </Button>

          <Link to={'/stores/burguerking'}>
            <img className="w-full h-[120px] my-6 rounded" src={adsBanner} />
          </Link>

          <Link to={'/stores/burguerking'}>
            <img className="w-full h-[120px] rounded my-6" src={adsBanner2} />
          </Link>
        </div>}
      >
        <div className="mb-10">
          {/*Descuentos*/}
          <h1 className="text-gray-600 font-semibold text-4xl mb-4">Descuentos</h1>
          <Swiper
            navigation
            style={{ padding: '0 100px' }}
            onSlideChange={() => { }}
            autoplay={true}
            slidesPerView={2}
            spaceBetween={50}
            onSwiper={(swiper) => { }}
          >
            {
              storeDiscounts.map((storeDiscount, i) =>
                <SwiperSlide key={i}>
                  <StoreDiscountCard storeDiscount={storeDiscount}></StoreDiscountCard>
                </SwiperSlide>
              )
            }
          </Swiper>
        </div>

        {
          stores.length > 0 ?
            <div>
              {viewType === 'map' && <StoresInMap stores={stores} />}
              {viewType !== 'map' && <StoresCollection stores={stores} isInGridView={viewType === 'grid'} />}
            </div>
            :
            <div className="text-center text-red-500 text-xl">
              No se encontraron resultados.
            </div>
        }



      </LeftSidebarLayout>

      <div className="flex w-full justify-center items-center mt-10">
        <Pagination pages={numberOfPages} activePage={filters.page} onChange={(e) => { handleChange({ target: { name: "page", value: e, type: "number" } }) }}></Pagination>
      </div>
    </Container>
  </>;
};

export default Stores;