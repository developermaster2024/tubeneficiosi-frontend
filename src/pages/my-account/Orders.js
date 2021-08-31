import OrdersTable from '../../components/OrdersTable';
import { IoDocumentTextSharp } from "react-icons/io5";
import Pagination from '../../components/Pagination';
import { useEffect, useState } from 'react';
import useOrders from '../../hooks/useOrders';
import { useAuth } from '../../contexts/AuthContext';
import usePayMethods from '../../hooks/usePayMethods';
import useOrdersStatuses from '../../hooks/useOrdersStatuses';

const MyAccountOrders = () => {

  const { setLoading, setCustomAlert } = useAuth();

  const [filters, setFilters] = useState({
    page: 1,
    orderNumber: "",
    address: "",
    storeName: "",
    minTotal: "",
    maxTotal: "",
    minDate: "",
    maxDate: "",
    orderStatusCode: "",
    paymentMethodCode: ""
  });


  const [{ orders, error: ordersError, loading: ordersLoading, numberOfPages }, getOrders] = useOrders({ axiosConfig: { params: { ...filters } } });

  const [{ payMethods, error: payMethodsError, loading: payMethodsLoading }, getPayMethods] = usePayMethods();

  const [{ ordersStatuses, error: ordersStatusesError, loading: ordersStatusesLoading }, getOrdersStatuses] = useOrdersStatuses();

  useEffect(() => {
    setLoading({ show: ordersLoading, message: "Obteniendo tus pedidos" });
  }, [ordersLoading]);

  useEffect(() => {
    console.log(orders);
  }, [orders])


  useEffect(() => {

    if (ordersError) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${ordersError?.response?.status === 400 ? ordersError?.response?.data.message[0] : ordersError?.response?.data.message}.`, severity: "error" });
    }

    if (payMethodsError) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${payMethodsError?.response?.status === 400 ? payMethodsError?.response?.data.message[0] : payMethodsError?.response?.data.message}.`, severity: "error" });
    }

    if (ordersStatusesError) {
      setLoading?.({ show: false, message: "" });
      setCustomAlert?.({ show: true, message: `Ha ocurrido un error: ${ordersStatusesError?.response?.status === 400 ? ordersStatusesError?.response?.data.message[0] : ordersStatusesError?.response?.data.message}.`, severity: "error" });
    }
  }, [ordersError, payMethodsError, ordersStatusesError]);


  useEffect(() => {
    getOrders();
  }, [filters])

  const handleChange = (e) => {
    setFilters((oldFilters) => {
      if (e.target.name !== "page") {
        return {
          ...oldFilters,
          [e.target.name]: e.target.value,
          page: 1
        }
      }
      return {
        ...oldFilters,
        [e.target.name]: e.target.value,
      }
    });
  }

  const handleClearFilters = () => {
    setFilters({
      page: 1,
      orderNumber: "",
      address: "",
      storeName: "",
      minTotal: "",
      maxTotal: "",
      minDate: "",
      maxDate: "",
      orderStatusCode: "",
      paymentMethodCode: ""
    })
  }

  return (
    <div className="px-8">
      <h1 className="text-2xl flex items-center text-gray-600 font-bold my-5">
        <IoDocumentTextSharp className="text-4xl"></IoDocumentTextSharp>
        <span className="ml-4">Mis Pedidos</span>
      </h1>

      <OrdersTable
        onClearFilters={handleClearFilters}
        options={{ payMethods: payMethods, orderStatuses: ordersStatuses }}
        values={{ ...filters }}
        onFiltersChange={handleChange}
        orders={orders}
        className="w-full my-12 text-gray-500 text-center" />

      {
        numberOfPages > 0 ?
          <Pagination
            pages={numberOfPages}
            activePage={filters.page}
            onChange={e => { handleChange({ target: { name: "page", value: e } }) }}
          />
          :
          null
      }

    </div>
  )
}

export default MyAccountOrders;