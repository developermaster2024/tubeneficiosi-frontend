import StatCard from '../../components/statCard.js';
import { IoDocumentTextSharp } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoBarChartSharp } from "react-icons/io5";

import LineChart from '../../components/LineChart.js';
import useCarts from '../../hooks/useCarts.js';
import useOrders from '../../hooks/useOrders.js';
import useProfileAddress from '../../hooks/useProfileAddress.js';
import { useAuth } from '../../contexts/AuthContext.js';
import useQuestions from '../../hooks/useQuestions.js';

var values = [10, 41, 35, 51, 49, 62, 69, 91, 148, 54, 71, 63, 42, 85, 16, 12, 45, 75, 63, 52, 78, 95, 52, 24, 35, 45, 54, 74, 63, 12, 0];

const MyAccountDashboard = () => {

  const { user } = useAuth();

  const [{ total: cartsTotal, error: cartsError, loading: cartsLoading }, getCarts] = useCarts({
    axiosConfig: {
      params: {
        isProcessed: "false",
        isExpired: "false",
        isDirectPurchase: "false"
      }
    }
  });

  const [{ error: ordersError, loading: ordersLoading, total: ordersTotal }, getOrders] = useOrders();

  const [{ total: addressTotal, error: addressError, loading: addressLoading }, getProfileAddress] = useProfileAddress();

  const [{ error: questionsError, loading: questionsLoading, total: questionsTotal }, getQuestions] = useQuestions({
    axiosConfig: {
      params: {
        askedById: user?.id
      }
    }
  });

  return (
    <div className="px-20 px-12">
      <h1 className="text-2xl flex items-center text-gray-600 font-bold my-5">
        <IoBarChartSharp className="text-4xl"></IoBarChartSharp>
        <span className="ml-4">Resumen</span>
      </h1>

      <div className="flex justify-between">
        <StatCard
          link="/my-account/orders"
          icon={IoDocumentTextSharp}
          value={ordersTotal}
          iconColor="info"
          title={'Mis Pedidos'}
          loading={ordersLoading}
        ></StatCard>

        <StatCard
          link="/my-account/carts"
          icon={IoCartOutline}
          value={cartsTotal}
          iconColor="primary"
          title={'Carritos'}
          loading={cartsLoading}
        ></StatCard>

        <StatCard
          link="/my-account/address"
          icon={IoLocationOutline}
          value={addressTotal}
          iconColor="success"
          title={'Direcciones'}
          loading={addressLoading}
        ></StatCard>

        <StatCard
          link="/my-account/conversations"
          icon={IoChatboxEllipsesOutline}
          value={questionsTotal}
          iconColor="purple"
          title={'Conversaciones'}
          loading={questionsLoading}
        ></StatCard>
      </div>

      <div className="my-24">
        <LineChart title={'Dinero gastado en ARS mes de Mayo, TOTAL: ' + values.reduce((total, n) => total + n, 0)} values={values}></LineChart>
      </div>
    </div>
  )
}

export default MyAccountDashboard;