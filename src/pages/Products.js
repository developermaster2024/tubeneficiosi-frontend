import Button from "../components/Button";
import ChevronRightIcon from "../components/ChevronRightIcon";
import Container from "../components/Container";
import Pagination from "../components/Pagination";
import StarIcon from "../components/StarIcon";
import burger from '../assets/images/hamburguesa.jpg';
import Checkbox from "../components/Checkbox";
import TextField from "../components/TextField";
import GridIcon from "../components/GridIcon";
import ListIcon from "../components/ListIcon";
import LeftSidebarLayout from "../components/LeftSidebarLayout";
import { useEffect, useState } from "react";
import clsx from "clsx";
import ProductsCollection from "../components/ProductsCollection";
import { categories } from "../util/categories";
import { discounts } from "../util/discounts";
import CategoryCheckbox from "../components/CategoryCheckbox";
import DiscountsSlider from "../components/DiscountsSlider";
import { cards } from "../util/cards";
import useAxios from '../hooks/useAxios';
import { useAuth } from "../contexts/AuthContext";
import ErrorMsg from "../components/ErrorMsg";

const Products = () => {
  const {setLoading} = useAuth();
  
  const [isInGridView, setIsInGridView] = useState(true);

  const [activePage, setActivePage] = useState(1);

  const [{data: productsData, loading: fetchProductsLoading, error: fetchProductsError}] = useAxios({
    url: '/products',
    params: {
      page: activePage,
      perPage: 12,
    }
  });

  useEffect(() => {
    setLoading({ show: fetchProductsLoading, message: "Cargando" });
  }, [fetchProductsLoading]);
  
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
              <span className="px-1.5 py-0.5 text-xs bg-yellow-100 text-red-500 font-semibold rounded-lg">110</span>
              <span>Productos</span>
            </span>
          </div>
        </div>
      </Container>
    </div>

    <Container withMargin className="mb-20">
      <LeftSidebarLayout
        leftSide={<div className="space-y-6">
          {/* Categories */}
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
        <div className="mb-10">
          <DiscountsSlider discounts={discounts} />
        </div>

        {
          fetchProductsError
            ? <ErrorMsg message="Error al cargar los productos. Nuestro equipo ha sido notificado, intente más tarde." />
            : <ProductsCollection
              products={productsData?.results ?? []}
              isInGridView={isInGridView}
            />
        }
      </LeftSidebarLayout>

      <div className="flex justify-center items-center mt-10">
        {productsData && <Pagination
          pages={productsData.numberOfPages}
          activePage={activePage}
          onChange={setActivePage}
        />}
      </div>
    </Container>
  </>
};

export default Products;