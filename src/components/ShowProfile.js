import { useEffect, useState } from 'react';
import { IoCheckbox, IoLocationSharp } from 'react-icons/io5';
import { Swiper, SwiperSlide } from 'swiper/react';
import { validURL } from '../helpers/formsValidations';
import { format } from "date-fns";
import { es } from "date-fns/locale";
import onlyUnique from '../helpers/onlyUniques';
import clsx from 'clsx';
import CustomSelect from './CustomSelect';

const ShowProfile = ({ show }) => {

    const [videoPreview, setVideoPreview] = useState('');

    const [selectedPlace, setSelectedPlace] = useState(null);

    const [showFunctions, setShowFunctions] = useState([]);

    const [selectedFunctionShow, setSelectedFunctionShow] = useState(null);

    const [selectedZone, setSelectedZone] = useState(null);

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        console.log(selectedFunctionShow);
    }, [selectedFunctionShow])

    useEffect(() => {
        if (show) {
            if (validURL(show?.showDetails?.trailer)) {
                var url_string = show?.showDetails?.trailer; //window.location.href
                var url = new URL(url_string);
                var v = url.searchParams.get("v");
                setVideoPreview(`https://www.youtube.com/embed/${v}`);
            }

            setShowFunctions(show?.shows);
        }
    }, [show]);

    useEffect(() => {
        if (selectedPlace) {
            setShowFunctions((oldShowFunctions) => {
                return [...show?.shows?.filter?.((showFunction) => showFunction?.place?.id === selectedPlace?.id)];
            })
        }
    }, [selectedPlace])

    if (!show) {
        return null;
    }

    const showsGroupedByPlace = Array.from(new Set(show?.shows?.map((show) => show.place.id))).map(id => ({
        id,
        ...show?.shows?.find(show => show.place.id === id),
    }));

    return (
        <>
            <Swiper
                navigation
                onSlideChange={() => null}
                onSwiper={(swiper) => null}
                autoHeight
                className="bg-red-500 z-auto"
            >
                <SwiperSlide className="w-full relative">
                    <img
                        src={`${process.env.REACT_APP_API_URL}/${show?.productImages[1].path}`}
                        alt={show?.name}
                        className="h-[30vh] md:h-[60vh] w-full"
                    />
                    <div className="bg-black justify-between items-center bg-opacity-50 flex absolute z-10 bottom-0 w-full left-0 p-6 text-white">
                        <div className="flex items-center">
                            <div>
                                <img className="w-[50px] rounded" src={`${process.env.REACT_APP_API_URL}/${show?.productImages[0].path}`} alt="" />
                            </div>
                            <div className="ml-4">
                                <p className="text-2xl mb-2">{show?.name}</p>
                                <p>{show?.description}</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                {
                    videoPreview ?
                        <SwiperSlide className="w-full text-center">
                            <iframe
                                className="w-full md:h-[60vh]"
                                src={videoPreview}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen></iframe>
                        </SwiperSlide>
                        :
                        null
                }
            </Swiper>
            <div className="p-8">
                <div className="flex w-full justify-between">
                    <div className="w-1/2">
                        <h3 className="text-xl text-gray-500 mb-2">Seleccione el lugar</h3>
                        <div className="flex items-center space-x-8">
                            {show?.shows?.length > 0 ?
                                showsGroupedByPlace?.map((show, i) => {
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => { setSelectedPlace(show?.place) }}
                                            className={clsx(["border border-main rounded-full px-4 py-2 transition duration-500 hover:bg-main hover:text-white"], {
                                                "text-white bg-main": show?.place === selectedPlace
                                            })}>
                                            {show?.place?.name}
                                        </button>
                                    )
                                })
                                :
                                <div>

                                </div>
                            }
                        </div>
                    </div>
                    <div className="w-1/2">
                        <h3 className="text-xl text-gray-500 capitalize">Seleccione la fecha</h3>
                        {showFunctions?.length > 0 ?
                            <ul>
                                {
                                    showFunctions?.map((funtionsShow, i) => {
                                        return (
                                            <li className="border-b flex justify-between items-center py-4 px-2 rounded cursor-pointer transition duration-500 hover:shadow-xl" key={i} onClick={() => { setSelectedFunctionShow(funtionsShow) }}>
                                                <span className="capitalize">{`${format(new Date(funtionsShow?.date), 'EEEE', { locale: es })}, ${format(new Date(funtionsShow?.date), 'dd', { locale: es })} de ${format(new Date(funtionsShow?.date), 'LLLL', { locale: es })} de ${format(new Date(funtionsShow?.date), 'yyyy', { locale: es })} a las ${format(new Date(funtionsShow?.date), 'HH:mm:ss', { locale: es })}`} <b>{funtionsShow?.place?.name}</b></span>
                                                {
                                                    selectedFunctionShow?.id === funtionsShow?.id &&
                                                    <IoCheckbox className="text-green-500 text-2xl animate__animated animate__fadeInUp" />
                                                }
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            :
                            <div className="text-red-500 text-xl">
                                No tiene Eventos
                            </div>
                        }
                    </div>
                </div>
                {
                    selectedFunctionShow &&
                    <div className="animate__animated animate__fadeInUp">
                        <h1 className="text-center text-gray-500 text-2xl mt-8">Seleccione los puestos</h1>
                        <div className="flex justify-between space-x-8 mt-4 border-t py-8">
                            <div className="w-1/2">
                                <h3 className="text-center text-gray-500 text-2xl mb-2">Mapa del lugar</h3>
                                <img src={`${process.env.REACT_APP_API_URL}/${selectedFunctionShow?.place?.imgPath}`} alt="" />
                            </div>
                            <div className="w-1/2">
                                <h3 className="text-center text-gray-500 text-2xl mb-2">Seleccione la zona</h3>
                                {selectedFunctionShow?.showToZones?.length > 0 ?
                                    <ul>
                                        {
                                            selectedFunctionShow?.showToZones?.map((zone, i) => {
                                                return (
                                                    <li
                                                        className="border-b flex justify-between items-center py-4 px-2 rounded cursor-pointer transition duration-500 hover:shadow-xl"
                                                        key={i}
                                                        onClick={() => { setSelectedZone(zone) }}>
                                                        <span>{zone?.zone?.name}</span>
                                                        {
                                                            zone?.id === selectedZone?.id &&
                                                            <IoCheckbox className="text-green-500 text-2xl animate__animated animate__fadeInUp" />
                                                        }
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                    :
                                    <div className="text-red-500 text-xl">
                                        No tiene zonas
                                    </div>
                                }
                                {
                                    selectedZone &&
                                    <div className="animate__animated animate__fadeInUp mt-8">
                                        <h3 className="text-center text-gray-500 text-lg mb-4">Seleccione la cantidad de asientos:</h3>
                                        <CustomSelect value={quantity} name="quantity" onChange={(e) => { setQuantity(e.target.value) }}>
                                            {Array.from(Array(selectedZone?.availableSeats).keys()).map(n => {
                                                return (
                                                    <option key={n} value={n + 1}>{n + 1}</option>
                                                )
                                            })}
                                        </CustomSelect>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default ShowProfile;