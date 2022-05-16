import clsx from "clsx";
import { Link } from "react-router-dom";

const SideBarLink = ({ Icon, to, title, currentPath }) => {
    return (
        <Link title={title} to={to}>
            <Icon className={clsx(["mx-auto my-6 cursor-pointer transform hover:text-main hover:scale-150 transition duration-500 text-3xl md:text-2xl"], {
                'text-main': currentPath === to
            })} ></Icon>
        </Link>
    )
}

export default SideBarLink;