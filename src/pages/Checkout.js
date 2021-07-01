import {
  IoCartOutline,
  IoArrowForwardOutline,
  IoTrashSharp
} from "react-icons/io5";

import burger from '../assets/images/hamburguesa.jpg';
import transferencia from '../assets/images/transferencia.png';
import efectivo from '../assets/images/efectivo.png';
import mercadopago from '../assets/images/mercadopago.jpg';

import santander from '../assets/images/santander.png';
import provincial from '../assets/images/provincial.png';
import itau from '../assets/images/itau.jpg';
import icbc from '../assets/images/icbc.jpg';

import oca from '../assets/images/oca.png';
import fedex from '../assets/images/fedex.jpg';
import correoargentino from '../assets/images/correo-argentino.png';
import andreani from '../assets/images/andreani.png';


import { useState } from "react";
import { userAddress } from "../util/user-address";
import UserAddressCard from "../components/UserAddressCard";

import { IoStorefrontOutline } from "react-icons/io5";
import { IoCheckmarkCircle } from "react-icons/io5";

import clsx from "clsx";
import { Link } from "react-router-dom";

const payMethods = [
  {
    name: 'MercadoPago',
    image: mercadopago,
    Banks: null
  },
  {
    name: 'Efectivo',
    image: efectivo,
    banks: [
      {
        image: santander,
        name: 'Santander',
        accountDetails: {
          accountType: 'Cuenta Unica',
          sucursal: '0175',
          cuenta: '12345-452',
          cbu: '12345678912345678912',
          alias: 'semidios.olimpo'
        }
      },
      {
        image: provincial,
        name: 'BBVA',
        accountDetails: {
          accountType: 'Cuenta Unica',
          sucursal: '0174',
          cuenta: '12345-452',
          cbu: '12345678912345678912',
          alias: 'semidios.olimpo'
        }
      },
      {
        image: itau,
        name: 'Itau',
        accountDetails: {
          accountType: 'Cuenta Unica',
          sucursal: '0175',
          cuenta: '12345-452',
          cbu: '12345678912345678912',
          alias: 'semidios.olimpo'
        }
      },
      {
        image: icbc,
        name: 'ICBC',
        accountDetails: {
          accountType: 'Cuenta Unica',
          sucursal: '0175',
          cuenta: '12345-452',
          cbu: '12345678912345678912',
          alias: 'semidios.olimpo'
        }
      },
    ]
  },
  {
    name: 'Transferencia',
    image: transferencia,
    banks: [
      {
        image: santander,
        name: 'Santander',
        accountDetails: {
          accountType: 'Cuenta Unica',
          sucursal: '0175',
          cuenta: '12345-452',
          cbu: '12345678912345678912',
          alias: 'semidios.olimpo'
        }
      },
      {
        image: provincial,
        name: 'BBVA',
        accountDetails: {
          accountType: 'Cuenta Unica',
          sucursal: '0174',
          cuenta: '12345-452',
          cbu: '12345678912345678912',
          alias: 'semidios.olimpo'
        }
      },
      {
        image: itau,
        name: 'Itau',
        accountDetails: {
          accountType: 'Cuenta Unica',
          sucursal: '0175',
          cuenta: '12345-452',
          cbu: '12345678912345678912',
          alias: 'semidios.olimpo'
        }
      },
      {
        image: icbc,
        name: 'ICBC',
        accountDetails: {
          accountType: 'Cuenta Unica',
          sucursal: '0175',
          cuenta: '12345-452',
          cbu: '12345678912345678912',
          alias: 'semidios.olimpo'
        }
      },
    ]
  },
];

const deliveryMethods = [
  {
    image: andreani,
    name: 'Andreani'
  },
  {
    image: correoargentino,
    name: 'Correo Argentino'
  },
  {
    image: fedex,
    name: 'Fedex'
  },
  {
    image: oca,
    name: 'OCA'
  },
]

