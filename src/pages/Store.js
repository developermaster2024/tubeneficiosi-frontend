import Container from "../components/Container"
import MainCategoriesBar from "../components/MainCategoriesBar"
import storeBanner from '../assets/images/store-banner.png';
import GridIcon from "../components/GridIcon";
import ListIcon from "../components/ListIcon";
import Checkbox from "../components/Checkbox";
import StarIcon from "../components/StarIcon";
import TextField from "../components/TextField";
import Button from "../components/Button";
import ChevronRightIcon from "../components/ChevronRightIcon";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import burger from '../assets/images/hamburguesa.jpg';
import burgerKing from '../assets/images/burger-king.png';
import Badge from "../components/Badge";

const Store = () => { 
  return <>
    <div className="bg-white">
      <Container>
        <MainCategoriesBar />
      </Container>
    </div>

    <img
      src={storeBanner}
      alt="Tienda"
      className="h-80 w-full"
    />

    <div className="bg-white shadow-sm">
      <Container className="py-3">
        <div className="flex justify-between items-center">
          <img
            src={burgerKing}
            alt="Burger king"
            className="h-16 w-16 rounded border border-gray-50 object-contain shadow-sm"
          />

          <div className="flex space-x-4">
            <a href="/#" className="inline-flex items-center space-x-1">
              <GridIcon className="w-4 h-4" />
              <span>Vista de grilla</span>
            </a>
            <a href="/#" className="inline-flex items-center space-x-1 opacity-50">
              <ListIcon className="w-4 h-4" />
              <span>Vista de lista</span>
            </a>
            <a href="/#" className="inline-flex items-center space-x-1">
              <Badge>110</Badge>
              <span>Productos</span>
            </a>
          </div>
        </div>
      </Container>
    </div>
  
    <Container withMargin className="mb-20">
      <div className="flex space-x-6">
        {/* FILTROS */}
        <div className="w-60 space-y-6">
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

          <Button color="white" endAdorment={<ChevronRightIcon className="w-3 h-3" fill="none" />}>Beneficios</Button>
        </div>

        {/* Tiendas */}
        <div className="flex-grow">
          <div className="flex items-center mb-10 space-x-6">
            {[
              {name: 'Descuento de navidad', percentage: 60},
              {name: 'Dia de las madres', percentage: 45},
            ].map((discount, i) => <a
              key={i}
              href="/#"
              className="px-3 py-2 text-2xl font-semibold bg-blue-800 text-yellow-400 rounded shadow"
            >
              {discount.name} ({discount.percentage}%)
            </a>)}
          </div>

          <div className="grid grid-cols-3 gap-8">
            {Array.from(Array(12).keys()).map(n => <div
              key={n}
              className="flex justify-center"
            >
              <ProductCard
                key={n}
                name="Product name"
                description="Space for a small product description"
                imgSrc={burger}
                imgAlt="Hamburguesas"
                price="12.00"
              />
            </div>)}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-10">
        <Pagination />
      </div>
    </Container>
  </>;
};

export default Store;