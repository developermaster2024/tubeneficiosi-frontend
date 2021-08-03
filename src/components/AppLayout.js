import FacebookIcon from "./FacebookIcon";
import InstagramIcon from "./InstagramIcon";
import Navbar from "./Navbar";
import WhatsappIcon from "./WhatsappIcon";
import LogoBeneficio from '../assets/images/logo.jpg'
import { Link } from "react-router-dom";

const AppLayout = ({ children }) => {
  return <div className="min-h-screen bg-gray-50 text-sm text-gray-900 open-sans">
    <Navbar />

    {children}

    {/* FOOTER */}
    <footer className="bg-gray-800 text-white mt-auto pt-12 pr-12 pl-12 pb-2">
      <div className="container h-full">
        <div className="flex items-center mb-2">
          <img src={LogoBeneficio} className="w-12" />
          <p className="font-bold text-white text-md ml-3">BeneficioSi</p>
        </div>
        <div className="flex justify-between items-top h-full">
          <div>
            <div>
              <h1 className="text-white font-bold my-5">
                Get in touch
              </h1>
              <Link to={`#`}>
                <p className="my-4 hover:text-main transition duration-500">About us</p>
              </Link>
              <Link to={`#`}>
                <p className="my-4 hover:text-main transition duration-500">Careers</p>
              </Link>
              <Link to={`#`}>
                <p className="my-4 hover:text-main transition duration-500">Press Releases</p>
              </Link>
              <Link to={`#`}>
                <p className="my-4 hover:text-main transition duration-500">Blog</p>
              </Link>
            </div>
          </div>

          <div>
            <div>
              <h1 className="text-white font-bold my-5">
                Connections
              </h1>
              <Link to={`#`}>
                <p className="my-4 hover:text-main transition duration-500">Facebook</p>
              </Link>
              <Link to={`#`}>
                <p className="my-4 hover:text-main transition duration-500">Twitter</p>
              </Link>
              <Link to={`#`}>
                <p className="my-4 hover:text-main transition duration-500">Instagram</p>
              </Link>
              <Link to={`#`}>
                <p className="my-4 hover:text-main transition duration-500">Youtube</p>
              </Link>
              <Link to={`#`}>
                <p className="my-4 hover:text-main transition duration-500">Linkedin</p>
              </Link>
            </div>
          </div>

          <div>
            <div>
              <h1 className="text-white font-bold my-5">
                Earnings
              </h1>
              <Link to={`#`}>
                <p className="my-4 hover:text-main transition duration-500">Become an Affiliate</p>
              </Link>
              <Link to={`#`}>
                <p className="my-4 hover:text-main transition duration-500">Adversite your product</p>
              </Link>
              <Link to={`#`}>
                <p className="my-4 hover:text-main transition duration-500">Sell on Market</p>
              </Link>
            </div>
          </div>

          <div>
            <div>
              <h1 className="text-white font-bold my-5">
                Account
              </h1>
              <Link to={`#`}>
                <p className="my-4 hover:text-main transition duration-500">Your Account</p>
              </Link>
              <Link to={`#`}>
                <p className="my-4 hover:text-main transition duration-500">Returns Centre</p>
              </Link>
              <Link to={`#`}>
                <p className="my-4 hover:text-main transition duration-500">100% pucharse protection</p>
              </Link>
              <Link to={`#`}>
                <p className="my-4 hover:text-main transition duration-500">Chat with us</p>
              </Link>
              <Link to={`#`}>
                <p className="my-4 hover:text-main transition duration-500">Help</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>© 2019 <span className="text-main">Beneficio Si.</span> Todos los derechos reservados. Diseñado por J.V & A.N</p>
        </div>
      </div>
    </footer>
  </div>;
};

export default AppLayout;