import Container from "../components/Container"
import storeBanner from '../assets/images/store-banner.png';
import Checkbox from "../components/Checkbox";
import StarIcon from "../components/StarIcon";
import TextField from "../components/TextField";
import Button from "../components/Button";
import ChevronRightIcon from "../components/ChevronRightIcon";
import Pagination from "../components/Pagination";
import burger from '../assets/images/hamburguesa.jpg';
import burgerKing from '../assets/images/burger-king.png';
import Badge from "../components/Badge";
import { useState } from "react";
import ProductsCollection from "../components/ProductsCollection";
import DiscountsSlider from "../components/DiscountsSlider";
import { discounts } from "../util/discounts";
import { cards } from '../util/cards';
import LeftSidebarLayout from "../components/LeftSidebarLayout";
import CategoryCheckbox from "../components/CategoryCheckbox";
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  IoHeartOutline,
  IoStorefrontSharp,
  IoCartOutline,
  IoLocationSharp,
  IoHeart
} from "react-icons/io5";
import StoreCart from "../components/StoreCart";

const products = Array.from(Array(12).keys()).map(_ => ({
  name: 'Product name',
  description: 'Space for a small product description',
  mainImgSrc: burger,
  mainImgAlt: 'Hamburguesa',
  price: '36.00',
  features: [
    {
      name: 'Extras',
      isGroup: true,
      onlyOne: true,
      features: [
        {
          name: 'BBQ',
          selectAble: true,
          price: 100
        },
        {
          name: 'Bacon',
          selectAble: true,
          price: 15
        },
        {
          name: 'Cheddar',
          selectAble: true,
          price: 19
        },
        {
          name: 'Doble Carne',
          selectAble: true,
          price: 120
        }
      ]
    },
    {
      name: 'Bebidas',
      isGroup: true,
      onlyOne: true,
      features: [
        {
          name: 'Gaseosas',
          selectAble: true,
          price: 130
        },
        {
          name: 'Jugos',
          selectAble: true,
          price: 180
        },
        {
          name: 'Agua',
          selectAble: true,
          price: 140
        },
        {
          name: 'Agua con gas',
          selectAble: true,
          price: 109
        }
      ]
    },
    {
      name: 'Acompañantes',
      isGroup: true,
      onlyOne: false,
      features: [
        {
          name: 'Papas',
          selectAble: true,
          price: 1000
        },
        {
          name: 'Mandioca',
          selectAble: true,
          price: 1000
        },
        {
          name: 'Aros de cebolla',
          selectAble: true,
          price: 3000
        },
      ]
    }
  ]
}));

