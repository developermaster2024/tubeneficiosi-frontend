import Container from "../components/Container"
import burger2 from "../assets/images/burger2.jpg";
import burger from '../assets/images/hamburguesa.jpg';
import StarIcon from "../components/StarIcon";
import MainCategoriesBar from "../components/MainCategoriesBar";
import ProductFeature from "../components/ProductFeature";
import Button from "../components/Button";
import Select from "../components/Select";
import PlusIcon from "../components/PlusIcon";
import { TabsProvider } from "../contexts/TabsContext";
import TabsContainer from "../components/TabsContainer";
import Tab from "../components/Tab";
import TabPanel from "../components/TabPanel";
import TextField from "../components/TextField";
import ChatAlt2Icon from "../components/ChatAlt2Icon";
import Table from "../components/Table";
import TableHead from "../components/TableHead";
import TableRow from "../components/TableRow";
import TableCell from "../components/TableCell";
import TableBody from "../components/TableBody";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import ChevronRightIcon from "../components/ChevronRightIcon";

const Product = () => {
  return <>
    <div className="bg-white mb-10">
      <Container>
        <MainCategoriesBar />
      </Container>
    </div>
  
    <Container>
      <div className="flex space-x-6">
        {/* Images */}
        <div className="w-1/2 flex flex-col space-x-3">
          <img
            src={burger2}
            alt="Hamburguesa"
            className="rounded"
          />

          <div className="flex justify-center mt-6 space-x-3">
            {[1, 2, 3].map(n => <img
              key={n}
              src={burger2}
              alt="Hamburgesa"
              className="w-14 h-14 border border-gray-100 rounded"
            />)}
          </div>
        </div>

        {/* Information */}
        <div className="w-1/2">
          <h3 className="font-bold text-3xl mb-2">BK STACKER 5.0 POWER</h3>

          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map(n => <StarIcon
              key={n}
              className="w-4 h-4 text-yellow-400"
            />)}
            <a href="/#" className="text-gray-600 underline opacity-75">(1 opinión de cliente)</a>
          </div>

          <p className="mt-6">
            Carrots from Tomissy Farm are one of the best on the market. Tomisso
            and his family are giving a full love to his Bio products. Tomisso’s
            carrots are growing on the fields naturally.
          </p>

          {/* Características */}
          <div className="space-y-3 mt-10">
            <div className="flex">
              <ProductFeature
                className="w-1/2"
                name="SKU"
                value="76645"
              />
              <ProductFeature
                className="w-1/2"
                name="Frescura"
                value="1 dia"
              />
            </div>

            <div className="flex">
              <ProductFeature
                className="w-1/2"
                name="Categoría"
                value={<a href="/#" className="underline">Comida rápida</a>}
              />
              <ProductFeature
                className="w-1/2"
                name="Compre por"
                value="pcs, kgs, box, pack"
              />
            </div>

            <div className="flex">
              <ProductFeature
                className="w-1/2"
                name="Stock"
                value="En stock"
              />
              <ProductFeature
                className="w-1/2"
                name="Entrega"
                value="En 1 hora"
              />
            </div>

            <div className="flex">
              <ProductFeature
                className="w-1/2"
                name="Tienda"
                value={<a href="/#" className="underline">Burger king</a>}
              />
              <ProductFeature
                className="w-1/2"
                name="Área de entrega"
                value="Buenos Aires"
              />
            </div>
          </div>

          {/* Precio */}
          <div className="flex items-center p-4 border border-gray-200 rounded-md mt-10">
            <div className="w-56 flex-shrink-0">
              <p className="text-main text-3xl font-semibold">36.23 USD</p>
              <p className="line-through text-700 font-semibold opacity-50">48.56 USD</p>
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-end space-x-2">
                <div className="w-20">
                  <Select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </Select>
                </div>
                <Button color="main" startAdorment={<PlusIcon className="w-4 h-4" />}>
                  Añadir al carrito
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>

    <Container className="mt-10">
      <TabsProvider>
        {/* Tabs */}
        <TabsContainer>
          {/* <div className="px-5 py-2 font-semibold text-lg cursor-pointer border-b-2 border-main">Descripción</div> */}
          <Tab value={0}>Descripción</Tab>
          <Tab value={1}>Preguntas</Tab>
          <Tab value={2}>Comparador</Tab>
        </TabsContainer>

        {/* Tab panels */}
        <TabPanel className="py-4" value={0}>
          <h2 className="text-xl font-semibold">Origins</h2>

          <p className="mt-2">
            We work hard to ensure that the fruit and vegetables we sell are fresh and high in quality. If we don’t grow them   ourselves, we source them from carefully chosen suppliers, preferring to buy locally whenever possible.
          </p>

          <h2 className="text-xl font-semibold mt-10">How to cook</h2>

          <p className="mt-2">
            From roasts, salads and soups to casseroles and cakes, Carrots will lend sweetness, texture and colour to an enormous number of recipes.
          </p>
        </TabPanel>

        <TabPanel className="py-4 space-y-6" value={1}>
          <div className="flex space-x-2">
            <TextField
              placeHolder="Escribí tu pregunta"
              className="w-full"
            />
            <Button color="main">Enviar</Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <ChatAlt2Icon className="w-4 h-4" />
              <span>¿Disponible para entregas personales? - <small className="italic">07/04/2021</small></span>
            </div>
            <div className="flex items-center space-x-2 pl-6 text-gray-700 opacity-75">
              Si - <small className="italic">07/04/2021</small>
            </div>
          </div>
        </TabPanel>

        <TabPanel className="py-4" value={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell variant="head">Comercio</TableCell>
                <TableCell variant="head">Distancia</TableCell>
                <TableCell variant="head">Precio de lsita</TableCell>
                <TableCell variant="head">Promo A</TableCell>
                <TableCell variant="head">Promo B</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[
                {store: {name: 'Express', street: 'Anchomera 1253', state: 'Ciudad Autónoma de Buenos Aires'}, distance: 0.05, price: 135.55},
                {store: {name: 'Supermercados DIA', street: 'CI Charcas 2725', state: 'Capital Federal'}, distance: 0.05, price: 135.65},
                {store: {name: 'COTO CICSA', street: 'Paraguay 2672', state: 'Barrio Norte'}, distance: 0.29, price: 136.69},
                {store: {name: 'Market', street: 'Beruti 2951', state: 'Ciudad Autónoma de Buenos Aires'}, distance: 0.42, price: 135.65},
              ].map((item, i) => <TableRow key={i}>
                <TableCell>
                  <div className="flex space-x-4">
                    <div className="h-16 w-16 border border-gray-100 rounded bg-gray-100"></div>
                    <div>
                      <strong>{item.store.name}</strong>
                      <p>{item.store.street}</p>
                      <p>{item.store.state}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {item.distance} kilómetros
                </TableCell>
                <TableCell>$ {item.price}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>)}
            </TableBody>
          </Table>
        </TabPanel>
      </TabsProvider>
    </Container>

    <Container className="my-10">
      <div className="flex justify-between items-baseline">
        <h3 className="text-2xl font-bold mb-5">Productos relacionados</h3>

        <Link to="/" className="flex items-center">
          Más productos
          <ChevronRightIcon className="w-4 h-4 text-main" />
        </Link>
      </div>
      
      <div className="flex justify-between">
        {[1, 2, 3, 4].map(n => <ProductCard
          key={n}
          name="Product name"
          description="Space for a small product description"
          imgSrc={burger}
          imgAlt="Hamburguesas"
          price="12.00"
        />)}
      </div>
    </Container>
  </>
};

export default Product;