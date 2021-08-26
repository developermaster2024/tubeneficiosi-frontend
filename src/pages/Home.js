import shield from '../assets/images/shield.png';
import callCenterAgent from '../assets/images/call-center-agent.png';
import rent from '../assets/images/rent.png';
import appBg from '../assets/images/app-bg.jpg';
import HomeSlider from "../components/HomeSlider";
import SectionHeading from "../components/SectionHeading";
import { Swiper, SwiperSlide } from 'swiper/react';
import StoreDiscountCard from '../components/StoreDiscountCard';
import BankDiscountCard from '../components/BankDiscountCard';
import { storeDiscounts, bankDiscounts } from '../util/discounts'
import { useEffect } from "react";
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
import useAds from "../hooks/useAds";
import ProductsAdsSlider from '../components/ProductsAdsSlider';
import useCategories from '../hooks/useCategories';
import BussinessSection from '../components/BussinessSection';

const Home = () => {

  const { setLoading, setCustomAlert } = useAuth();

  const [{ data: businessSectionData, error: businessSectionError }, getBusinessInfo] = useAxios({ url: "/settings/business-info" }, { useCache: false, manual: true });

  const [{ data: appSectionData, error: appSectionError }, getAppSectionData] = useAxios({ url: "settings/app-section" }, { useCache: false, manual: true });

  const [{ data: necessaryInfoSectionData, error: necessaryInfoSectionError }, getNecessaryInfoData] = useAxios({ url: "/settings/needed-info" }, { useCache: false, manual: true });

  const [{ banners, error: errorBanners, }, getBanners] = useBanners({ axiosConfig: { params: { isActive: "true" } }, options: { manual: true, useCache: false } });

  const [{ storeAds, error: errorStoresAds }, getStoreAds] = useStoreAds({ axiosConfig: { params: { isActive: "true" } }, options: { manual: true, useCache: false } });

  const [{ featuredProducts, error: featuredProductError, loading: featuredProductLoading }, getFeaturedProducts] = useFeaturedProducts({ axiosConfig: { params: { isActive: "true" } }, options: { manual: true, useCache: false } });

  const [{ ads, error: adsError }, getAds] = useAds({ axiosConfig: { params: { isActive: "true" } }, options: { manual: true, useCache: false } });

  const [{ categories, error: errorCategories }, getCategories] = useCategories({ options: { manual: true, useCache: false } });

  useEffect(() => {
    setLoading({ show: true, message: "Cargando datos" });
    Promise.all([
      getBusinessInfo(),
      getAppSectionData(),
      getNecessaryInfoData(),
      getBanners({ params: { isActive: "true" } }),
      getStoreAds({ params: { isActive: "true" } }),
      getFeaturedProducts({ params: { isActive: "true" } }),
      getAds({ params: { isActive: "true" } }),
      getCategories()
    ]).then((values) => {
      setLoading({ show: false, message: "" });
    })
  }, []);

  useEffect(() => {
    console.log(categories);
  }, [categories])

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

    if (adsError) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${adsError?.response?.status === 400 ? adsError?.response?.data.message[0] : adsError?.response?.data.message}.`, severity: "error" });
    }

    if (errorCategories) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${errorCategories?.response?.status === 400 ? errorCategories?.response?.data.message[0] : errorCategories?.response?.data.message}.`, severity: "error" });
    }
  }, [errorBanners, businessSectionError, appSectionError, necessaryInfoSectionError, errorStoresAds, featuredProductError, adsError, errorCategories]);

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
            backgroundImage: `url(${process.env.REACT_APP_API_URL}${category.imgPath})`,
            backgroundSize: 'cover',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <span className="relative capitalize">{category.name}</span>
        </a>)}
      </div>
    </div>

    <div className="container mt-20">
      <SectionHeading>Descrubrí</SectionHeading>
    </div>

    {/* PRODUCT ADS */}
    <div className="container mt-20">
      <ProductsAdsSlider productAds={ads.filter(ads => ads.adsPosition.id === 1)} />
    </div>


    {/* HAGAMOSLO JUNTOS */}
    <BussinessSection businessSectionData={businessSectionData} />

    <div className="container mt-20">
      <SectionHeading>Explorá</SectionHeading>
    </div>

    {/* GASTRONOMIA */}
    <div className="container mt-20">
      <GastronomyFeaturedProducts categoryInfo={categories.filter(category => category.id === 1)[0]} featuredProducts={featuredProducts.filter(product => product?.storeCategory?.id === 1)} />
    </div>

    {/* ESPECTACULOS */}
    <div className="container mt-20">
      <ShowsFeaturedProducts categoryInfo={categories.filter(category => category.id === 2)[0]} featuredProducts={featuredProducts} />
    </div>

    {/* Supermercados */}
    <div className="container my-20">
      <SuperMarketsFeaturedProducts categoryInfo={categories.filter(category => category.id === 3)[0]} featuredProducts={featuredProducts} />
    </div>

    <HomeSlider className="my-12 h-84" imgHeight="400px" banners={ads.filter(ads => ads.adsPosition.id === 3)} />

    {/* Boliches */}
    <div className="container my-20">
      <BolichesFeaturedProducts categoryInfo={categories.filter(category => category.id === 4)[0]} featuredProducts={featuredProducts} />
    </div>

    {/* Farmcias */}
    <div className="container mt-20">
      <PharmacyFeaturedProducts categoryInfo={categories.filter(category => category.id === 5)[0]} featuredProducts={featuredProducts} />
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
      <ProductsAdsSlider productAds={ads.filter(ads => ads.adsPosition.id === 2)} />
    </div>

    {/* MOBILE APP SECTION */}
    <div className="relative py-32 mt-20 text-white"
      style={{ background: appSectionData?.backgroundColor ? appSectionData?.backgroundColor : "#F04141", }}
    >
      <div className="container flex items-center">
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
    </div>
  </>;
};

export default Home;