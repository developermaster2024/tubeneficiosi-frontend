import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import PayMethodSection from "../components/PayMethodSection";
import CheckoutDetailsCard from "../components/CheckoutDetailsCard";
import SelectDeliverySection from '../components/SelectDeliverySection';
import { isRequired, validate } from "../helpers/formsValidations";

const Checkout = (props) => {


  const { className } = props;
  const location = useLocation();

  const [deliveryMethod, setDeliveryMethod] = useState(true);

  const [showPayments, setShowPayments] = useState(false);

  const [checkoutData, setCheckoutData] = useState({
    cartId: "",
    paymentMethodCode: "",
    deliveryMethodId: "",
    profileAddressId: "",
    bankTransfers: []
  });

  const [errorsForm, setErrorsForm] = useState({
    cartId: null,
    paymentMethodCode: null,
    deliveryMethodId: null,
    profileAddressId: null,
    totalTransfer: null
  });

  const [canBuy, setCanBuy] = useState(false);

  const [storeId, setStoreId] = useState("");

  const [cartSubTotal, setCartSubTotal] = useState(0);


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('cartId');
    if (id) {
      setCheckoutData((oldCheckoutData) => {
        return {
          ...oldCheckoutData,
          cartId: id
        }
      })
    }
  }, [location]);

  useEffect(() => {
    setErrorsForm({
      cartId: validate(checkoutData.cartId, [
        { validator: isRequired, errorMessage: "El carrito es obligatorio." },
      ]),
      paymentMethodCode: validate(checkoutData.paymentMethodCode, [
        { validator: isRequired, errorMessage: "El metodo de pago es obligatorio." }
      ]),
      deliveryMethodId: deliveryMethod ?
        validate(checkoutData.deliveryMethodId, [
          { validator: isRequired, errorMessage: "Por favor seleccione una empresa de envios." },
        ])
        :
        null
      ,
      profileAddressId: deliveryMethod ?
        validate(checkoutData.profileAddressId, [
          { validator: isRequired, errorMessage: "Por favor seleccione una dirección de envio." },
        ])
        :
        null,
      totalTransfer: checkoutData?.bankTransfers.length > 0 && cartSubTotal === checkoutData?.bankTransfers?.reduce((acum, transfer) => acum + Number(transfer.amount), 0) ? null : "El monto de las transferencias no puede estar por encima ni por debajo del total de la orden. Por favor verifique."
    });
  }, [checkoutData]);

  useEffect(() => {
    if (!errorsForm.deliveryMethodId && !errorsForm.profileAddressId) {
      setShowPayments(true);
      return;
    }
    setShowPayments(false);
  }, [errorsForm]);

  useEffect(() => {
    console.log(checkoutData);
    for (let errors in errorsForm) {
      if (errorsForm[errors] !== null) {
        console.log(errorsForm[errors])
        setCanBuy(false);
        return;
      }
    }
    console.log(errorsForm);
    setCanBuy(true);
  }, [errorsForm]);

  const handleChange = (e) => {
    setCheckoutData((oldChackoutData) => {
      return {
        ...oldChackoutData,
        [e.target.name]: e.target.type === "checkbox" && e.target.name === "deliveryMethodId" ? Number(e.target.value) : e.target.value
      }
    })
  }

  const handleCart = (cart) => {
    setCartSubTotal(cart.subTotal);
    setStoreId(cart?.storeId);
  }

  return (
    <div className={className}>
      <div className="flex items-center p-4 justify-between">
        <div className="bg-white p-6 rounded w-7/12">
          <h1 className="text-4xl text-gray-600 font-bold">
            Realizar Pago
          </h1>

          <SelectDeliverySection
            onChange={handleChange}
            storeId={storeId}
            deliveryMethod={deliveryMethod}
            onSelectDeliveryMethod={(e) => { setDeliveryMethod(e) }}
            values={{ deliveryMethodId: checkoutData.deliveryMethodId, profileAddressId: checkoutData.profileAddressId }}
            className="mt-8 border-b pb-2 animate__animated animate__fadeInUp" />

          {
            showPayments &&
            <PayMethodSection
              values={{ paymentMethodCode: checkoutData.paymentMethodCode, bankAccountId: checkoutData.bankAccountId, bankTransfers: checkoutData.bankTransfers }}
              onChange={handleChange} />
          }
        </div>
        <div className="w-4/12 p-8">
          <CheckoutDetailsCard canBuy={canBuy} emitCart={handleCart} cartId={checkoutData.cartId} />
        </div>
      </div>
    </div >
  )
}

export default Checkout;