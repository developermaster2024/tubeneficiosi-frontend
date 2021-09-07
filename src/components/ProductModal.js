import { useEffect, useRef, useState } from "react";
import { IoClose, IoCart } from "react-icons/io5";
import { generateImageUrl } from "../helpers/url";
import { Swiper, SwiperSlide } from 'swiper/react';
import Checkbox from "./Checkbox";
import StarIcon from "./StarIcon";
import CustomSelect from "./CustomSelect";
import reactDom from "react-dom";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

const ProductModal = ({ product, closeModal, isStore }) => {

  const { user } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [featuresPrice, setfeaturesPrice] = useState(0);
  const [productFeaturesData, setProductFeaturesData] = useState({ featureIds: [], featureForGroupIds: [] })

  const [total, setTotal] = useState(product?.price);

  const modalRef = useRef();

  useEffect(() => {
    if (product) {
      console.log(product);
      setTotal(product?.price);
    }
  }, [product])

  useEffect(() => {
    if (product) {
      setTotal((Number(product?.price) + featuresPrice) * quantity);
    }
  }, [quantity, product, featuresPrice]);

  useEffect(() => {
    setQuantity(1)
    setfeaturesPrice(0)
    setProductFeaturesData({ featureIds: [], featureForGroupIds: [] })
  }, [closeModal])

  const handleFeatureChange = (event) => {
    const value = productFeaturesData[event.target.name].includes(Number(event.target.value));
    if (value) {
      const newfeatureIds = productFeaturesData[event.target.name].filter(n => n !== Number(event.target.value))
      setProductFeaturesData((oldProductFeaturesData) => {
        return {
          ...oldProductFeaturesData,
          [event.target.name]: newfeatureIds
        }
      });
      setfeaturesPrice((oldFeaturesPrice) => {
        return oldFeaturesPrice - Number(event.target.cost);
      })
    } else {
      setProductFeaturesData((oldProductFeaturesData) => {
        return {
          ...oldProductFeaturesData,
          [event.target.name]: [...oldProductFeaturesData[event.target.name], Number(event.target.value)]
        }
      });
      setfeaturesPrice((oldFeaturesPrice) => {
        return oldFeaturesPrice + Number(event.target.cost);
      })
    }
  }

  const handleCloseModal = (e) => {
    if (modalRef.current === e.target) {
      closeModal();
    }
  }

  const handleAccept = () => {
    closeModal({
      storeId: product?.store?.storeId,
      productId: product?.id,
      productFeaturesData,
      quantity: quantity,
      isDirectPurchase: isStore ? false : true,
      discount: product?.store?.latestActiveDiscount ? true : false
    });
  }

  if (!product) {
    return null;
  }

  return reactDom.createPortal(
    <div ref={modalRef} onClick={handleCloseModal} className="fixed flex z-50 h-screen w-screen bg-black bg-opacity-50 left-0 top-0 animate__animated animate__fade">
      <div className="w-7/12 overflow-hidden bg-white animate__animated animate__fadeInUp m-auto rounded-xl">
        <div style={{ height: "8%" }} className="p-4 bg-main flex justify-end items-center text-white">
          <button className="text-2xl" onClick={() => { closeModal() }}>
            <IoClose />
          </button>
        </div>
        <div style={{ height: "92%" }} className="p-16 flex items-center space-x-4">
          <div className="w-5/12">
            <Swiper
              autoHeight
              navigation
              slidesPerView={1}
              pagination={{ clickable: true }}
              onSlideChange={() => { }}
              onSwiper={(swiper) => { }}
            >
              {
                product?.productImages?.map((image, i) => {
                  return (
                    <SwiperSlide key={image.id} className="px-10">
                      <img
                        src={generateImageUrl(image?.path)}
                        alt={`product-${product?.store?.name}-${i}`}
                        className="w-full rounded"
                      />
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>
          </div>

          <div className="w-9/12">
            <div className="mb-6">
              <div className="flex justify-center space-x-1 mb-2">
                {Array.from(Array(5).keys()).map(n => <StarIcon
                  key={n}
                  className="w-4 h-4 text-yellow-400"
                />)}
              </div>
              <Link to={`/products/${product.slug}`}>
                <h1 className="text-2xl text-center mb-2 text-gray-600 font-bold hover:text-main">
                  {product.name?.length > 100 ? `${product.name?.slice(0, 100)}...` : product?.name}
                </h1>
              </Link>
              <p className="text-center text-gray-500">
                {product?.shortDescription?.length > 100 ? `${product?.shortDescription?.slice(0, 100)}...` : product?.shortDescription}
              </p>
            </div>
            <div style={{ maxHeight: "250px" }} className="overflow-y-auto h-[50%] custom-scrollbar">
              <div className="mb-2 flex items-center space-x-2">
                <p className="text-lg font-bold text-gray-600">Tienda:</p>
                <Link to={`/stores/${product?.store?.slug}`}>
                  <div className="flex items-center space-x-2">
                    {product?.store?.storeProfile?.logo &&
                      <img className="h-10 w-10 rounded" src={`${process.env.REACT_APP_API_URL}/${product?.store?.storeProfile?.logo}`} alt="" />
                    }
                    <p className="text-gray-500">{product?.store?.name}</p>
                  </div>
                </Link>
              </div>
              <div className="mb-2 flex items-center space-x-4">
                <h3 className="text-lg font-bold text-gray-600">Disponibles:</h3>
                {
                  product.quantity > 0 ?
                    <p className="text-main">{product.quantity}</p>
                    :
                    <p className="text-red-500">No hay disponible</p>
                }

              </div>
              {
                product?.productFeatures?.length > 0 &&
                <div>
                  <h3 className="text-lg font-bold text-gray-600">Características</h3>
                  {product?.productFeatures?.map((feature, i) => <div key={i} className="flex items-center space-x-4 mb-2 text-gray-500">
                    {feature.isSelectable &&
                      <Checkbox
                        name="featureIds"
                        onChange={(e) => { handleFeatureChange({ target: { name: e.target.name, value: e.target.value, type: e.target.type, cost: feature.price } }) }}
                        value={feature.id}
                        checked={productFeaturesData.featureIds.includes(feature.id)}
                      />
                    }
                    <span className="font-bold">{feature.name}:</span>
                    {
                      feature.value &&
                      <span>{feature.value}</span>
                    }
                    <b>{feature.price > 0 ? `$${feature.price}` : feature.isSelectable ? "Gratis." : "Incluido en el producto."}</b>
                  </div>)}
                </div>
              }

              {
                product?.productFeatureGroups?.length > 0 &&
                product?.productFeatureGroups?.map((featuresGroup, i) => {
                  return (
                    <div key={i}>
                      <h3 className="text-lg font-bold text-gray-600">{featuresGroup?.name}</h3>
                      {featuresGroup?.productFeatureForGroups?.map((feature, i) => <div key={i} className="flex items-center space-x-4 mb-2 text-gray-500">
                        {feature.isSelectable &&
                          <Checkbox
                            name="featureForGroupIds"
                            onChange={(e) => { handleFeatureChange({ target: { name: e.target.name, value: e.target.value, type: e.target.type, cost: feature.price } }) }}
                            value={feature.id}
                            checked={productFeaturesData.featureForGroupIds.includes(feature.id)}
                          />
                        }
                        <span className="font-bold">{feature.name}:</span>
                        {
                          feature.value &&
                          <span>{feature.value}</span>
                        }
                        <b>{feature.price > 0 ? `$${feature.price}` : feature.isSelectable ? "Gratis." : "Incluido en el producto."}</b>
                      </div>)}
                    </div>
                  )
                })
              }
              <div>
                <h3 className="text-lg font-bold text-gray-600">Descripción</h3>
                <p>{product?.description}</p>
              </div>
            </div>
            <div className="text-right text-2xl font-bold text-gray-600 font bold">
              ${product?.price}
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="w-1/2 flex items-center space-x-4">
                <p>Cantidad: </p>
                <CustomSelect value={quantity} name="quantity" onChange={(e) => { setQuantity(e.target.value) }}>
                  {Array.from(Array(product?.quantity).keys()).map(n => {
                    return (
                      <option key={n} value={n + 1}>{n + 1}</option>
                    )
                  })}
                </CustomSelect>
              </div>
              <div className="w-1/2 flex justify-end text-xl font-bold text-gray-500 items-center space-x-4">
                Total: ${total?.toLocaleString()}
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button onClick={() => { closeModal() }} className="rounded px-4 py-2 text-main transition duration-500 hover:shadow-xl hover:bg-white hover:text-main focus:ring-white">
                Cancelar
              </button>
              {
                user ?
                  product?.store?.isOpen ?
                    <button onClick={handleAccept} className="bg-main text-lg flex items-center space-x-4 rounded px-4 py-2 text-white transition duration-500 hover:shadow-xl hover:bg-white hover:text-main focus:ring-white">
                      <p>{isStore ? "añadir al carrito" : "Comprar"}</p>
                      <IoCart />
                    </button>
                    :
                    <div className="text-red-500 px-4 py-2">La tienda esta cerrada actualmente.</div>
                  :
                  <Link to={"/login"} className="rounded capitalize px-4 py-2 cursor-pointer text-main transition duration-500 hover:bg-white hover:text-main hover:shadow-xl">
                    iniciar sesión
                  </Link>
              }

            </div>
          </div>
        </div>
      </div>
    </div>
    ,
    document.getElementById("portal")
  );
}

export default ProductModal;