import StatCard from '../../components/statCard.js';
import { IoDocumentTextSharp } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

import LineChart from '../../components/LineChart.js';

var values = [10, 41, 35, 51, 49, 62, 69, 91, 148, 54, 71, 63, 42, 85, 16, 12, 45, 75, 63, 52, 78, 95, 52, 24, 35, 45, 54, 74, 63, 12, 0];

const MyAccountDashboard = () => {

  return (
    <div className="px-20 px-12">
      <h1 className="text-2xl text-gray-600 font-bold my-5">
        Resumen
      </h1>

      <div className="flex justify-between">
        <StatCard
          icon={IoDocumentTextSharp}
          value={47}
          iconColor="info"
          title={'Mis Pedidos'}
        ></StatCard>

        <StatCard
          icon={IoCartOutline}
          value={4}
          iconColor="primary"
          title={'Carritos'}
        ></StatCard>

        <StatCard
          icon={IoLocationOutline}
          value={2}
          iconColor="success"
          title={'Direcciones'}
        ></StatCard>

        <StatCard
          icon={IoChatboxEllipsesOutline}
          value={10}
          iconColor="purple"
          title={'Conversaciones'}
        ></StatCard>
      </div>

      <div className="my-24">
        <LineChart title={'Dinero gastado en ARS mes de Mayo, TOTAL: ' + values.reduce((total, n) => total + n, 0)} values={values}></LineChart>
      </div>
    </div>
  )
}

export default MyAccountDashboard;