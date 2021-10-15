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


import useStores from "../hooks/useStores";
import useCategories from "../hooks/useCategories";
import { useAuth } from "../contexts/AuthContext";

import RatingsFilter from "../components/RatingsFilter";
import useAds from "../hooks/useAds";
import HomeSlider from "../components/HomeSlider";
import DiscountsSlider from "../components/dicounts/DiscountsSlider";
import CardIssuersList from "../components/CardIssuersList";
import CardsList from "../components/CardsList";
import Checkbox from "../components/Checkbox";
import useStoreFeatures from "../hooks/useStoresFeatures";

const Stores = () => {

  const { setLoading, setCustomAlert } = useAuth();

  const [filters, setFilters] = useState({
    page: 1,
    perPage: 12,
    storeCategoryIds: [],
    minRating: "",
    withCheapestProduct: true,
    cardIssuerIds: [],
    cardIds: [],
    storeFeatureIds: []
  });

  const [cardIssuer, setCardIssuer] = useState(null);

  const [card, setCard] = useState(null);

  const [viewType, setViewType] = useState('grid');
  const [canShowLoading, setCanShowLoading] = useState(false);

  const [{ ads: adsBanners, error: errorBannersAds }, getBannersAds] = useAds({ options: { useCahe: false }, axiosConfig: { params: { adsPositionId: 7, isActive: "true" } } })

  const [{ ads: adsLeftBanners, error: errorLeftBanners }, getLeftAds] = useAds({ options: { useCahe: false }, axiosConfig: { params: { adsPositionId: 8, isActive: "true" } } })

  const [{ storeFeatures, loading: featuresStoresLoading, error: featuresStoresError }] = useStoreFeatures({ params: { storeCategoryIds: filters.storeCategoryIds.join(","), } });

  const [{ stores, total, numberOfPages, error, loading }, getStores] = useStores({
    params: {
      ...filters,
      cardIssuerIds: filters.cardIssuerIds.join(","),
      cardIds: filters.cardIds.join(","),
      storeCategoryIds: filters.storeCategoryIds.join(","),
      storeFeatureIds: filters.storeFeatureIds.join(",")
    }
  });

  const [{ categories, error: errorCategories }, getCategories] = useCategories()


  useEffect(() => {
    setLoading({ show: true, message: "Obteniendo Informacion" });
    Promise.all([getStores(), getCategories(), getBannersAds({ params: { adsPositionId: 7, isActive: "true" } }), getLeftAds({ params: { adsPositionId: 8, isActive: "true" } })]).then((values) => {
      setLoading({ show: false, message: "" });
      setCanShowLoading(true);
    })
  }, [getStores, getCategories, getBannersAds, getLeftAds, setLoading, setCanShowLoading]);

  useEffect(() => {
    console.log(stores);
  }, [stores])

  useEffect(() => {
    if (canShowLoading) {
      setLoading({ show: loading, message: "Cargando tiendas" });
    }
  }, [canShowLoading]);

  useEffect(() => {
    if (error) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${error?.response?.status === 400 ? error?.response?.data.message[0] : error?.response?.data.message}.`, severity: "error" });
    }
    if (errorCategories) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${errorCategories?.response?.status === 400 ? errorCategories?.response?.data.message[0] : errorCategories?.response?.data.message}.`, severity: "error" });
    }
    if (errorBannersAds) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${errorBannersAds?.response?.status === 400 ? errorBannersAds?.response?.data.message[0] : errorBannersAds?.response?.data.message}.`, severity: "error" });
    }
    if (errorLeftBanners) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${errorLeftBanners?.response?.status === 400 ? errorLeftBanners?.response?.data.message[0] : errorLeftBanners?.response?.data.message}.`, severity: "error" });
    }
  }, [error, errorCategories, errorBannersAds, errorLeftBanners, setLoading, setCustomAlert]);

  useEffect(() => {
    handleCard(null);
    setFilters((oldFilters) => {
      return {
        ...oldFilters,
        cardIssuerIds: cardIssuer?.id ? [cardIssuer?.id] : [],
        cardIds: [],
        page: 1
      }
    })
  }, [cardIssuer]);

  useEffect(() => {
    setFilters((oldFilters) => {
      return {
        ...oldFilters,
        cardIssuerIds: card ? [] : oldFilters.cardIssuerIds,
        cardIds: card?.id ? [card?.id] : [],
        page: 1
      }
    })
  }, [card]);

  useEffect(() => {
    if (viewType === 'map') {
      setFilters((oldFilters) => {
        return {
          ...oldFilters,
          perPage: 100,
          page: 1
        }
      });
    } else {
      setFilters((oldFilters) => {
        return {
          ...oldFilters,
          perPage: 12,
        }
      });
    }
  }, [viewType])

  const handleChange = (e) => {

    if (e.target.name === "minRating") {
      setFilters((oldFilters) => {
        return {
          ...oldFilters,
          [e.target.name]: oldFilters[e.target.name] === e.target.value ? "" : e.target.value
        }
      });
      return;
    }


    if (e.target.type === "checkbox") {
      const value = filters[e.target.name].includes(Number(e.target.value));
      if (value) {
        const newValues = filters[e.target.name].filter(n => n !== Number(e.target.value));
        console.log(newValues);
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
            [e.target.name]: [Number(e.target.value), ...oldFilters[e.target.name]],
            page: 1
          }
        });
      }
      return;
    }

    setFilters((oldFilters) => {
      if (e.target.name !== "page") {
        return {
          ...oldFilters,
          [e.target.name]: e.target.value,
          page: 1
        }
      }
      return {
        ...oldFilters,
        [e.target.name]: e.target.value,
      }
    })
  }

  const handleCardIssuer = (cardIssuer) => {
    setCardIssuer(cardIssuer)
  }

  const handleCard = (card) => {
    setCard(card);
  }

  return <>
    <HomeSlider banners={adsBanners} />
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
                <div key={i} className="flex items-center space-x-4 cursor-pointer">
                  <input
                    onChange={handleChange}
                    name="storeCategoryIds"
                    value={category.id}
                    checked={filters.storeCategoryIds.includes(category.id)}
                    className="text-main focus:ring-white"
                    id={`${category.name}-${i}`}
                    type="checkbox" />
                  <label className="cursor-pointer capitalize" htmlFor={`${category.name}-${i}`}>
                    <p>{category.name}</p>
                  </label>
                </div>
              )}
            </ul>
          </div>

          {/* Rating */}
          <RatingsFilter
            className="my-8"
            onChange={handleChange}
            name="minRating"
            values={filters.minRating}
          />

          {
            featuresStoresLoading ?
              <div className="text-center">
                Cargando preferencias...
              </div>
              :
              storeFeatures?.length > 0 && <div>
                <h4 className="text-xl font-semibold mb-2">Preferencia</h4>

                <ul className="max-h-72 custom-scrollbar overflow-y-auto text-gray-800 space-y-2">
                  {storeFeatures?.map((storeFeature) => <li key={storeFeature.id}>
                    <Checkbox
                      onChange={handleChange}
                      name="storeFeatureIds"
                      value={storeFeature.id}
                      checked={filters.storeFeatureIds.includes(storeFeature.id)}
                      id={`${storeFeature.name}-${storeFeature.id}`}
                      label={storeFeature.name}
                    />
                  </li>)}
                </ul>
              </div>
          }

          <div className="text-center text-xl">
            Entes
          </div>
          <CardIssuersList selectedCardIssuer={cardIssuer} emitCardIssuer={handleCardIssuer} />

          <div className="mt-8">
            <CardsList selectedCard={card} cardIssuer={cardIssuer} emitCard={handleCard} />
          </div>

          <Button
            color="white"
            endAdorment={<ChevronRightIcon className="w-3 h-3" fill="none" />}
            to="/benefits"
          >
            Beneficios
          </Button>

          {
            adsLeftBanners.map((leftBanner, i) => {
              return (
                <a href={leftBanner.url} key={i}>
                  <img className="w-full h-[120px] my-6 rounded" src={`${process.env.REACT_APP_API_URL}/${leftBanner.imgPath}`} alt={`leftBanner-${i}`} />
                </a>
              )
            })
          }
        </div>}
      >
        <div className="mb-10">
          <DiscountsSlider slidesPerview={1.5} />
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