import UserAddressCard from '../../components/UserAddressCard';
import { userAddress } from '../../util/user-address';
import { IoAdd } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

const MyAccountAddress = () => {
  return (
    <div className="px-20 px-12">
      <h1 className="text-2xl flex items-center text-gray-600 font-bold my-5">
        <IoLocationSharp className="text-4xl"></IoLocationSharp>
        <span className="ml-4">Mis Direcciones</span>
      </h1>
      <div className="my-6 text-right">
        <Link to={'/my-account/address/new'} className="items-center font-bold inline-flex bg-main px-12 py-2 rounded text-white">
          <IoAdd className="font-bold text-xl"></IoAdd>
          Añadir Nueva
        </Link>
      </div>
      <div className="flex flex-wrap">
        {
          userAddress.map((address, i) =>
            <UserAddressCard className="m-4 min-h-64 hover:shadow-xl relative w-64 bg-white rounded text-gray-500 p-8" name={address.name} address={address.address} latLng={address.latLng}></UserAddressCard>
          )
        }
      </div>
    </div>
  )
}

export default MyAccountAddress;