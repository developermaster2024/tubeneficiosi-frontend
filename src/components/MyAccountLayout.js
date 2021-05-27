import { IoHomeSharp } from "react-icons/io5";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";


const MyAccountLayout = ({ children }) => {

  return (
    <div>
      <div className="flex">
        <div className="w-[5vw] bg-white h-[100vh] text-gray-500 text-[2vw]">
          <div>
            <IoHomeSharp className="mx-auto my-6 cursor-pointer hover:text-main transition duration-500"></IoHomeSharp>
          </div>
          <div>
            <IoPersonCircleSharp className="mx-auto my-6 cursor-pointer hover:text-main transition duration-500"></IoPersonCircleSharp>
          </div>
          <div>
            <IoLocationSharp className="mx-auto my-6 cursor-pointer hover:text-main transition duration-500"></IoLocationSharp>
          </div>
          <div>
            <IoDocumentTextOutline className="mx-auto my-6 cursor-pointer hover:text-main transition duration-500"></IoDocumentTextOutline>
          </div>
          <div>
            <IoChatboxEllipsesOutline className="mx-auto my-6 cursor-pointer hover:text-main transition duration-500"></IoChatboxEllipsesOutline>
          </div>
          <div>
            <IoCartOutline className="mx-auto my-6 cursor-pointer hover:text-main transition duration-500"></IoCartOutline>
          </div>
          <div>
            <IoLogOutOutline className="mx-auto my-6 cursor-pointer hover:text-main transition duration-500"></IoLogOutOutline>
          </div>
        </div>
        <div className="w-1/12">
          {children}
        </div>
      </div>
    </div>
  )
};

export default MyAccountLayout;