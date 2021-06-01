import clsx from "clsx";
import { useEffect, useState } from "react";
import { IoHomeSharp } from "react-icons/io5";
import { IoPersonCircleSharp } from "react-icons/io5";
import { IoLocationSharp } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useHistory } from "react-router-dom";
import LogOutModal from './logOutModal.js';


const MyAccountLayout = ({ children }) => {

  const history = useHistory();

  const [currentPath, setCurrentPath] = useState(null);

  const [show, setShow] = useState(false);

  useEffect(() => {
    history.listen((location, action) => {
      setCurrentPath(location.pathname);
      console.log(location.pathname)
    });
  });


  return (
    <div>
      <div className="flex">
        <div className="w-[5vw] bg-white h-[100vh] text-gray-500 text-[2vw]">
          <div>
            <Link to={'/my-account/dashboard'}>
              <IoHomeSharp className={clsx(["mx-auto my-6 cursor-pointer hover:text-main transition duration-500"], {
                'text-main': currentPath === '/my-account/dashboard'
              })} ></IoHomeSharp>
            </Link>
          </div>
          <div>
            <Link to={'/my-account/info'}>
              <IoPersonCircleSharp className={clsx(["mx-auto my-6 cursor-pointer hover:text-main transition duration-500"], {
                'text-main': currentPath === '/my-account/info'
              })}></IoPersonCircleSharp>
            </Link>
          </div>
          <div>
            <Link to={'/my-account/address'}>
              <IoLocationSharp className={clsx(["mx-auto my-6 cursor-pointer hover:text-main transition duration-500"], {
                'text-main': currentPath === '/my-account/address'
              })}></IoLocationSharp>
            </Link>
          </div>
          <div>
            <Link to={'/my-account/orders'}>
              <IoDocumentTextOutline className={clsx(["mx-auto my-6 cursor-pointer hover:text-main transition duration-500"], {
                'text-main': currentPath === '/my-account/orders'
              })}></IoDocumentTextOutline>
            </Link>
          </div>
          <div>
            <Link to={'/my-account/conversations'}>
              <IoChatboxEllipsesOutline className={clsx(["mx-auto my-6 cursor-pointer hover:text-main transition duration-500"], {
                'text-main': currentPath === '/my-account/conversations'
              })}></IoChatboxEllipsesOutline>
            </Link>
          </div>
          <div>
            <Link to={'/my-account/carts'}>
              <IoCartOutline className={clsx(["mx-auto my-6 cursor-pointer hover:text-main transition duration-500"], {
                'text-main': currentPath === '/my-account/carts'
              })}></IoCartOutline>
            </Link>
          </div>
          <div className="text-center">
            <button onClick={() => { setShow(true) }} className="my-6 cursor-pointer hover:text-main transition duration-500">
              <IoLogOutOutline ></IoLogOutOutline>
            </button>
          </div>
        </div>
        <div className="w-full min-w-0">
          {children}
        </div>
      </div>
      <LogOutModal show={show} setShow={setShow}></LogOutModal>
    </div>
  )
};

export default MyAccountLayout;