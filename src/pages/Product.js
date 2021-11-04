import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../contexts/AuthContext";
import { generateBackendUrl } from "../helpers/url";
import ProductModal from "../components/ProductModal";
import useProducts from "../hooks/useProducts";
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductLoadingComponent from "../components/ProductLoadingComponent";
import StoreDiscountsModal from "../components/dicounts/StoreDiscountsModal";
import ProductProfile from "../components/ProductProfile";
import ShowProfile from "../components/ShowProfile";


const NavigationButton = ({ icon, color, className, onClick, canNext, hidden }) => {
  return (
    <button hidden={hidden} onClick={onClick} className={`text-${color} focus:outline-none ${className}`} disabled={canNext}>
      {icon}
    </button>
  )
};

const Product = () => {
  const { setLoading, setCustomAlert } = useAuth();

  const { slug } = useParams();

  const [swiper, setSwiper] = useState(null);

  const [{ data: product, loading: productLoading }] = useAxios({ url: `/products/${slug}` });

  const [{ products }, getProducts] = useProducts({ options: { manual: true } });

  useEffect(() => {
    setLoading({ show: productLoading, message: 'Cargando' });
  }, [productLoading]);

  useEffect(() => {
    if (product) {
      getProducts({
        params: {
          storeId: product.store.storeId
        }
      })
    }
  }, [product]);

  const handleSwiper = (swiper) => {
    setSwiper(swiper);
  }

  const handleNext = () => {
    swiper?.slideNext();
  }

  const handleBack = () => {
    swiper?.slidePrev();
  }

  /**
   * Si no existe el producto redireccionar a un 404
   */

  return <div className={product?.productDetails ? "p-4 md:p-16" : ""} >
    {
      productLoading ?
        <ProductLoadingComponent />
        :
        <>
          {
            product?.productDetails ?
              <ProductProfile product={product} />
              :
              <ShowProfile show={product} />
          }
          <div className="animate__animated animate__fadeIn">


            <div className="mt-24">
              <h3 className="text-xl text-gray-500 font-bold mb-12 text-center w-full">Tambien te puede interesar...</h3>
            </div>

            <div className="flex justify-between">
              <NavigationButton className="text-4xl text-main focus:outlined-none focus:border-none" onClick={handleBack} icon={<IoChevronBackOutline />}></NavigationButton>
              <Swiper
                slidesPerView={window.innerWidth > 768 ? 4 : 1}
                style={{ width: "80%", padding: "40px 0" }}
                onSwiper={(swiper) => { handleSwiper(swiper) }}
                spaceBetween={window.innerWidth > 768 ? 80 : 0}
                pagination={window.innerWidth > 768 ? false : true}
              >
                {
                  products.map((product, i) => {
                    return (
                      <SwiperSlide key={product.id}>
                        <ProductCard
                          className="m-auto"
                          key={product.id}
                          name={product.name}
                          description={product.shortDescription}
                          imgSrc={`${generateBackendUrl(product.productImages[0].path)}`}
                          imgAlt={product.name}
                          price={product.price}
                          quantity={product.quantity}
                          slug={product.slug}
                        />
                      </SwiperSlide>
                    )
                  }
                  )
                }
              </Swiper>
              <NavigationButton className="text-4xl text-main focus:outlined-none focus:border-none" onClick={handleNext} icon={<IoChevronForwardOutline />}></NavigationButton>
            </div>
          </div>
        </>
    }
  </div>
};

export default Product;