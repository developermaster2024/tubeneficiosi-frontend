import { Link } from "react-router-dom";
import events from '../assets/images/espectaculos.jpg';
import gastronomy from '../assets/images/gastronomia.jpg';
import supermarkets from '../assets/images/supermercados.jpg';
import bars from '../assets/images/boliches.jpg';
import pharmacy from '../assets/images/farmacias.jpg';
import motorola from '../assets/images/motorola.jpg';
import aires from '../assets/images/aires.jpg';

import laptop from "../assets/images/laptop.jpg";
import computadora from "../assets/images/monitos.jpg";
import Tvs from "../assets/images/tv.jpg";

import burger from '../assets/images/hamburguesa.jpg';
import shield from '../assets/images/shield.png';
import callCenterAgent from '../assets/images/call-center-agent.png';
import rent from '../assets/images/rent.png';
import appBg from '../assets/images/app-bg.jpg';
import downloadAndroidApp from '../assets/images/download-android-app.svg';
import partner from '../assets/images/partner.jpg';
import clients from '../assets/images/clients.jpg';
import waveUp from '../assets/images/wave-up.png';
import waveDown from '../assets/images/wave-down.png';
import HomeSlider from "../components/HomeSlider";
import ProductAdCard from "../components/ProductAdCard";
import SectionHeading from "../components/SectionHeading";
import banner2 from '../assets/images/banner2.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import StoreDiscountCard from '../components/StoreDiscountCard';
import BankDiscountCard from '../components/BankDiscountCard';
import { storeDiscounts, bankDiscounts } from '../util/discounts'
import { useEffect, useState } from "react";
import ProductModal from "../components/ProductModal";
import burguerKing from '../assets/images/burger-king.png'
import useAxios from "../hooks/useAxios";
import { useAuth } from "../contexts/AuthContext";
import useBanners from "../hooks/useBanners";
import useStoreAds from "../hooks/useStoreAds";
import FeaturedStores from "../components/FeaturedStores";
import useFeaturedProducts from "../hooks/useFeaturedProducts";
import GastronomyFeaturedProducts from "../components/GastronomyFeaturedProducts";
import ShowsFeaturedProducts from "../components/ShowsFeaturedProducts";
import SuperMarketsFeaturedProducts from "../components/SuperMarketsFeaturedProducts";
import BolichesFeaturedProducts from "../components/BolichesFeaturedProducts";
import PharmacyFeaturedProducts from "../components/PharmacyFeaturedProducts";

const categories = [
  { name: 'Espectaculos', img: events },
  { name: 'Gastronomía', img: gastronomy },
  { name: 'Supermercados', img: supermarkets },
  { name: 'Boliches', img: bars },
  { name: 'Farmacias', img: pharmacy },
];

