import { useEffect, useState } from "react";
import CategorySectionCard from "./CategorySectionCard";
import ProductCard from "./ProductCard";
import bars from '../assets/images/boliches.jpg';
import { generateImageUrl } from "../helpers/url";
import ProductModal from "./ProductModal";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useAxios from "../hooks/useAxios";

const BolichesFeaturedProducts = ({ featuredProducts }) => {

    const history = useHistory();

    const { setLoading, setCustomAlert } = useAuth();

    const [{ loading, error, data }, addToCart] = useAxios({ url: `/carts/add-to-cart`, method: "POST" }, { manual: true, useCache: false });

    const [productOnModal, setProductOnModal] = useState(null);

    useEffect(() => {
        setLoading({ show: loading, message: "Añadiendo al carrito." })
    }, [loading])

    useEffect(() => {
        if (error) {
            setLoading?.({ show: false, message: "" });
            setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${error?.response?.status === 400 ? error?.response?.data.message[0] : error?.response?.data.message}.`, severity: "error" });
        }
    }, [error])

    useEffect(() => {
        if (data) {
            console.log(data)
            history.push(`/checkout?cartId=${data?.id}`);
            return;
        }
    }, [data])

    const handleCloseModal = async (e) => {
        setProductOnModal(null);
        if (e) {
            await addToCart({ data: e });
        }
    }

    return (
        <div className="flex space-x-4">
            <CategorySectionCard
                text="Boliches"
                imgSrc={bars}
            />

            <div className="w-1/2">
                <h4 className="mb-4 text-center text-3xl font-semibold">Mejores productos</h4>

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
                                    price={featuredProduct?.product?.price}
                                    quantity={featuredProduct?.product?.quantity}
                                    onBuy={() => { setProductOnModal(featuredProduct.product) }}
                                    slug={featuredProduct?.product?.quantity}
                                />
                            </SwiperSlide>
                        )
                    })}

                </Swiper>
            </div>
            <ProductModal product={productOnModal} closeModal={handleCloseModal} />
        </div>
    )
}

export default BolichesFeaturedProducts;