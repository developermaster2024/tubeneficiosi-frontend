import { Link } from "react-router-dom";
import { IoEye, IoStorefrontSharp } from "react-icons/io5";
import CustomInput from "./CustomInput";
import Button from "./Button";

const OrdersTable = (props) => {

  const { orders, className, values, onFiltersChange, options, onClearFilters } = props;

  console.log(orders);

  return (
    <div className={className}>
      <div className="flex w-full items-center font-bold">
        <div className="w-1/12 p-2">
          Referencia
          <CustomInput name="orderNumber" value={values.orderNumber} onChange={onFiltersChange} placeholder="Referencia..." />
        </div>
        <div className="w-2/12 p-2">
          Direccion
          <CustomInput name="address" value={values.address} onChange={onFiltersChange} placeholder="direccion..." />
        </div>
        <div className="w-2/12 p-2">
          Tienda
          <CustomInput name="storeName" value={values.storeName} onChange={onFiltersChange} placeholder="nombre de la tienda" />
        </div>
        <div className="w-1/12 p-2">
          Total
          <CustomInput name="minTotal" value={values.minTotal} onChange={onFiltersChange} placeholder="min" className="my-2" />
          <CustomInput name="maxTotal" value={values.maxTotal} onChange={onFiltersChange} placeholder="max" className="my-2" />
        </div>
        <div className="w-2/12 p-2">
          Fecha
          <CustomInput name="minDate" value={values.minDate} onChange={onFiltersChange} placeholder="desde" className="my-2" />
          <CustomInput name="maxDate" value={values.maxDate} onChange={onFiltersChange} placeholder="hasta" className="my-2" />
        </div>
        <div className="w-1/12 p-2">
          <p>Estado</p>
          <select name="orderStatusCode" value={values.orderStatusCode} onChange={onFiltersChange} type="text" className="max-w-full border-gray-200 mt-2 rounded p-1">
            {
              options.orderStatuses.map((orderStatus, i) => {
                return (
                  <option key={i} value={orderStatus.code}>{orderStatus.name}</option>
                )
              })
            }
          </select>
        </div>
        <div className="w-2/12 p-2">
          Pago
          <select name="paymentMethodCode" value={values.paymentMethodCode} onChange={onFiltersChange} type="text" className="max-w-full border-gray-200 mt-2 rounded p-1">
            {
              options.payMethods.map((payMethod, i) => {
                return (
                  <option key={i} value={payMethod.code}>{payMethod.name}</option>
                )
              })
            }
          </select>
        </div>
        <div className="w-1/12 p-2">
          <Button onClick={onClearFilters} className="bg-main transition duration-500 hover:bg-white hover:text-main">
            Limpiar Filtros
          </Button>
        </div>
      </div>
      <div className="w-full text-center">
        {
          orders?.length > 0 ?
            orders.map((order, i) => <div className="flex bg-white my-4 p-6 items-center rounded-lg transition duration-300 transform hover:shadow-xl hover:-translate-y-2">
              <div className="w-1/12 text-center">
                {order?.orderNumber}
              </div>
              <div className="w-2/12">
                {order?.delivery?.profileAddress?.address}
              </div>
              <div className="w-2/12">
                <Link to={`/stores/${order?.store?.slug}`} className="text-blue-500">
                  {
                    order?.store?.storeProfile?.logo ?
                      <img className="w-12 h-12 rounded m-auto" src={`${process.env.REACT_APP_API_URL}/${order?.store?.storeProfile?.logo}`} alt="" />
                      :
                      <IoStorefrontSharp className="m-auto text-gray-500 text-xl" />
                  }
                  <p>{order?.store?.name}</p>
                </Link>
              </div>
              <div className="w-1/12">
                $ {order?.total.toLocaleString()}
              </div>
              <div className="w-2/12">
                {order?.createdAt?.toLocaleString()}
              </div>
              <div className="w-1/12 rounded-lg p-2 font-bold bg-opacity-10" >
                <p className="px-2 py-1 rounded text-white" style={{ backgroundColor: order?.orderStatus?.color }}>
                  {order?.orderStatus?.name}
                </p>
              </div>
              <div className="w-2/12">
                {order?.paymentMethod?.name}
              </div>
              <div className="w-1/12">
                <Link to={`/my-account/orders/${order?.id}`}>
                  <IoEye className="m-auto text-2xl cursor-pointer hover:text-main transition duration-300"></IoEye>
                </Link>
              </div>
            </div>
            )
            :
            <div className="text-center text-red-500 text-2xl my-8">
              No se Encontraron Pedidos.
            </div>
        }
      </div>
    </div>
  )
}

export default OrdersTable;