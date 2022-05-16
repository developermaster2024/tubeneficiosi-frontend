import {
    IoDocumentTextOutline,
    IoLogOutOutline,
    IoCartOutline,
    IoLocationSharp,
    IoHeart,
    IoHomeSharp,
    IoChatboxEllipsesOutline,
    IoCard,
    IoPersonCircleSharp
} from "react-icons/io5";
import SideBarLink from "./SideBarLink";

const MyAccountSideBarMenu = ({ currentPath, onLogOut }) => {
    return (
        <div className="w-2/12 md:w-[5vw] bg-white h-screen text-gray-500 text-[2vw]" style={{ height: '100%' }}>
            <div>
                <SideBarLink Icon={IoHomeSharp} currentPath={currentPath} to={'/my-account/dashboard'} title="home" />
            </div>
            <div>
                <SideBarLink Icon={IoPersonCircleSharp} currentPath={currentPath} title="Mi perfil" to={'/my-account/info'} />
            </div>
            <div>
                <SideBarLink Icon={IoLocationSharp} currentPath={currentPath} title="Direcciones" to={'/my-account/address'} />
            </div>
            <div>
                <SideBarLink Icon={IoDocumentTextOutline} currentPath={currentPath} title="Ordenes" to={'/my-account/orders'} />
            </div>
            <div>
                <SideBarLink Icon={IoCard} currentPath={currentPath} title="Mis tarjetas" to={'/my-account/cards'} />
            </div>
            <div>
                <SideBarLink Icon={IoHeart} currentPath={currentPath} title="Mis favoritos" to={'/my-account/favorites'} />
            </div>
            <div>
                <SideBarLink Icon={IoChatboxEllipsesOutline} currentPath={currentPath} title="Conversaciones" to={'/my-account/conversations'} />
            </div>
            <div>
                <SideBarLink Icon={IoCartOutline} currentPath={currentPath} title="Carritos" to={'/my-account/carts'} />
            </div>
            <div className="text-center">
                <button title="Cerrar sesión" onClick={onLogOut} className="my-6 cursor-pointer hover:text-main transition duration-500 text-3xl md:text-2xl">
                    <IoLogOutOutline></IoLogOutOutline>
                </button>
            </div>
        </div>
    )
}

export default MyAccountSideBarMenu;