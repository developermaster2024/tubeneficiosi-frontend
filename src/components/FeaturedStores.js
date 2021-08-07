import { useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { generateImageUrl } from "../helpers/url";

const FeaturedStores = ({ storesAds }) => {

    return (
        <div className="container mt-20">
            <Swiper
                navigation
                autoplay
                slidesPerView={4}
                spaceBetween={25}
                pagination={{ clickable: true }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {
                    storesAds?.map((storesAd, i) => {
                        return (
                            <SwiperSlide key={storesAd.id}>
                                <div className="relative bg-white max-w-xs w-full rounded-md overflow-hidden shadow">
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}/${storesAd?.store?.storeProfile?.frontImage}`}
                                        alt={storesAd.name}
                                        className="h-20 w-full"
                                    />

                                    <img
                                        src={`${process.env.REACT_APP_API_URL}/${storesAd?.store?.storeProfile?.logo}`}
                                        alt={storesAd.name}
                                        className="absolute left-1/2 top-[40px] h-20 w-20 transform -translate-x-1/2 rounded shadow-md"
                                    />

                                    <div className="p-4 pt-16 space-y-7">
                                        <h4 className="text-2xl text-center">{storesAd?.store?.name}</h4>

                                        <div className="flex justify-evenly space-x-2">
                                            {
                                                storesAd?.products?.length > 0 ?
                                                    storesAd?.products?.slice(0, 3).map((product, i) => {
                                                        return (
                                                            <a key={i} href={`/products/${product.slug}`}>
                                                                <img
                                                                    src={generateImageUrl(product.productImages?.[0]?.path)}
                                                                    alt=""
                                                                    className="w-14 h-14 border border-gray-200 rounded"
                                                                />
                                                            </a>
                                                        )
                                                    })
                                                    :
                                                    <div className="w-full text-red-500 text-center">
                                                        La tienda no tiene productos
                                                    </div>
                                            }
                                        </div>

                                        <div className="text-center">
                                            <a href="/#" className="opacity-75">Ver Tienda</a>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div >
    )
}

export default FeaturedStores;