import Container from "../components/Container";
import GridIcon from "../components/GridIcon";
import ListIcon from "../components/ListIcon";
import StarIcon from "../components/StarIcon";
import StoreCard from "../components/StoreCard";
import burgerKing from "../assets/images/burger-king.png";
import Pagination from "../components/Pagination";
import Button from "../components/Button";
import ChevronRightIcon from "../components/ChevronRightIcon";

const Stores = () => {
  return <>
    <div className="bg-white shadow-sm">
      <Container className="py-5">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold">Tiendas</h2>

          <div className="flex space-x-4">
            <a href="/#" className="inline-flex items-center space-x-1">
              <GridIcon className="w-4 h-4" />
              <span>Grid view</span>
            </a>
            <a href="/#" className="inline-flex items-center space-x-1 opacity-50">
              <ListIcon className="w-4 h-4" />
              <span>List view</span>
            </a>
            <a href="/#" className="inline-flex items-center space-x-1">
              <span className="px-1.5 py-0.5 text-xs bg-yellow-100 text-red-500 font-semibold rounded-lg">110</span>
              <span>Tiendas</span>
            </a>
          </div>
        </div>
      </Container>
    </div>

    <Container withMargin className="mb-20">
      <div className="flex space-x-6">
        {/* FILTROS */}
        <div className="w-60 h-screen space-y-5">
          {/* Categories */}
          <div>
            <h4 className="text-xl font-semibold mb-2">Categories</h4>

            <ul className="text-gray-800 space-y-2">
              <li><a href="/#">Gastronomía</a></li>
              <li><a href="/#">Supermercados</a></li>
              <li><a href="/#">Farmacías</a></li>
              <li><a href="/#">Boliches</a></li>
              <li><a href="/#">Espectaculos</a></li>
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

          <Button color="white" endAdorment={<ChevronRightIcon className="w-3 h-3" fill="none" />}>Beneficios</Button>
        </div>

        {/* Tiendas */}
        <div className="flex-grow">
          <div className="grid grid-cols-3 gap-8">
            {Array.from(Array(12).keys()).map(n => <div
              key={n}
              className="flex justify-center"
            >
              <StoreCard
                imgSrc={burgerKing}
                name="Tienda A"
                description="Space for a small store description"
                rating={4}
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

export default Stores;