import { useEffect, useState } from "react";
import LogOutModal from './logOutModal.js';
import MyAccountSideBarMenu from "./MyAccountSideBarMenu.js";


const MyAccountLayout = ({ children }) => {

  const [currentPath, setCurrentPath] = useState("");

  const [show, setShow] = useState(false);

  useEffect(() => {
    setCurrentPath(window?.location?.pathname);
  }, [window?.location?.pathname, setCurrentPath]);


  return (
    <div>
      <div className="flex">
        <MyAccountSideBarMenu currentPath={currentPath} onLogOut={() => setShow((oldShow) => !oldShow)} />
        <div className="w-full min-w-0">
          {children}
        </div>
      </div>
      <LogOutModal show={show} setShow={setShow}></LogOutModal>
    </div>
  )
};

export default MyAccountLayout;