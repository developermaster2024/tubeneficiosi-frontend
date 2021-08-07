import { useEffect, useState } from "react";
import CategorySectionCard from "./CategorySectionCard";
import ProductCard from "./ProductCard";
import supermarkets from '../assets/images/supermercados.jpg';
import { generateImageUrl } from "../helpers/url";
import ProductModal from "./ProductModal";
import { Swiper, SwiperSlide } from 'swiper/react';

const SuperMarketsFeaturedProducts = ({ featuredProducts }) => {

    useEffect(() => {
        console.log(featuredProducts);
    }, [featuredProducts])

    const [productOnModal, setProductOnModal] = useState(null);

    return (
        <div className="flex space-x-4">
            <div className="w-full">
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

            <CategorySectionCard
                text="Supermercados"
                imgSrc={supermarkets}
            />
            <ProductModal product={productOnModal} closeModal={() => { setProductOnModal(null) }} />
        </div>
    )
}

export default SuperMarketsFeaturedProducts;