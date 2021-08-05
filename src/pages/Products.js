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
import { discounts } from "../util/discounts";
import CategoryCheckbox from "../components/CategoryCheckbox";
import DiscountsSlider from "../components/DiscountsSlider";
import { cards } from "../util/cards";
import { useAuth } from "../contexts/AuthContext";
import ErrorMsg from "../components/ErrorMsg";
import RatingsFilter from "../components/RatingsFilter";
import PriceFilter from "../components/PriceFilter";
import useProducts from "../hooks/useProducts";
import useCategories from "../hooks/useCategories";

const Products = () => {
  const { setLoading } = useAuth();

  const [isInGridView, setIsInGridView] = useState(true);
  const [filters, setFilters] = useState({ page: 1, perPage: 12, storeCategoryId: [], rating: null, cardDiscount: null });
  const [priceFilter, setPriceFilter] = useState({ minPrice: "", maxPrice: "" })
  const [{ products, total, numberOfPages, size, error, loading }, getProducts] = useProducts({
    params: {
      ...filters
    }
  });

  const [{ categories, error: errorCategories }, getCategories] = useCategories();

  useEffect(() => {
    setLoading({ show: loading, message: "Cargando" });
  }, [loading]);

  useEffect(() => {
    getProducts({
      params: {
        ...filters,
        storeCategoryId: filters.storeCategoryId.join(","),
        ...priceFilter
      }
    });
  }, [filters])


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

  const handleChangePriceFilter = (e) => {
    setPriceFilter((oldPriceFilter) => {
      return {
        ...oldPriceFilter,
        [e.target.name]: e.target.value
      }
    })
  }

  return <>
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
                <div key={i} className="flex items-center space-x-4">
                  <input onChange={handleChange} name="storeCategoryId" value={category.id} checked={filters.storeCategoryId.includes(category.id)} className="text-main focus:ring-white" id={`${category.name}-${i}`} type="checkbox" />
                  <label htmlFor={`${category.name}-${i}`}>
                    <p>{category.name}</p>
                  </label>
                </div>
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
            onSubmit={() => { getProducts({ params: { ...filters, ...priceFilter, storeCategoryId: filters.storeCategoryId.join(",") } }) }}
          />

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
        <div className="mb-10">
          <DiscountsSlider discounts={discounts} />
        </div>

        {
          error
            ? <ErrorMsg message="Error al cargar los productos. Nuestro equipo ha sido notificado, intente más tarde." />
            :
            products.length > 0 ?
              <ProductsCollection
                products={products}
                isInGridView={isInGridView}
              />
              :
              <div className="text-center text-red-500 text-xl">
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