const Store = () => {
  const [isInGridView, setIsInGridView] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const [showCart, setShowCart] = useState(false);

  return <>
    {/* <div className="bg-white">
      <MainCategoriesBar />
    </div> */}

    <div>
      <Swiper
        navigation
        onSlideChange={() => console.log('slide change')}
        spaceBetween={50}
        onSwiper={(swiper) => console.log(swiper)}
        className="bg-red-500"
      >
        <SwiperSlide className="w-full relative z-[2]">
          <img
            src={storeBanner}
            alt="Tienda"
            className="h-[60vh] w-full"
          />
          <div className="bg-black justify-between items-center bg-opacity-50 flex absolute z-1 bottom-0 w-full left-0 p-6 text-white">
            <div className="flex items-center">
              <div>
                <img className="w-[50px] rounded" src={burgerKing} alt="" />
              </div>
              <div className="ml-4">
                <p className="text-2xl mb-2">BurguerKing</p>
                <p>Juncal 2930</p>
              </div>
            </div>
            <IoLocationSharp className="text-4xl cursor-pointer hover:text-main transition duration-500" />
          </div>
        </SwiperSlide>
        <SwiperSlide className="w-full text-center">
          <iframe
            className="w-full h-[60vh]"
            src="https://www.youtube.com/embed/uRICh6qoca0"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
        </SwiperSlide>
      </Swiper>
    </div>

    <Container withMargin className="mb-20">
      <LeftSidebarLayout
        leftSide={<div className="w-60 space-y-6">
          <h1 className="text-xl text-gray-600 font-bold flex items-center">
            <IoStorefrontSharp className="mr-4 text-4xl" />
            <p>Informacion de la tienda</p>
          </h1>
          <div>
            <p className="my-2"><span className="text-gray-700 font-bold">Telefono:</span> +5491123916734</p>
            <p className="my-2"><span className="text-gray-700 font-bold">Descripcion:</span> Vende Comida</p>
            <p className="my-2"><span className="text-gray-700 font-bold">Instagram:</span> @BurguerKing</p>
            <p className="my-2"><span className="text-gray-700 font-bold">Facebook:</span> @BurguerKing</p>
            <p className="my-2"><span className="text-gray-700 font-bold">Whatsapp:</span> +5491123916734</p>
          </div>
          {/* Categories */}
          <div>
            <h4 className="text-xl font-semibold mb-2">Categories</h4>

            <ul className="space-y-2">
              <li><a href="/#" className="flex justify-between items-center text-gray-800 hover:text-black">
                <span>Arepas</span>
                <Badge>320</Badge>
              </a></li>
              <li><a href="/#" className="flex justify-between items-center text-gray-800 hover:text-black">
                <span>Comida venezolana</span>
                <Badge>112</Badge>
              </a></li>
              <li><a href="/#" className="flex justify-between items-center text-gray-800 hover:text-black">
                <span>Postres</span>
                <Badge>32</Badge>
              </a></li>
              <li><a href="/#" className="flex justify-between items-center text-gray-800 hover:text-black">
                <span>Otra categoría</span>
                <Badge>48</Badge>
              </a></li>
              <li><a href="/#" className="flex justify-between items-center text-gray-800 hover:text-black">
                <span>Comida china</span>
                <Badge>52</Badge>
              </a></li>
              <li><a href="/#" className="flex justify-between items-center text-gray-800 hover:text-black">
                <span>Comida china</span>
                <Badge>3</Badge>
              </a></li>
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
                <Checkbox label={<div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map(n => <StarIcon
                    key={n}
                    className="w-4 h-4 text-yellow-400"
                  />)}
                </div>} />
              </li>)}
            </ul>
          </div>

          {/* Precio */}
          <div>
            <h4 className="text-xl font-semibold mb-2">Precio</h4>

            <ul className="space-y-1 mb-1">
              <li><Checkbox label="Menos de 10$" /></li>
              <li><Checkbox label="10$ a 100$" /></li>
              <li><Checkbox label="100$ a 500$" /></li>
              <li><Checkbox label="500$ a 1000$" /></li>
              <li><Checkbox label="Más de 1000$" /></li>
            </ul>

            <div className="flex space-x-2">
              <TextField
                className="w-20"
                placeHolder="Min $"
              />

              <TextField
                className="w-20"
                placeHolder="Max $"
              />

              <Button color="main">Ir</Button>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xl font-semibold mb-2">Etiquetas</h4>

            <ul className="max-h-40 overflow-y-auto text-gray-800 space-y-2">
              <li><Checkbox label="Arepas" /></li>
              <li><Checkbox label="Televisores" /></li>
              <li><Checkbox label="Empanadas" /></li>
              <li><Checkbox label="Alguna otra" /></li>
              <li><Checkbox label="Arepas" /></li>
              <li><Checkbox label="Televisores" /></li>
              <li><Checkbox label="Empanadas" /></li>
              <li><Checkbox label="Alguna otra" /></li>
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
        </div>}
      >
        <div className="mb-10 flex items-center justify-between">
          <div className="w-10/12">
            <DiscountsSlider discounts={discounts} />
          </div>

          {/* Cart and Favorite Button */}
          <div className="w-2/12 p-4 flex items-center justify-between">
            {
              favorite ?
                <IoHeart onClick={() => {
                  setFavorite((actualValue) => {
                    return !actualValue;
                  })
                }} className="text-[50px] bg-white p-2 rounded-full shadow-lg text-main cursor-pointer" />
                :
                <IoHeartOutline onClick={() => {
                  setFavorite((actualValue) => {
                    return !actualValue;
                  })
                }} className="text-[50px] bg-white p-2 rounded-full shadow-lg text-main hover:text-main cursor-pointer" />
            }

            <IoCartOutline onClick={() => { setShowCart(true) }} className="text-[50px] bg-white p-2 rounded-full text-gray-500 shadow-lg transition duration-500 hover:text-main cursor-pointer"></IoCartOutline>
          </div>
        </div>

        <ProductsCollection
          products={products}
          isInGridView={isInGridView}
        />
      </LeftSidebarLayout>

      <div className="flex justify-center items-center mt-10">
        <Pagination />
      </div>
    </Container>
    <StoreCart show={showCart} closeCart={() => { setShowCart(false) }} />
  </>;
};

export default Store;