const product = {
  name: 'BK STACKER 5.0 POWER',
  isFavorite: false,
  shortDescription: 'Carrots from Tomissy Farm are one of the best on the market. Tomisso and his family are giving a full love to his Bio products. Tomisso’s carrots are growing on the fields naturally.',
  mainImgSrc: burger,
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

const Home = () => {

  const { setLoading, setCustomAlert } = useAuth();

  const [{ data: businessSectionData, error: businessSectionError }, getBusinessInfo] = useAxios({ url: "/settings/business-info" }, { useCache: false, manual: true });

  const [{ data: appSectionData, error: appSectionError }, getAppSectionData] = useAxios({ url: "settings/app-section" }, { useCache: false, manual: true });

  const [{ data: necessaryInfoSectionData, error: necessaryInfoSectionError }, getNecessaryInfoData] = useAxios({ url: "/settings/needed-info" }, { useCache: false, manual: true });

  const [{ banners, error: errorBanners, }, getBanners] = useBanners({ options: { manual: true, useCache: false } });

  const [{ storeAds, error: errorStoresAds }, getStoreAds] = useStoreAds({ options: { manual: true, useCache: false } });

  const [{ featuredProducts, error: featuredProductError, loading: featuredProductLoading }, getFeaturedProducts] = useFeaturedProducts({ options: { manual: true, useCache: false } });

  useEffect(() => {
    setLoading({ show: true, message: "Cargando datos" });
    Promise.all([getBusinessInfo(), getAppSectionData(), getNecessaryInfoData(), getBanners(), getStoreAds(), getFeaturedProducts()]).then((values) => {
      setLoading({ show: false, message: "" });
    })
  }, []);

  useEffect(() => {
    if (businessSectionError) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${businessSectionError?.response?.status === 400 ? businessSectionError?.response?.data.message[0] : businessSectionError?.response?.data.message}.`, severity: "error" });
    }

    if (appSectionError) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${appSectionError?.response?.status === 400 ? appSectionError?.response?.data.message[0] : appSectionError?.response?.data.message}.`, severity: "error" });
    }

    if (necessaryInfoSectionError) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${necessaryInfoSectionError?.response?.status === 400 ? necessaryInfoSectionError?.response?.data.message[0] : necessaryInfoSectionError?.response?.data.message}.`, severity: "error" });
    }

    if (errorBanners) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${errorBanners?.response?.status === 400 ? errorBanners?.response?.data.message[0] : errorBanners?.response?.data.message}.`, severity: "error" });
    }

    if (errorStoresAds) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${errorStoresAds?.response?.status === 400 ? errorStoresAds?.response?.data.message[0] : errorStoresAds?.response?.data.message}.`, severity: "error" });
    }

    if (featuredProductError) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${featuredProductError?.response?.status === 400 ? featuredProductError?.response?.data.message[0] : featuredProductError?.response?.data.message}.`, severity: "error" });
    }
  }, [errorBanners, businessSectionError, appSectionError, necessaryInfoSectionError, errorStoresAds, featuredProductError]);

  const [productOnModal, setProductOnModal] = useState(null);

  return <>
    <HomeSlider banners={banners} />

    {/* CATEGORIES */}
    <div className="container mt-20">
      <div className="flex space-x-4">
        {categories.map((category, index) => <a
          key={index}
          href="/#"
          className="
            flex items-center justify-center
            relative w-full py-8
            text-white font-semibold text-2xl
            rounded-md overflow-hidden shadow
            transform transition duration-300
            hover:-translate-y-1 hover:shadow-2xl
          "
          style={{
            backgroundImage: `url(${category.img})`,
            backgroundSize: 'cover',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <span className="relative">{category.name}</span>
        </a>)}
      </div>
    </div>

    <div className="container mt-20">
      <SectionHeading>Descrubrí</SectionHeading>
    </div>

    {/* PRODUCT ADS */}
    <div className="container mt-20">
      <div className="flex space-x-4">
        <ProductAdCard
          title={<>
            <p>Pc de</p>
            <p>Escritorios</p>
          </>}
          subtitle="black friday"
          btnText="Ver más"
          href="/#"
          imgSrc={computadora}
          imgAlt="Celulares"
        />
        <ProductAdCard
          title={<>
            <p>Toda una variedad</p>
            <p>de laptops</p>
          </>}
          subtitle="black friday"
          btnText="Ver más"
          href="/#"
          imgSrc={laptop}
          imgAlt="Aires acondicionados"
        />
      </div>
    </div>

    <div
      className="my-80 bg-white relative"
    >
      <img
        src={waveUp}
        alt="Wave up"
        className="w-full absolute transform -translate-y-full"
      />

      {/* HAGAMOSLO JUNTOS */}
      <div className="container">

        <h3 className="text-5xl text-center font-semibold">{businessSectionData?.sectionTitle ? businessSectionData?.sectionTitle : 'Hagámoslo juntos'}</h3>

        <div className="flex space-x-4 mt-20">
          {[
            {
              imgSrc: businessSectionData?.leftSectionImage ? process.env.REACT_APP_API_URL + "/" + businessSectionData?.leftSectionImage : partner,
              title: businessSectionData?.leftSectionTitle ? businessSectionData?.leftSectionTitle : 'Hazte Partner',
              content: businessSectionData?.leftSectionText ? businessSectionData?.leftSectionText : '¡Crece con BeneficioSi! ¡Nuestra tecnología y base de usuarios puede ayudarte a aumentar las ventas y descubrir nuevas oportunidades!',
              button: {
                text: businessSectionData?.leftSectionBtnText ? businessSectionData?.leftSectionBtnText : "UNETE",
                color: businessSectionData?.leftSectionBtnColor ? businessSectionData?.leftSectionBtnColor : "#F04141",
              }
            },
            {
              imgSrc: businessSectionData?.rightSectionImage ? process.env.REACT_APP_API_URL + "/" + businessSectionData?.rightSectionImage : clients,
              title: businessSectionData?.rightSectionTitle ? businessSectionData?.rightSectionTitle : 'Registrate como cliente',
              content: businessSectionData?.rightSectionText ? businessSectionData?.rightSectionText : 'Pedí online rápido y fácil a reconocidas marcas y +10.000 restaurantes',
              button: {
                text: businessSectionData?.rightSectionBtnText ? businessSectionData?.rightSectionBtnText : "UNETE",
                color: businessSectionData?.rightSectionBtnColor ? businessSectionData?.rightSectionBtnColor : "#F04141",
              }
            },
          ].map((item, i) => <div
            key={i}
            className="w-1/2 flex flex-col items-center"
          >
            <div className="flex flex-col items-center space-y-6 mb-6">
              <img
                src={item.imgSrc}
                alt={`bussinesInfoImageleft + ${i + 1}`}
                className="h-60 w-60 rounded-full shadow"
              />
              <h4 className="text-3xl font-semibold">{item.title}</h4>
              <p className="max-w-[350px] text-center text-base">
                {item.content}
              </p>
            </div>

            <button className="inline-flex items-center justify-center
              mt-auto px-6 py-4 space-x-2
              leading-4
              border border-white rounded-lg shadow
              text-white text-xl font-semibold" style={{ background: item.button.color }}>
              {item.button.text}
            </button>
          </div>)}
        </div>
      </div>

      <img
        src={waveDown}
        alt="Wave down"
        className="w-full absolute bottom-0 transform translate-y-full"
      />
    </div>

    <div className="container mt-20">
      <SectionHeading>Explorá</SectionHeading>
    </div>

    {/* GASTRONOMIA */}
    <div className="container mt-20">
      <GastronomyFeaturedProducts featuredProducts={featuredProducts.filter(product => product?.storeCategory?.id === 1)} />
    </div>

    {/* ESPECTACULOS */}
    <div className="container mt-20">
      <ShowsFeaturedProducts featuredProducts={featuredProducts} />
    </div>

    {/* Supermercados */}
    <div className="container mt-20">
      <SuperMarketsFeaturedProducts featuredProducts={featuredProducts} />
    </div>

    <Link to={`/products/slug-del-producto`}>
      <div className="min-h-[50vh] my-8" style={{ backgroundImage: `url(${Tvs})`, backgroundSize: '100% 100%' }}>

      </div>
    </Link>

    {/* Boliches */}
    <div className="container mt-20">
      <BolichesFeaturedProducts featuredProducts={featuredProducts} />
    </div>

    {/* Farmcias */}
    <div className="container mt-20">
      <PharmacyFeaturedProducts featuredProducts={featuredProducts} />
    </div>

    <div className="container mt-20">
      <SectionHeading>Las Mejores tiendas te esperan</SectionHeading>
    </div>

    {/* TIENDA DESTACADAS */}

    <FeaturedStores storesAds={storeAds} />

    {/*Descuentos*/}

    <div className="container mt-20">
      <SectionHeading>Descuentos</SectionHeading>
    </div>

    <div className="my-20 px-24">
      <Swiper
        navigation
        style={{ padding: '0 100px' }}
        onSlideChange={() => { }}
        slidesPerView={3}
        spaceBetween={50}
        onSwiper={(swiper) => { }}
      >
        {
          storeDiscounts.map((storeDiscount, i) =>
            <SwiperSlide key={i}>
              <StoreDiscountCard storeDiscount={storeDiscount}></StoreDiscountCard>
            </SwiperSlide>
          )
        }
      </Swiper>
    </div>

    {/* BENEFICIOS POR BANCO */}

    <div className="container mt-20">
      <SectionHeading>Beneficios por banco</SectionHeading>
    </div>

    <div className="my-20 px-24">
      <Swiper
        navigation
        style={{ padding: '0 100px' }}
        onSlideChange={() => { }}
        slidesPerView={2}
        spaceBetween={50}
        onSwiper={(swiper) => { }}
      >
        {
          bankDiscounts.map((banckDiscount, i) =>
            <SwiperSlide key={i}>
              <BankDiscountCard bankDiscount={banckDiscount} ></BankDiscountCard>
            </SwiperSlide>
          )
        }
      </Swiper>
    </div>


    <div className="container mt-12">
      <p className="text-center font-bold text-gray-500 text-2xl">Mas Productos</p>
    </div>

    {/* PRODUCT ADS */}
    <div className="container mt-12">
      <div className="flex space-x-4">
        <ProductAdCard
          title={<>
            <p>Pc de</p>
            <p>Escritorios</p>
          </>}
          subtitle="black friday"
          btnText="Ver más"
          href="/#"
          imgSrc={computadora}
          imgAlt="Celulares"
        />
        <ProductAdCard
          title={<>
            <p>Toda una variedad</p>
            <p>de laptops</p>
          </>}
          subtitle="black friday"
          btnText="Ver más"
          href="/#"
          imgSrc={laptop}
          imgAlt="Aires acondicionados"
        />
      </div>
    </div>

    {/* MOBILE APP SECTION */}
    <div className="relative py-32 mt-20 text-white"
      style={{ background: appSectionData?.backgroundColor ? appSectionData?.backgroundColor : "#F04141", }}
    >
      <div className="container flex items-center">
        <div>
          <div className="w-7/12 space-y-6">
            <div className="text-center">
              <img
                src={appSectionData?.leftSideImage ? process.env.REACT_APP_API_URL + "/" + appSectionData?.leftSideImage : appBg}
                alt="Smartphone"
                className="m-auto w-62 h-28"
              />
            </div>
            <h4 className="text-5xl text-center font-bold flex-wrap" style={{ color: appSectionData?.titleColor ? appSectionData?.titleColor : "white" }}>{appSectionData?.title ? appSectionData?.title : "Descárgate  la app"}</h4>
            <p className="text-center" style={{ color: appSectionData?.descriptionColor ? appSectionData?.descriptionColor : "white" }}>
              {
                appSectionData?.description ? appSectionData?.description : "Pide lo que sea y síguelo en tiempo real con la app BeneficioSi."
              }
            </p>
            <div className="text-center">
              {/* <a href="/#">
                <img
                  className="m-auto"
                  src={downloadAndroidApp}
                  alt="Descargar app para android"
                />
              </a> */}

            </div>

          </div>
        </div>
        <div className="w-5/12">
          <img
            src={appSectionData?.rightSideImage ? process.env.REACT_APP_API_URL + "/" + appSectionData?.rightSideImage : appBg}
            alt="App"
            className="w-full"
          />
        </div>
      </div>
    </div>

    {/* WHAT WE OFFER */}
    <div className="container my-20">
      <div className="flex justify-evenly">
        {[
          {
            imgSrc: necessaryInfoSectionData?.leftSectionImage ? process.env.REACT_APP_API_URL + "/" + necessaryInfoSectionData?.leftSectionImage : shield,
            title: necessaryInfoSectionData?.leftSectionTitle ? necessaryInfoSectionData?.leftSectionTitle : 'Publicaciones verificadas',
            content: necessaryInfoSectionData?.leftSectionDescription ? necessaryInfoSectionData?.leftSectionDescription : 'Nuestras publicaciones requieren una validación por datos y controlamos lo publicado'
          },
          {
            imgSrc: necessaryInfoSectionData?.middleSectionImage ? process.env.REACT_APP_API_URL + "/" + necessaryInfoSectionData?.middleSectionImage : rent,
            title: necessaryInfoSectionData?.middleSectionTitle ? necessaryInfoSectionData?.middleSectionTitle : 'Compra protegida',
            content: necessaryInfoSectionData?.middleSectionDescription ? necessaryInfoSectionData?.middleSectionDescription : 'Podés señar el auto que quieras y si la compra no se hace efectiva se te devuelve el importe al 100%'
          },
          {
            imgSrc: necessaryInfoSectionData?.rightSectionImage ? process.env.REACT_APP_API_URL + "/" + necessaryInfoSectionData?.rightSectionImage : callCenterAgent,
            title: necessaryInfoSectionData?.rightSectionTitle ? necessaryInfoSectionData?.rightSectionTitle : 'Soporte',
            content: necessaryInfoSectionData?.rightSectionDescription ? necessaryInfoSectionData?.rightSectionDescription : 'Acompañamos el proceso asegurandonos de que todo salga correctamente'
          },
        ].map(item => <div
          className="flex flex-col items-center space-y-4 w-full max-w-xs"
          key={item.title}
        >
          <img
            src={item.imgSrc}
            alt={item.title}
            className="h-20 w-20"
          />

          <h4 className="text-xl font-semibold">{item.title}</h4>

          <p className="text-center">{item.content}</p>
        </div>)}
      </div>
      <ProductModal product={productOnModal} closeModal={() => { setProductOnModal(null) }} />
    </div>
  </>;
};

export default Home;