import Button from "../components/Button";
import ChevronRightIcon from "../components/ChevronRightIcon";
import Container from "../components/Container";
import Pagination from "../components/Pagination";
import Checkbox from "../components/Checkbox";
import GridIcon from "../components/GridIcon";
import ListIcon from "../components/ListIcon";
import LeftSidebarLayout from "../components/LeftSidebarLayout";
import { useEffect, useState } from "react";
import clsx from "clsx";
import ProductsCollection from "../components/ProductsCollection";
import { useAuth } from "../contexts/AuthContext";
import ErrorMsg from "../components/ErrorMsg";
import RatingsFilter from "../components/RatingsFilter";
import PriceFilter from "../components/PriceFilter";
import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";
import useTags from "../hooks/useTags";
import HomeSlider from "../components/HomeSlider";
import useAds from "../hooks/useAds";
import { useLocation } from "react-router-dom";
import DiscountsSlider from "../components/dicounts/DiscountsSlider";
import CardIssuersList from "../components/CardIssuersList";
import CardsList from "../components/CardsList";

const Products = () => {

  const location = useLocation();

  const { setLoading, setCustomAlert } = useAuth();

  const [isInGridView, setIsInGridView] = useState(true);

  const [filters, setFilters] = useState({
    page: 1,
    perPage: 12,
    storeCategoryIds: [],
    tagIds: [],
    rating: null,
    cardIds: [],
    cardIssuerIds: []
  });

  const [cardIssuer, setCardIssuer] = useState(null);

  const [card, setCard] = useState(null);

  const [priceFilter, setPriceFilter] = useState({ minPrice: "", maxPrice: "" });
  const [{ products, total, numberOfPages, error, loading }, getProducts] = useProducts({
    params: {
      ...filters
    }
  });

  const [{ ads: adsBanners, error: errorBannersAds, loading: loadingBannersAds }] = useAds({ options: { useCahe: false }, axiosConfig: { params: { adsPositionId: 5, isActive: "true" } } })

  const [{ ads: adsLeftBanners, error: errorLeftBanners, loading: loadingLeftBannersAds }] = useAds({ options: { useCahe: false }, axiosConfig: { params: { adsPositionId: 4, isActive: "true" } } })

  const [{ categories, error: errorCategories }] = useCategories();
  const [{ tags }] = useTags({ params: { storeCategoryIds: filters.storeCategoryIds.join(","), } });

  useEffect(() => {
    console.log(adsLeftBanners);
  }, [adsLeftBanners])

  useEffect(() => {
    if (errorBannersAds) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${errorBannersAds?.response?.status === 400 ? errorBannersAds?.response?.data.message[0] : errorBannersAds?.response?.data.message}.`, severity: "error" });
    }
    if (errorLeftBanners) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${errorLeftBanners?.response?.status === 400 ? errorLeftBanners?.response?.data.message[0] : errorLeftBanners?.response?.data.message}.`, severity: "error" });
    }
    if (errorCategories) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${errorCategories?.response?.status === 400 ? errorCategories?.response?.data.message[0] : errorCategories?.response?.data.message}.`, severity: "error" });
    }
  }, [errorBannersAds, errorCategories, errorLeftBanners])

  useEffect(() => {
    setLoading({ show: loading, message: "Cargando" });
  }, [loading]);

  useEffect(() => {
    setLoading({ show: loadingBannersAds, message: "Obteniendo Banners" });
  }, [loadingBannersAds]);

  useEffect(() => {
    setLoading({ show: loadingLeftBannersAds, message: "Cargando publicidades" });
  }, [loadingLeftBannersAds]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const storeCategoryId = params.get('storeCategoryId');

    if (storeCategoryId) {
      handleChange({ target: { name: "storeCategoryIds", value: Number(storeCategoryId), type: "checkbox" } })
    }
  }, [location]);

  useEffect(() => {
    getProducts({
      params: {
        ...filters,
        storeCategoryIds: filters.storeCategoryIds.join(","),
        cardIds: filters?.cardIds?.join(","),
        cardIssuerIds: filters?.cardIssuerIds?.join?.(","),
        tagIds: filters.tagIds.join(","),
        ...priceFilter
      }
    });
  }, [filters]);

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

  const handleChangePriceFilter = (e) => {
    setPriceFilter((oldPriceFilter) => {
      return {
        ...oldPriceFilter,
        [e.target.name]: e.target.value
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
          <h2 className="text-3xl font-semibold">Comprar</h2>

          <div className="flex space-x-4">
            <span
              className={clsx(['inline-flex items-center space-x-1 cursor-pointer', !isInGridView && 'opacity-75'])}
              onClick={() => setIsInGridView(true)}
            >
              <GridIcon className="w-4 h-4" />
              <span>Vista de grilla</span>
            </span>
            <span
              className={clsx(['inline-flex items-center space-x-1 cursor-pointer', isInGridView && 'opacity-75'])}
              onClick={() => setIsInGridView(false)}
            >
              <ListIcon className="w-4 h-4" />
              <span>Vista de lista</span>
            </span>
            <span className="inline-flex items-center space-x-1 cursor-pointer">
              <span className="px-1.5 py-0.5 text-xs bg-yellow-100 text-red-500 font-semibold rounded-lg">{total}</span>
              <span>Productos</span>
            </span>
          </div>
        </div>
      </Container>
    </div>

    <Container withMargin className="mb-20">
      <LeftSidebarLayout
        leftSide={<div className="space-y-6">

          <div>
            <h4 className="text-xl font-semibold mb-2">Categorias</h4>
            <ul className="text-gray-800 space-y-2 max-h-56 overflow-y-auto">
              {categories.map((category, i) =>
                <li key={i} className="flex items-center space-x-4">
                  <Checkbox
                    className="capitalize"
                    onChange={handleChange}
                    name="storeCategoryIds"
                    value={category.id}
                    checked={filters.storeCategoryIds.includes(category.id)}
                    id={`${category.name}-${i}`}
                    label={category.name}
                  />
                </li>
              )}
            </ul>
          </div>

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
            onSubmit={(e) => { if (e) { e?.preventDefault() } getProducts({ params: { ...filters, ...priceFilter, storeCategoryId: filters?.storeCategoryId?.join(",") } }) }}
          />

          {/* Categories */}
          {tags?.length > 0 && <div>
            <h4 className="text-xl font-semibold mb-2">Etiquetas</h4>

            <ul className="max-h-72 custom-scrollbar overflow-y-auto text-gray-800 space-y-2">
              {tags?.map((tag) => <li key={tag.id}>
                <Checkbox
                  onChange={handleChange}
                  name="tagIds"
                  value={tag.id}
                  checked={filters.tagIds.includes(tag.id)}
                  id={`${tag.name}-${tag.id}`}
                  label={tag.name}
                />
              </li>)}
            </ul>
          </div>}

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

        {error
          ? <ErrorMsg message="Error al cargar los productos. Nuestro equipo ha sido notificado, intente más tarde." />
          : products.length > 0
            ? <ProductsCollection
              products={products}
              isInGridView={isInGridView}
            />
            : <div className="text-center text-red-500 text-xl">
              No se encontraron productos.
            </div>
        }
      </LeftSidebarLayout>

      <div className="flex justify-center items-center mt-10">
        {
          numberOfPages > 0 ?
            <Pagination
              pages={numberOfPages}
              activePage={filters.page}
              onChange={e => { handleChange({ target: { name: "page", value: e } }) }}
            />
            :
            null
        }
      </div>
    </Container>
  </>
};

export default Products;