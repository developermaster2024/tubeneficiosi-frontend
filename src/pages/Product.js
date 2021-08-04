import Container from "../components/Container"
import burger from '../assets/images/hamburguesa.jpg';
import StarIcon from "../components/StarIcon";
import ProductFeature from "../components/ProductFeature";
import Select from "../components/Select";
import PlusIcon from "../components/PlusIcon";
import { TabsProvider } from "../contexts/TabsContext";
import TabsContainer from "../components/TabsContainer";
import Tab from "../components/Tab";
import TabPanel from "../components/TabPanel";
import Table from "../components/Table";
import TableHead from "../components/TableHead";
import TableRow from "../components/TableRow";
import TableCell from "../components/TableCell";
import TableBody from "../components/TableBody";
import ProductCard from "../components/ProductCard";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import QuestionsAnswer from '../components/QuestionsAnswer';
import useAxios from "../hooks/useAxios";
import { useAuth } from "../contexts/AuthContext";
import { generateBackendUrl } from "../helpers/url";
import noImage from '../assets/images/no-image.png';
import { isRequired, validate } from "../helpers/formsValidations";
import { getErrorMessage } from "../helpers/axiosErrors";

const Product = () => {
  const {setLoading, setCustomAlert} = useAuth();
  
  const {slug} = useParams();

  const [{data: product2, loading: productLoading}] = useAxios({url: `/products/${slug}`});

  const [{data: questionsData, loading: questionsDataLoading}, fetchQuestions] = useAxios({url: `/questions`}, {manual: true});

  const [_, createQuestion] = useAxios({url: '/questions', method: 'POST'}, {manual: true});
  
  const [favorite, setFavorite] = useState(false);

  const [questionFormData, setQuestionFormData] = useState({
    question: '',
    productId: null,
  });

  const [questionsFormErrors, setQuestionsFormErrors] = useState({
    question: null,
  });

  useEffect(() => {
    setQuestionsFormErrors({
      question: validate(questionFormData.question, [
        { validator: isRequired, errorMessage: 'La pregunta es requerida' },
      ]),
    });
  }, [questionFormData]);

  useEffect(() => {
    setLoading({show: productLoading, message: 'Cargando'});
  }, [productLoading]);

  useEffect(() => {
    setLoading({show: questionsDataLoading, message: 'Cargando preguntas'});
  }, [questionsDataLoading]);

  useEffect(() => {
    if (product2) {
      fetchQuestions({params: {
        productId: product2.id,
        sort: 'createdAt,DESC',
      }});

      setQuestionFormData(prevData => ({
        ...prevData,
        productId: product2.id,
      }));
    }
  }, [fetchQuestions, product2]);

  const handleQuestionChange = (e) => {
    setQuestionFormData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();

    for (let errorName in questionsFormErrors) {
      if (questionsFormErrors[errorName] !== null) {
        setCustomAlert({ show: true, message: questionsFormErrors[errorName], severity: "error" });
        return;
      }
    }

    setLoading({ show: true, message: "Guardando pregunta" });
    
    try {
      await createQuestion({data: questionFormData});
      fetchQuestions({params: {
        productId: product2.id,
        sort: 'createdAt,DESC',
      }});
      setCustomAlert({ show: true, message: 'Pregunta agregada', severity: "success" });
      setQuestionFormData(currentData => ({
        ...currentData,
        question: '',
      }))
    } catch(error) {
      setCustomAlert({ show: true, message: getErrorMessage(error), severity: "error" });
    } finally {
      setLoading({ show: false, message: "" });
    }
  }

  const handleSeeMoreClick = () => {
    fetchQuestions({params: {
      productId: product2.id,
      sort: 'createdAt,DESC',
      perPage: questionsData.size + 10,
    }});
  };

  /**
   * Si no existe el producto redireccionar a un 404
   */
  
  if (!product2) {
    return null;
  }

  return <div className="p-16">
    <Container>
      <div className="flex space-x-6">
        {/* Images */}
        <div className="w-1/2 flex flex-col space-x-3">
          <img
            src={generateBackendUrl(product2.productImages[0].path)}
            alt="Hamburguesa"
            className="rounded-xl w-full"
          />

          <div className="flex justify-center mt-6 space-x-3">
            {product2.productImages.map(image => <img
              key={image.id}
              src={generateBackendUrl(image.path)}
              alt={product2.name}
              className="h-20 w-20 rounded-xl border border-gray-100 rounded"
            />)}
          </div>
        </div>

        {/* Information */}
        <div className="w-1/2">
          <div className="flex itemx-center text-3xl justify-between">
            <h3 className="font-bold mb-2 uppercase">{product2.name}</h3>
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
            {product2.shortDescription}
          </p>

          {/* Características */}
          <div className="space-y-3 mt-10">
            <div className="flex">
              <ProductFeature
                className="w-1/2"
                name="Referencia"
                value={product2.reference || 'Sin referencia'}
              />
              <ProductFeature
                className="w-1/2"
                name="Metodo de Envio"
                value={product2.deliveryMethodTypes.map(item => item.name).join(', ')}
              />
            </div>

            <div className="flex">
              <ProductFeature
                className="w-1/2"
                name="Categorias"
                value={product2.categories.length === 0
                  ? 'Sin categorias'
                  : product2.categories.map((category) => category.name).join(', ')}
              />
              <ProductFeature
                className="w-1/2"
                name="Stock"
                value={product2.quantity > 0 ? <p className="text-main">En stock</p> : 'Sin existencia'}
              />
            </div>

            <div className="flex">
              <ProductFeature
                className="w-1/2"
                name="Tienda"
                value={<div className="text-center hover:shadow-xl transition duration-500">
                  <Link to={`/stores/${product2.store.name}`}>
                    <img
                      className="w-12 h-12 rounded m-auto"
                      src={product2.store.storeProfile?.logo ? generateBackendUrl(product2.store.storeProfile.logo) : noImage}
                      alt={product2.name}
                    />
                    <p className="text-blue-500">{product2.store.name}</p>
                  </Link>
                </div>}
              />
            </div>
          </div>

          {/* Precio */}
          <div className="flex items-center p-4 bg-white rounded-md mt-10">
            <div className="w-56 flex-shrink-0">
              {
                product2.discount ?
                  <div>
                    <p className="text-main text-3xl font-semibold">{(product2.price - ((product2.price * product2.discount) / 100)).toFixed(2)} USD</p>
                    <p className="line-through text-700 font-semibold opacity-50">{product2.price} USD</p>
                  </div>
                  :
                  <p className="text-main text-3xl font-semibold">{product2.finalPrice} USD</p>
              }
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-end space-x-2">
                <div className="w-20">
                  <Select>
                    {[...Array(product2.quantity + 1).keys()].slice(1).map(n => <option value={n}>{n}</option>)}
                  </Select>
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
          <Tab value={0}>Descripción</Tab>
          <Tab value={1}>Preguntas</Tab>
          <Tab value={2}>Comparador</Tab>
          <Tab value={3}>Caracteristicas</Tab>
        </TabsContainer>

        {/* TAB PANELS */}
        {/* Description */}
        <TabPanel className="py-4 animate__animated animate__fadeInUp" value={0}>
          {product2.description}
        </TabPanel>

        {/* Questions */}
        <TabPanel className="py-4 space-y-6 animate__animated animate__fadeInUp" value={1}>
          <QuestionsAnswer
            questions={questionsData?.results ?? []}
            ownerName={product2.store.name}
            ownerImage={generateBackendUrl(product2.store.storeProfile.logo)}
            onChange={handleQuestionChange}
            value={questionFormData.question}
            error={questionsFormErrors.question}
            onSubmit={handleQuestionSubmit}
            onSeeMoreClick={handleSeeMoreClick}
            canSeeMore={questionsData?.results?.length < (questionsData?.total || 0)}
          />
        </TabPanel>

        {/* Price table */}
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

        {/* Features */}
        <TabPanel className="py-4 animate__animated animate__fadeInUp" value={3}>
          <div className="text-center mb-8 bg-white p-8 rounded shadow-lg">
            <h3 className="text-xl text-gray-700 font-bold mb-4">Características</h3>
            <div className="grid grid-cols-4 w-full">
              {product2.productFeatures.map((feature) => <div className="flex" key={feature.id}>
                <input
                  className="text-main ring-main border-main focus:ring-main"
                  type="checkbox"
                  name=""
                  id={`${feature.name}-${feature.id}`}
                />
                <label htmlFor={`${feature.name}-${feature.id}`} className="flex ml-4 space-x-3">
                  <span className="block">{feature.name} ({feature.value})</span>
                  <span className="block">{feature.price}</span>
                </label>
              </div>)}
            </div>
          </div>
          {product2.productFeatureGroups.map((featuresGroup) => <div key={featuresGroup.id} className="text-center mb-8 bg-white p-8 rounded shadow-lg">
            <h3 className="text-xl text-gray-700 font-bold mb-4">{featuresGroup.name}</h3>
            <div className="grid grid-cols-4 w-full">
              {featuresGroup.productFeatureForGroups.map((feature) => <div className="flex" key={feature.id}>
                <input
                  className="text-main ring-main border-main focus:ring-main"
                  type="checkbox"
                  name=""
                  id={`${feature.name}-${feature.id}`}
                  readOnly={!feature.isSelectable}
                />
                <label htmlFor={`${feature.name}-${feature.id}`} className="flex ml-4 space-x-3">
                  <span className="block">{feature.name} ({feature.value})</span>
                  <span className="block">{feature.price}</span>
                </label>
              </div>)}
            </div>
          </div>)}
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

export default Product;;