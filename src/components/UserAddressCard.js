import { IoLocationOutline } from "react-icons/io5";
import { IoCloseCircleSharp } from "react-icons/io5";
import { IoPencilSharp } from "react-icons/io5";
import { IoMapOutline } from "react-icons/io5";


const UserAddressCard = (props) => {

  const { name, address, latLng, className, onClick } = props;

  return (
    <div className={className} onClick={onClick}>
      <IoCloseCircleSharp className="absolute -top-2 -right-2 text-2xl hover:text-main cursor-pointer transition duration-500"></IoCloseCircleSharp>
      <h3 className="font-bold text-2xl my-4">
        <IoLocationOutline></IoLocationOutline> {name}
      </h3>
      <p className="text-md">
        {address}
      </p>
      <div className="my-4 flex items-center justify-between">
        <button className="text-main hover:text-gray-500 transition duration-300 font-bold flex">
          <IoPencilSharp></IoPencilSharp>
          Editar
        </button>
        <button className="text-main hover:text-gray-500 transition duration-300 font-bold flex">
          <IoMapOutline></IoMapOutline>
          Ver en mapa
        </button>
      </div>
    </div>
  )
}

export default UserAddressCard;