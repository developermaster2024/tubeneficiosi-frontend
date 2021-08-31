import Container from "../components/Container"
import Button from "../components/Button";
import ChevronRightIcon from "../components/ChevronRightIcon";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import ProductsCollection from "../components/ProductsCollection";
import DiscountsSlider from "../components/DiscountsSlider";
import { discounts } from "../util/discounts";
import { cards } from '../util/cards';
import CategoryCheckbox from "../components/CategoryCheckbox";
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  IoHeartOutline,
  IoCartOutline,
  IoLocationSharp,
  IoHeart
} from "react-icons/io5";
import StoreCart from "../components/StoreCart";
import useProducts from "../hooks/useProducts";
import useCategoriesStores from "../hooks/useCategoriesStores";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useAxios from "../hooks/useAxios";

import StoreInfo from "../components/StoreInfo";
import CategoryFilter from "../components/CategoryFilter";
import RatingsFilter from "../components/RatingsFilter";
import PriceFilter from "../components/PriceFilter";
import TagsFilter from "../components/TagsFilter";
import useTags from "../hooks/useTags";
import { validURL } from "../helpers/formsValidations";

const Store = () => {

  const params = useParams();

  const { setLoading, setCustomAlert, user } = useAuth();

  const [storeInfo, setStoreInfo] = useState({ phoneNumber: "", shortDescription: "", instagram: "", facebook: "", whatsapp: "" });

  const [videoPreview, setVideoPreview] = useState("");

  const [filters, setFilters] = useState({ page: 1, categoryIds: [], rating: [], tagIds: [], perPage: 12, storeId: "" });
  const [priceFilter, setPriceFilter] = useState({ minPrice: "", maxPrice: "" });

  const [{ data: store, error: storeError, loading: loadingStore }, getStore] = useAxios({ url: `/stores/${params?.slug}` }, { useCache: false });

  const [{ products, total, numberOfPages, size, error, loading }, getProducts] = useProducts({
    params: {
      ...filters
    },
    options: {
      manual: true
    }
  });

  const [{ categoriesStores, error: errorCategoriesStores, loading: loadingCategoriesStores }, getCategoriesStores] = useCategoriesStores({ params: { parentOnly: true, storeId: store?.storeId }, options: { useCache: false, manual: true } });

  const [{ tags, error: errorTags, loading: loadingTags }, getTags] = useTags({ params: { storeCategoryId: store?.storeCategory?.id }, options: { useCache: false, manual: true } });

  const [{ data: cartData, error: cartError, loading: cartLoading }, getCart] = useAxios({
    url: `/carts/stores/${store?.storeId}`,
    params: {
      isProcessed: "false",
      isExpired: "false",
      isDirectPurchase: "false"
    }
  }, { manual: true, useCache: false });

  const [isInGridView, setIsInGridView] = useState(true);

  const [favorite, setFavorite] = useState(false);

  const [showCart, setShowCart] = useState(false);

  const [cart, setCart] = useState(null);

  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    setLoading({ show: loadingStore, message: "Cargando Informacion de la tienda." })
  }, [loadingStore]);

  useEffect(() => {
    if (cartData) {
      setCart(cartData);
    }
  }, [cartData])

  useEffect(() => {
    if (cart) {
      setCartQuantity(cart?.cartItems?.reduce?.((acum, item) => acum + Number(item.quantity), 0))
    }
  }, [cart])

  useEffect(() => {
    if (error) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${error?.response?.status === 400 ? error?.response?.data.message[0] : error?.response?.data.message}.`, severity: "error" });
    }
    if (errorCategoriesStores) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${errorCategoriesStores?.response?.status === 400 ? errorCategoriesStores?.response?.data.message[0] : errorCategoriesStores?.response?.data.message}.`, severity: "error" });
    }

    if (storeError) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${storeError?.response?.status === 400 ? storeError?.response?.data.message[0] : storeError?.response?.data.message}.`, severity: "error" });
    }

    if (errorTags) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${errorTags?.response?.status === 400 ? errorTags?.response?.data.message[0] : errorTags?.response?.data.message}.`, severity: "error" });
    }

    if (cartError) {
      setLoading?.({ show: false, message: "" });
      if (cartError?.response?.data.message !== "Carrito no encontrado") {
        setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${cartError?.response?.status === 400 ? cartError?.response?.data.message[0] : cartError?.response?.data.message}.`, severity: "error" });
      }
    }
  }, [error, errorCategoriesStores, storeError, errorTags, cartError]);

  useEffect(() => {
    if (store) {

      const { id, userStatus, storeCategory, storeProfile, ...rest } = store;
      const { banner, logo, frontImage, videoUrl, ...rest2 } = storeProfile;

      if (videoUrl && validURL(videoUrl)) {
        var url_string = videoUrl; //window.location.href
        var url = new URL(url_string);
        var v = url.searchParams.get("v");
        setVideoPreview(`https://www.youtube.com/embed/${v}`);
      }
      setStoreInfo({
        phoneNumber: store.phoneNumber,
        shortDescription: store.storeProfile.shortDescription,
        instagram: store.storeProfile.instagram,
        facebook: store.storeProfile.facebook,
        whatsapp: store.storeProfile.whatsapp
      });

      setFilters((oldFilters) => {
        return {
          ...oldFilters,
          storeId: store.storeId
        }
      });

      getCategoriesStores();
      getTags();

      if (user) {
        getCart();
      }
    }
  }, [store, user]);

  useEffect(() => {

    getProducts({
      params: {
        ...filters,
        tagIds: filters?.tagIds?.join(","),
        categoryIds: filters?.categoryIds?.join(","),
        rating: filters?.rating?.join(","),
        ...priceFilter
      }
    });
  }, [filters]);

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      const value = filters[e.target.name].includes(Number(e.target.value));
      if (value) {
        const newValues = filters[e.target.name].filter(n => n !== Number(e.target.value));
        setFilters((oldFilters) => {
          return {
            ...oldFilters,
            [e.target.name]: newValues,
            page: 1
          }
        });
      } else {
        setFilters((oldFilters) => {
          return {
            ...oldFilters,
            [e.target.name]: [...filters[e.target.name], Number(e.target.value)],
            page: 1
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
    });
  }

  const handleChangePriceFilter = (e) => {
    setPriceFilter((oldPriceFilter) => {
      return {
        ...oldPriceFilter,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleCart = (cart) => {
    setCart(cart);
  }

  return <>
    <StoreCart show={showCart} cart={cart} onChangeCart={handleCart} closeCart={() => { setShowCart(false) }} />
    <div>
      <Swiper
        navigation
        onSlideChange={() => null}
        onSwiper={(swiper) => null}
        className="bg-red-500 z-auto"
      >
        <SwiperSlide className="w-full relative">
          <img
            src={`${process.env.REACT_APP_API_URL}/${store?.storeProfile?.banner}`}
            alt="Tienda"
            className="h-[60vh] w-full"
          />
          <div className="bg-black justify-between items-center bg-opacity-50 flex absolute z-10 bottom-0 w-full left-0 p-6 text-white">
            <div className="flex items-center">
              <div>
                <img className="w-[50px] rounded" src={`${process.env.REACT_APP_API_URL}/${store?.storeProfile?.logo}`} alt="" />
              </div>
              <div className="ml-4">
                <p className="text-2xl mb-2">{store?.name}</p>
                <p>{store?.address}</p>
              </div>
            </div>
            <IoLocationSharp className="text-4xl cursor-pointer hover:text-main transition duration-500" />
          </div>
        </SwiperSlide>
        {
          videoPreview ?
            <SwiperSlide className="w-full text-center">
              <iframe
                className="w-full h-[60vh]"
                src={videoPreview}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
            </SwiperSlide>
            :
            null
        }
      </Swiper>
    </div>

    <Container withMargin className="mb-20">
      <div className="flex justify-between items-start space-x-12">
        <div className="w-3/12">

          <StoreInfo {...storeInfo} />

          <CategoryFilter
            className="my-8 max-h-64 overflow-y-auto"
            loading={loadingCategoriesStores}
            categoryStoreIds={filters.categoryIds}
            onChange={handleChange}
            name="categoryIds"
            categoriesStores={categoriesStores} />

          <RatingsFilter
            className="my-8"
            onChange={handleChange}
            name="rating"
            values={filters.rating}
          />

          <PriceFilter
            className=" my-8"
            min={{ value: priceFilter.minPrice, name: "minPrice" }}
            max={{ value: priceFilter.maxPrice, name: "maxPrice" }}
            onChange={handleChangePriceFilter}
            onSubmit={(e) => {
              if (e) {
                e.preventDefault();
              }
              getProducts({
                params: {
                  ...filters,
                  tagIds: filters?.tagIds?.join?.(","),
                  categoryStoreIds: filters?.categoryStoreIds?.join?.(","),
                  rating: filters?.rating?.join?.(","),
                  ...priceFilter
                }
              })
            }}
          />

          <TagsFilter
            values={filters.tagIds}
            loading={loadingTags}
            tags={tags}
            onChange={handleChange}
            name="tagIds"
            className="my-8" />
          {/*Cards*/}
          <div className="my-8">
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
            className="my-8"
          >
            Beneficios
          </Button>
        </div>
        <div className="w-9/12">
          <div className="mb-10 flex items-center justify-between">
            <div className="w-9/12">
              <DiscountsSlider discounts={discounts} />
            </div>

            {/* Cart and Favorite Button */}
            <div className="w-3/12 p-4 flex items-center space-x-8">
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

              {
                cartLoading ?
                  "Obteniendo carrito..."
                  :
                  cart ?
                    <div className="relative">
                      <IoCartOutline onClick={() => { setShowCart(true) }} className="animate__animated animate__zoomIn text-[50px] bg-white p-2 rounded-full text-gray-500 shadow-lg transition duration-500 hover:text-main cursor-pointer"></IoCartOutline>
                      {
                        cart?.cartItems?.length > 0 && cartQuantity > 0 &&
                        <span style={{ right: cartQuantity.toString().length === 1 ? -5 : cartQuantity.toString().length === 2 ? -7 : -10, top: -7 }} className="bg-main text-white absolute top-0 rounded-full px-1">
                          {cartQuantity}
                        </span>
                      }
                    </div>
                    :
                    "Sin carrito con esta tienda"
              }
            </div>
          </div>
          {
            loading ?
              <div className="text-center text-4xl animate__animated animate__fadeIn">
                Cargando Productos...
              </div>
              :
              products.length > 0 ?
                <div className="animate__animated animate__fadeIn">
                  <ProductsCollection
                    isStore
                    products={products}
                    isInGridView={isInGridView}
                    onAddToCard={handleCart}
                  />
                </div>
                :
                <div className="text-center text-red-500 animate__animated animate__fadeIn">
                  No se han encontrado productos.
                </div>
          }
          {
            numberOfPages > 0 ?
              <div className="mt-12">
                <Pagination pages={numberOfPages} activePage={filters.page} onChange={e => { handleChange({ target: { name: "page", value: e } }) }} />
              </div>
              :
              null
          }
        </div>
      </div>
    </Container>
  </>;
};

export default Store;