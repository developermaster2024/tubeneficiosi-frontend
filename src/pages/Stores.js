import Container from "../components/Container";
import GridIcon from "../components/GridIcon";
import ListIcon from "../components/ListIcon";
import StarIcon from "../components/StarIcon";
import burgerKing from "../assets/images/burger-king.png";
import Pagination from "../components/Pagination";
import Button from "../components/Button";
import ChevronRightIcon from "../components/ChevronRightIcon";
import LeftSidebarLayout from "../components/LeftSidebarLayout";
import { useState } from "react";
import clsx from "clsx";
import StoresCollection from "../components/StoresCollection";
import { Link } from "react-router-dom";
import LocationMarker from "../components/LocationMarker";
import StoresInMap from "./StoresInMap";
import CategoryCheckbox from "../components/CategoryCheckbox";
import { categories } from "../util/categories";
import DiscountsSlider from "../components/DiscountsSlider";
import { discounts, storeDiscounts } from "../util/discounts";
import { cards } from "../util/cards";
import adsBanner from '../assets/images/banner.jpg';
import adsBanner2 from '../assets/images/banner2.jpg';
import storesBanner from '../assets/images/storesbanner.webp';

import { Swiper, SwiperSlide } from 'swiper/react';
import StoreDiscountCard from "../components/StoreDiscountCard";

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

const stores = Array.from(Array(12).keys()).map(n => ({
  imgSrc: burgerKing,
  imgAlt: 'Burger King',
  name: 'Afialiado A',
  shortDescription: 'Space for a small store description',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus quia architecto ullam optio nulla odio nesciunt, sunt voluptatem minima libero eum tempore in adipisci? Recusandae molestias vitae consequatur aliquam delectus.',
  rating: 4,
  latLng: latLngs[n],
}));

const Stores = () => {
  const [viewType, setViewType] = useState('grid');

  const [activePage, setActivePage] = useState(1);

  return <>
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
              <span className="px-1.5 py-0.5 text-xs bg-yellow-100 text-red-500 font-semibold rounded-lg">110</span>
              <span>Comercios</span>
            </Link>
          </div>
        </div>
      </Container>
    </div>

    <Link to={'/stores/burguerking'}>
      <div className="h-[35vh] w-full" style={{ backgroundImage: `url(${storesBanner})`, backgroundSize: '100% 100%' }}>
      </div>
    </Link>

    <Container withMargin className="mb-20">
      <LeftSidebarLayout
        leftSide={<div className="space-y-5">
          <div>
            <h4 className="text-xl font-semibold mb-2">Categories</h4>

            <ul className="text-gray-800 space-y-2 max-h-56 overflow-y-auto">
              {categories.map((category, i) => <CategoryCheckbox
                key={i}
                label={category.name}
                children={category.children}
              />)}
            </ul>
          </div>

          {/* Rating */}
          <div>
            <h4 className="text-xl font-semibold mb-2">Rating</h4>

            <ul className="text-gray-800 space-y-3">
              {[1, 2, 3, 4, 5].map(i => <li
                key={i}
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-offset-0 focus:ring-blue-200 focus:ring-opacity-50"
                />
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map(n => <StarIcon
                    key={n}
                    className="w-4 h-4 text-yellow-400"
                  />)}
                </div>
              </li>)}
            </ul>
          </div>

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
            onSlideChange={() => console.log('slide change')}
            autoplay={true}
            slidesPerView={2}
            spaceBetween={50}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {
              storeDiscounts.map((storeDiscount, i) =>
                <SwiperSlide>
                  <StoreDiscountCard storeDiscount={storeDiscount}></StoreDiscountCard>
                </SwiperSlide>
              )
            }
          </Swiper>
        </div>

        {viewType === 'map' && <StoresInMap stores={stores} />}
        {viewType !== 'map' && <StoresCollection stores={stores} isInGridView={viewType === 'grid'} />}


      </LeftSidebarLayout>

      <div className="flex w-full justify-center items-center mt-10">
        <Pagination pages={10} activePage={activePage} onChange={setActivePage}></Pagination>
      </div>
    </Container>
  </>;
};

export default Stores;