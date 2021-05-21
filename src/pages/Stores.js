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

const stores = Array.from(Array(12).keys()).map(_ => ({
  imgSrc: burgerKing,
  imgAlt: 'Burger King',
  name: 'Afialiado A',
  shortDescription: 'Space for a small store description',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus quia architecto ullam optio nulla odio nesciunt, sunt voluptatem minima libero eum tempore in adipisci? Recusandae molestias vitae consequatur aliquam delectus.',
  rating: 4,
}));

const Stores = () => {
  const [isInGridView, setIsInGridView] = useState(true);
  
  return <>
    <div className="bg-white shadow-sm">
      <Container className="py-5">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold">Comercios</h2>

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
            <Link to="/stores" className="inline-flex items-center space-x-1">
              <span className="px-1.5 py-0.5 text-xs bg-yellow-100 text-red-500 font-semibold rounded-lg">110</span>
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

          <Button
            color="white"
            endAdorment={<ChevronRightIcon className="w-3 h-3" fill="none" />}
            to="/benefits"
          >
            Beneficios
          </Button>
        </div>}
      >    
        <StoresCollection stores={stores} isInGridView={isInGridView} />
      </LeftSidebarLayout>

      <div className="flex justify-center items-center mt-10">
        <Pagination />
      </div>
    </Container>
  </>;
};

export default Stores;