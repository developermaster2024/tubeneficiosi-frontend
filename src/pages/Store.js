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

const Store = () => {

  const params = useParams();

  const { setLoading, setCustomAlert } = useAuth();

  const [storeInfo, setStoreInfo] = useState({ phoneNumber: "", shortDescription: "", instagram: "", facebook: "", whatsapp: "" });

  const [videoPreview, setVideoPreview] = useState(null);

  const [filters, setFilters] = useState({ page: 1, categoryStoreIds: [], rating: [], minPrice: null, maxPrice: null, tagsIds: [], size: 12, storeId: null });

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

  const [isInGridView, setIsInGridView] = useState(true);

  const [favorite, setFavorite] = useState(false);

  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    setLoading({ show: loadingStore, message: "Cargando Informacion de la tienda." })
  }, [loadingStore])

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
  }, [error, errorCategoriesStores, storeError]);

  useEffect(() => {
    if (store) {

      console.log(store);

      const { id, userStatus, storeCategory, storeProfile, ...rest } = store;
      const { banner, logo, frontImage, videoUrl, ...rest2 } = storeProfile;

      if (videoUrl) {
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
    }
  }, [store]);

  useEffect(() => {
    getProducts({ params: { ...filters } });
  }, [filters]);

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      const value = filters[e.target.name].includes(e.target.value);
      if (value) {
        const newValues = filters[e.target.name].filter(n => n !== e.target.value);
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
            [e.target.name]: [e.target.value, ...oldFilters[e.target.name]]
          }
        });
      }

      return;
    }
    console.log(e);
  }

  return <>
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
            src={`${process.env.REACT_APP_API_URL}/${store?.storeProfile?.banner}`}
            alt="Tienda"
            className="h-[60vh] w-full"
          />
          <div className="bg-black justify-between items-center bg-opacity-50 flex absolute z-1 bottom-0 w-full left-0 p-6 text-white">
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
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
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
            categoryStoreIds={filters.categoryStoreIds}
            onChange={handleChange}
            name="categoryStoreIds"
            categoriesStores={categoriesStores} />

          <RatingsFilter
            className="my-8"
            onChange={handleChange}
            name="rating"
            values={filters.rating}
          />

          <PriceFilter
            className=" my-8"
            min={{ value: filters.minPrice, name: "minPrice" }}
            max={{ value: filters.maxPrice, name: "maxPrice" }}
            onChange={handleChange}
            onSubmit={() => { getProducts() }}
          />

          <TagsFilter
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
          {
            loading ?
              <div className="text-center text-4xl">
                Cargando Productos...
              </div>
              :
              <ProductsCollection
                products={products}
                isInGridView={isInGridView}
              />
          }

          <div>
            <Pagination pages={numberOfPages} activePage={filters.page} onChange={e => { handleChange({ target: { name: "page", value: e } }) }} />
          </div>
        </div>
      </div>
    </Container>
    <StoreCart show={showCart} closeCart={() => { setShowCart(false) }} />
  </>;
};

export default Store;