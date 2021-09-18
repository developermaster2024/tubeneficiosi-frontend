import { useEffect, useState } from "react";
import CategorySectionCard from "./CategorySectionCard";
import ProductCard from "./ProductCard";
import { generateImageUrl } from "../helpers/url";
import ProductModal from "./ProductModal";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useAxios from "../hooks/useAxios";
import StoreDiscountsModal from "./dicounts/StoreDiscountsModal";
import useFeaturedProducts from "../hooks/useFeaturedProducts";
import Button from "./Button";

const BolichesFeaturedProducts = ({ categoryInfo }) => {

    const history = useHistory();

    const { setLoading, setCustomAlert } = useAuth();

    const [{ loading, error, data }, addToCart] = useAxios({ url: `/carts/add-to-cart`, method: "POST" }, { manual: true, useCache: false });

    const [{ featuredProducts, error: featuredProductError, loading: featuredProductsLoading }, getFeaturedProducts] = useFeaturedProducts({ options: { useCache: false } });

    const [productOnModal, setProductOnModal] = useState(null);

    const [storeAndProduct, setStoreAndProduct] = useState(null);

    useEffect(() => {
        getFeaturedProducts({ params: { isActive: "true", storeCategoryId: 4 } });
    }, [])

    useEffect(() => {
        setLoading({ show: loading, message: "Añadiendo al carrito." })
    }, [loading, setLoading])

    useEffect(() => {
        if (error) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${error?.response?.status === 400 ? error?.response?.data.message[0] : error?.response?.data.message}.`, severity: "error" });
        }
    }, [error, setLoading, setCustomAlert])

    useEffect(() => {
        if (data) {
            console.log(data)
            history.push(`/checkout?cartId=${data?.id}`);
            return;
        }
    }, [data, history])

    const handleCloseModal = async (e) => {
        setProductOnModal(null);
        if (e) {
            if (e.discount) {
                setStoreAndProduct(e);
                return;
            }
            await addToCart({ data: e });
        }
    }

    const handleClose = async (e) => {
        setStoreAndProduct(null);
        if (e) {
            await addToCart({ data: e });
        }
    }

    return (
        <div className="flex space-x-4">
            <CategorySectionCard
                categoryId={categoryInfo?.id}
                text={categoryInfo?.name}
                imgSrc={`${process.env.REACT_APP_API_URL}${categoryInfo?.imgPath}`}
            />

            <div className="w-1/2">
                <h4 className="mb-4 text-center text-3xl font-semibold">Mejores productos</h4>

                {
                    featuredProductError ?
                        <div className="text-center flex text-xl h-72 text-red-500">
                            <div className="m-auto">
                                <p>Ha ocurrido un error.</p>
                                <Button className="bg-main" onClick={() => { getFeaturedProducts() }}>
                                    Reintentar
                                </Button>
                            </div>
                        </div>
                        :
                        featuredProductsLoading ?
                            <div className="text-center flex text-xl h-72 text-gray-500">
                                <p className="m-auto">Obteniendo Productos...</p>
                            </div>
                            :
                            featuredProducts.length > 0 ?
                                <Swiper
                                    style={{ padding: "20px 0" }}
                                    navigation
                                    autoplay
                                    slidesPerView={2}
                                    spaceBetween={15}
                                    pagination={{ clickable: true }}
                                    onSlideChange={() => { }}
                                    onSwiper={(swiper) => { }}
                                >
                                    {featuredProducts?.map((featuredProduct, i) => {
                                        return (
                                            <SwiperSlide key={featuredProduct.id}>
                                                <ProductCard
                                                    name={featuredProduct?.product?.name}
                                                    description={featuredProduct?.product?.shortDescription}
                                                    imgSrc={generateImageUrl(featuredProduct?.product.productImages?.[0]?.path)}
                                                    imgAlt={featuredProduct?.product?.name}
                                                    rating={featuredProduct?.product?.rating}
                                                    price={featuredProduct?.product?.price}
                                                    quantity={featuredProduct?.product?.quantity}
                                                    onBuy={() => { setProductOnModal(featuredProduct.product) }}
                                                    slug={featuredProduct?.product?.slug}
                                                />
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                                :
                                <div className="text-center flex h-72 text-red-500 space-y-8 mt-12">
                                    <div className="m-auto">
                                        <p className="mb-8">No hay productos destacados en la categoria de Boliches actualmente.</p>
                                        <Link to={`/products`} className="bg-main text-white px-8 py-4 rounded transition duration-500 hover:bg-white hover:shadow-xl hover:text-main">
                                            Ver Vitrina de productos
                                        </Link>
                                    </div>
                                </div>
                }
            </div>
            <ProductModal product={productOnModal} closeModal={handleCloseModal} />
            <StoreDiscountsModal onClose={handleClose} storeAndProduct={storeAndProduct} />
        </div>
    )
}

export default BolichesFeaturedProducts;