const Checkout = (props) => {

  const { className } = props;

  const [selectedPayMethod, setSelectedPayMethod] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(null);

  const handlePayMethod = (payMethod) => {
    setSelectedPayMethod(payMethod);
    setSelectedBank(null);
  }

  const handleBank = (bank) => {
    setSelectedBank(bank);
  }

  const handleDeliveryMethod = (deliveryMethod) => {
    setSelectedDeliveryMethod(deliveryMethod);
  }

  const handleAddress = (address) => {
    setSelectedAddress(address);
  }

  return (
    <div className={className}>
      <div className="flex items-top p-4 justify-between">
        <div className="bg-white p-6 rounded w-7/12">
          <h1 className="text-4xl text-gray-600 font-bold">
            Realizar Pago
          </h1>

          <div className="my-6 border-b p-4">
            <h2 className="text-2xl">
              Seleccione el metodo de pago:
            </h2>
            <div className="my-4">
              <div className="flex justify-between">
                {
                  payMethods.map((payMethod, i) => {
                    return (
                      <div key={i} className="w-4/12 flex items-center">
                        <input className="checked:text-main checked:ring-main" onClick={() => { handlePayMethod(payMethod) }} value={payMethod.name} type="radio" name="payMethod" />
                        <div className="text-center">
                          <img className="w-[60px] ml-4 rounded" src={payMethod.image} alt="" />
                          {payMethod.name}
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
          {
            selectedPayMethod?.banks ?
              <div className="my-6 p-4 animate__animated animate__fadeInUp">
                <h2 className="text-2xl">
                  Seleccione el Banco:
                </h2>
                <div className="my-4">
                  <div className="flex justify-between">
                    {
                      selectedPayMethod.banks.map((bank, i) => {
                        return (
                          <div key={i} className="w-4/12 flex items-center">
                            <input className="checked:text-main checked:ring-main" onClick={() => { handleBank(bank) }} value={bank.name} type="radio" name={`bank-${selectedPayMethod.name}`} />
                            <div className="text-center">
                              <img className="w-[60px] ml-4 rounded" src={bank.image} alt="" />
                              {bank.name}
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
              :
              null
          }
          {
            selectedBank ?
              <div className="text-center animate__animated animate__fadeInUp border-b">
                <h2 className="text-2xl">
                  Datos de la cuenta:
                </h2>
                <div className="flex w-full flex-wrap">
                  {/* TIPO DE CUENTA */}
                  <div className="my-4 w-1/2">
                    <h3 className="font-bold text-gray-700">Tipo de cuenta:</h3>
                  </div>
                  <div className="my-4 w-1/2">
                    <p>{selectedBank.accountDetails.accountType}</p>
                  </div>

                  {/* SUCURSAL */}
                  <div className="my-4 w-1/2">
                    <h3 className="font-bold text-gray-700">Sucursal:</h3>
                  </div>
                  <div className="my-4 w-1/2">
                    <p>{selectedBank.accountDetails.sucursal}</p>
                  </div>

                  {/* CUENTA */}
                  <div className="my-4 w-1/2">
                    <h3 className="font-bold text-gray-700">Cuenta:</h3>
                  </div>
                  <div className="my-4 w-1/2">
                    <p>{selectedBank.accountDetails.cuenta}</p>
                  </div>

                  {/* CBU */}
                  <div className="my-4 w-1/2">
                    <h3 className="font-bold text-gray-700">CBU:</h3>
                  </div>
                  <div className="my-4 w-1/2">
                    <p>{selectedBank.accountDetails.cbu}</p>
                  </div>

                  {/* CBU */}
                  <div className="my-4 w-1/2">
                    <h3 className="font-bold text-gray-700">Alias:</h3>
                  </div>
                  <div className="my-4 w-1/2">
                    <p>{selectedBank.accountDetails.alias}</p>
                  </div>
                </div>
              </div>
              :
              null
          }

          <div className="mt-4 border-b">
            <h1 className="text-2xl text-gray-500">Seleccione una direccion:</h1>
            <div className="flex flex-wrap px-8 justify-between">
              {
                userAddress.map((address, i) =>
                  <div>
                    {
                      selectedAddress === address ?
                        <IoCheckmarkCircle className="my-2 animate__animated animate__fadeInUp mx-auto text-2xl text-green-500" />
                        :
                        null
                    }
                    <UserAddressCard
                      onClick={() => { handleAddress(address) }}
                      className="m-4 min-h-64 cursor-pointer border hover:shadow-xl hover:border-none relative w-64 bg-white rounded text-gray-500 p-8 transition duration-500"
                      name={address.name}
                      address={address.address}
                      latLng={address.latLng} />
                  </div>
                )
              }
            </div>
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl">
                Seleccione una empresa de envio:
              </h1>
              <div className="text-center flex items-center">
                <input type="radio" name="deliveryMethod" className="checked:text-main checked:ring-main" />
                <div>
                  <IoStorefrontOutline className="ml-auto mr-auto text-4xl" />
                  ¿Deseas retirar en tienda?
                </div>
              </div>
            </div>

            <div className="my-4">
              <div className="flex justify-between">
                {
                  deliveryMethods.map((deliveryMethod, i) => {
                    return (
                      <div key={i} className="w-4/12 flex items-center">
                        <input className="checked:text-main checked:ring-main" onClick={() => { handleDeliveryMethod(deliveryMethod) }} value={deliveryMethod.name} type="radio" name={`deliveryMethod`} />
                        <div className="text-center">
                          <img className="w-[60px] h-[60px] ml-4 rounded" src={deliveryMethod.image} alt="" />
                          {deliveryMethod.name}
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>

          </div>
        </div>
        <div className="w-4/12 p-8">
          <h1 className="text-2xl my-4">Detalle de la Orden</h1>
          <div className="bg-white rounded p-8">
            <div className="border-b">
              <p className="flex text-main w-full items-center text-lg cursor-pointer">
                <span className="ml-auto">Eliminar todo</span>
                <IoTrashSharp />
              </p>
            </div>
            <div className="h-[60vh] overflow-y-auto px-4">
              {
                Array.from(Array(5).keys()).splice(1).map((n) => {
                  return (
                    <div className="my-4">
                      <p className="text-right mb-2">$ 4,58</p>
                      <div className="flex justify-between w-full">
                        <div className="w-1/2 flex items-center">
                          <img src={burger} className="rounded-full h-12 w-12" alt="" />
                          <div className="ml-2">
                            <h3>Hamburguesa</h3>
                            <p>$ 2.69</p>
                          </div>
                        </div>
                        <div className="bg-gray-100 text-main w-12 flex rounded">
                          <p className="m-auto">2</p>
                        </div>
                        <div className="rounded border border-main w-12 flex text-main transition duration-500 cursor-pointer hover:bg-main hover:text-white">
                          <IoTrashSharp className="m-auto"></IoTrashSharp>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className="border-t mt-2">
              <div className="flex justify-between text-gray-400 my-4">
                <span>Descuento</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between text-gray-400 my-4">
                <span>Sub total</span>
                <span>$ 21,03</span>
              </div>
              <div className="px-8 text-center mt-6">
                <button className={clsx(["text-center text-2xl px-14 py-2 rounded text-white"], {
                  'bg-red-500': selectedPayMethod && selectedDeliveryMethod && selectedBank && selectedAddress || selectedPayMethod?.name == 'MercadoPago',
                  'bg-red-100': !selectedPayMethod && !selectedDeliveryMethod && !selectedBank && !selectedAddress || selectedPayMethod?.name != 'MercadoPago'
                })} disabled>
                  <Link to={'/orders/AASSDS25456'}>
                    Pagar
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Checkout;