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
import { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import burguerKing from '../assets/images/burger-king.png';
import QuestionsAnswer from '../components/QuestionsAnswer';

const product = {
  name: 'BK STACKER 5.0 POWER',
  isFavorite: false,
  shortDescription: 'Carrots from Tomissy Farm are one of the best on the market. Tomisso and his family are giving a full love to his Bio products. Tomisso’s carrots are growing on the fields naturally.',
  ref: '76645',
  categories: [
    {
      id: 1,
      name: 'Gastronomia'
    },
    {
      id: 2,
      name: 'Hamburguesas'
    },
    {
      id: 3,
      name: 'Comida rapida'
    }
  ],
  stock: true,
  store: {
    id: 1,
    name: 'burguerKing',
    image: burguerKing
  },

  deliveryMethod: {
    id: 4,
    name: 'delivery'
  },

  price: 48.56,

  discount: 20,

  quantity: 42,

  description: 'Hamburguesa que se comeHamburguesa que se comeHamburguesa que se comeHamburguesa que se comeHamburguesa que se comeHamburguesa que se comeHamburguesa que se comeHamburguesa que se comeHamburguesa que se comeHamburguesa que se comeHamburguesa que se comeHamburguesa que se comeHamburguesa que se comeHamburguesa que se comeHamburguesa que se comeHamburguesa que se comeHamburguesa que se comeHamburguesa que se come',

  features: [
    {
      name: 'Extras',
      isGroup: true,
      onlyOne: true,
      features: [
        {
          name: 'BBQ',
          selectAble: true,
          price: 100
        },
        {
          name: 'Bacon',
          selectAble: true,
          price: 15
        },
        {
          name: 'Cheddar',
          selectAble: true,
          price: 19
        },
        {
          name: 'Doble Carne',
          selectAble: true,
          price: 120
        }
      ]
    },
    {
      name: 'Bebidas',
      isGroup: true,
      onlyOne: true,
      features: [
        {
          name: 'Gaseosas',
          selectAble: true,
          price: 130
        },
        {
          name: 'Jugos',
          selectAble: true,
          price: 180
        },
        {
          name: 'Agua',
          selectAble: true,
          price: 140
        },
        {
          name: 'Agua con gas',
          selectAble: true,
          price: 109
        }
      ]
    },
    {
      name: 'Acompañantes',
      isGroup: true,
      onlyOne: false,
      features: [
        {
          name: 'Papas',
          selectAble: true,
          price: 1000
        },
        {
          name: 'Mandioca',
          selectAble: true,
          price: 1000
        },
        {
          name: 'Aros de cebolla',
          selectAble: true,
          price: 3000
        },
      ]
    }
  ]
}

const questions = [
  {
    id: 1,
    message: 'Hola Buen dia existe oferta?',
    user: {
      name: 'Jeyver Vegas',
      id: 1
    },
    createdAt: new Date().toLocaleString(),
    answer: {
      id: 2,
      message: 'Hola Buen dia Si tenemos oferta del 20%',
      user: {
        name: 'BurguerKing',
        id: 2
      },
      createdAt: new Date().toLocaleString(),
    }
  },
  {
    id: 2,
    message: 'Hola... hacen envios en la zona de C.A.B.A',
    user: {
      name: 'Jesus Vicuña',
      id: 3
    },
    createdAt: new Date().toLocaleString(),
    answers: null
  }
]


const Product = () => {

  const [favorite, setFavorite] = useState(false);

  return <div className="p-16">

    <Container>
      <div className="flex space-x-6">
        {/* Images */}
        <div className="w-1/2 flex flex-col space-x-3">
          <img
            src={burger2}
            alt="Hamburguesa"
            className="rounded-xl w-full"
          />

          <div className="flex justify-center mt-6 space-x-3">
            {[1, 2, 3].map(n => <img
              key={n}
              src={burger2}
              alt="Hamburgesa"
              className="h-20 w-20 rounded-xl border border-gray-100 rounded"
            />)}
          </div>
        </div>

        {/* Information */}
        <div className="w-1/2">
          <div className="flex itemx-center text-3xl justify-between">
            <h3 className="font-bold mb-2">BK STACKER 5.0 POWER</h3>
            {
              favorite ?
                <IoHeart onClick={() => {
                  setFavorite((actualValue) => {
                    return !actualValue;
                  })
                }} className="text-main cursor-pointer" />
                :
                <IoHeartOutline onClick={() => {
                  setFavorite((actualValue) => {
                    return !actualValue;
                  })
                }} className="text-main hover:text-main cursor-pointer" />
            }
          </div>

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
                name="Referencia"
                value={product.ref}
              />
              <ProductFeature
                className="w-1/2"
                name="Metodo de Envio"
                value={product.deliveryMethod.name}
              />
            </div>

            <div className="flex">
              <ProductFeature
                className="w-1/2"
                name="Categorias"
                value={product.categories.map((category) => category.name).join(', ')}
              />
              <ProductFeature
                className="w-1/2"
                name="Stock"
                value={product.quantity > 0 ? <p className="text-main">En stock</p> : 'Sin existencia'}
              />
            </div>

            <div className="flex">
              <ProductFeature
                className="w-1/2"
                name="Tienda"
                value={
                  <div className="text-center hover:shadow-xl transition duration-500">
                    <Link to={'/stores/burguerKing'}>
                      <img className="w-12 h-12 rounded m-auto" src={product.store.image} alt="" />
                      <p className="text-blue-500">{product.store.name}</p>
                    </Link>
                  </div>}
              />
            </div>
          </div>

          {/* Precio */}
          <div className="flex items-center p-4 bg-white rounded-md mt-10">
            <div className="w-56 flex-shrink-0">

              {
                product.discount ?
                  <div>
                    <p className="text-main text-3xl font-semibold">{(product.price - ((product.price * product.discount) / 100)).toFixed(2)} USD</p>
                    <p className="line-through text-700 font-semibold opacity-50">{product.price} USD</p>
                  </div>
                  :
                  <p className="text-main text-3xl font-semibold">{product.price} USD</p>
              }
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-end space-x-2">
                <div className="w-20">
                  <Select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option></Select>
                </div>
                <button className="bg-main flex items-center px-4 py-4 rounded-xl text-white font-bold transition duration-500 hover:bg-gray-100 hover:text-main">
                  <PlusIcon className="w-4 h-4 rounded-xl" />
                  Comprar
                </button>
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
          <Tab value={3}>Caracteristicas</Tab>
        </TabsContainer>

        {/* Tab panels */}
        <TabPanel className="py-4 animate__animated animate__fadeInUp" value={0}>
          {product.description}
        </TabPanel>

        <TabPanel className="py-4 space-y-6 animate__animated animate__fadeInUp" value={1}>
          <QuestionsAnswer questions={questions} owner={product.store} />
        </TabPanel>

        <TabPanel className="py-4 animate__animated animate__fadeInUp" value={2}>
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
                { store: { name: 'Express', street: 'Anchomera 1253', state: 'Ciudad Autónoma de Buenos Aires' }, distance: 0.05, price: 135.55 },
                { store: { name: 'Supermercados DIA', street: 'CI Charcas 2725', state: 'Capital Federal' }, distance: 0.05, price: 135.65 },
                { store: { name: 'COTO CICSA', street: 'Paraguay 2672', state: 'Barrio Norte' }, distance: 0.29, price: 136.69 },
                { store: { name: 'Market', street: 'Beruti 2951', state: 'Ciudad Autónoma de Buenos Aires' }, distance: 0.42, price: 135.65 },
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

        <TabPanel className="py-4 animate__animated animate__fadeInUp" value={3}>
          {product.features.map((featuresGroup, i) => {
            return (
              <div key={i} className="text-center mb-8 bg-white p-8 rounded shadow-lg">
                <h1 className="text-xl text-gray-700 font-bold mb-4">{featuresGroup.name}</h1>
                <div className="flex justify-around w-full">
                  {featuresGroup.features.map((feature, ifeat) => {
                    return (
                      <div className="flex">
                        {
                          feature.selectAble ?
                            <input className="text-main ring-main border-main focus:ring-main" type="checkbox" name="" id="" />
                            :
                            null
                        }
                        <p className="ml-4">{feature.name}</p>
                        <p className="ml-4">$ {feature.price}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </TabPanel>
      </TabsProvider>
    </Container>

    <Container className="my-10">
      <div>
        <h3 className="text-xl text-gray-500 font-bold mb-12 text-center w-full">Tambien te puede interesar...</h3>
      </div>

      <div className="flex justify-between">
        {[1, 2, 3, 4].map(n =>
          <ProductCard
            key={n}
            name="Product name"
            description="Space for a small product description"
            imgSrc={burger}
            imgAlt="Hamburguesas"
            price="12.00"
          />)}
      </div>
    </Container>
  </div>
};

export default Product;