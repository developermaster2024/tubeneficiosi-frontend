import { IoHomeSharp } from "react-icons/io5";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { Link } from "react-router-dom";


const MyAccountLayout = ({ children }) => {

  return (
    <div>
      <div className="flex">
        <div className="w-[5vw] bg-white h-[100vh] text-gray-500 text-[2vw]">
          <div>
            <Link to={'/my-account/dashboard'}>
              <IoHomeSharp className="mx-auto my-6 cursor-pointer hover:text-main transition duration-500"></IoHomeSharp>
            </Link>
          </div>
          <div>
            <Link to={'/my-account/info'}>
              <IoPersonCircleSharp className="mx-auto my-6 cursor-pointer hover:text-main transition duration-500"></IoPersonCircleSharp>
            </Link>
          </div>
          <div>
            <Link to={'/my-account/address'}>
              <IoLocationSharp className="mx-auto my-6 cursor-pointer hover:text-main transition duration-500"></IoLocationSharp>
            </Link>
          </div>
          <div>
            <Link to={'/my-account/orders'}>
              <IoDocumentTextOutline className="mx-auto my-6 cursor-pointer hover:text-main transition duration-500"></IoDocumentTextOutline>
            </Link>
          </div>
          <div>
            <Link to={'/my-account/conversations'}>
              <IoChatboxEllipsesOutline className="mx-auto my-6 cursor-pointer hover:text-main transition duration-500"></IoChatboxEllipsesOutline>
            </Link>
          </div>
          <div>
            <Link to={'/my-account/carts'}>
              <IoCartOutline className="mx-auto my-6 cursor-pointer hover:text-main transition duration-500"></IoCartOutline>
            </Link>
          </div>
          <div>
            <Link>
              <IoLogOutOutline className="mx-auto my-6 cursor-pointer hover:text-main transition duration-500"></IoLogOutOutline>
            </Link>
          </div>
        </div>
        <div className="w-full min-w-0">
          {children}
        </div>
      </div>
    </div>
  )
};

export default MyAccountLayout;