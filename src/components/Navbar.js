import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SelectUserToLogin from './SelectUserToLogin';
import { IoLogOut, IoPersonCircleSharp } from "react-icons/io5";
import useCategories from '../hooks/useCategories';
import SystemInfo from "../util/SystemInfo";
import NotificationsComponent from './notifications/NotificationsComponent';


const Navbar = () => {

  const history = useHistory();

  const { user, setAuthInfo } = useAuth();

  const [show, setShow] = useState(false);

  const [searchData, setSearchData] = useState({ storeCategoryId: "", search: "" })

  const [{ categories, error: errorCategories, loading: categoriesLoading }] = useCategories();

  const handleClick = () => {
    setAuthInfo({ isAuthenticated: false, user: null, token: null });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?storeCategoryId=${searchData.storeCategoryId}&search=${searchData.search}`);
  }

  const handleChange = (e) => {
    setSearchData((oldSearchData) => {
      return {
        ...oldSearchData,
        [e.target.name]: e.target.value
      }
    })
  }

  return <>
    <div className="h-14 bg-gray-800 text-white">
      <div className="container h-full">
        <div className="flex items-center h-full">
          <Link to="/">
            <img
              src={SystemInfo.logo}
              alt={SystemInfo.name}
              className="inline-block h-9 rounded-lg"
            />
          </Link>


          <form className="flex items-center px-10 space-x-4 flex-grow" onSubmit={handleSubmit}>
            <select
              name="storeCategoryId"
              value={searchData.storeCategoryId}
              onChange={handleChange}
              disabled={errorCategories || categoriesLoading ? true : false}
              className="w-40 capitalize rounded border-gray-300 focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50 bg-transparent text-sm leading-4"
            >
              <option value="">Seleccione una categoria</option>
              {categories.map((category, i) => {
                return (
                  <option className="text-black capitalize" value={category.id} key={i}>{category.name}</option>
                )
              })}
            </select>
            <input
              name="search"
              value={searchData.search}
              onChange={handleChange}
              placeholder="Nombre de tienda, producto..."
              className="w-full rounded border-gray-300 focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50 bg-transparent text-sm leading-4"
              type="text"
            />
          </form>


          <div className="flex items-center">
            <nav className="space-x-5 mr-5">
              <Link className="hover:text-main" to="/products">Comprar</Link>
              <a className="hover:text-main" href="/#">Ayuda</a>
            </nav>
            {
              user ?
                <div className="flex space-x-6 items-center">
                  <div className="flex items-center space-x-4 relative">
                    <Link className="flex items-center uppercase space-x-1 hover:text-main" to={"/my-account"}>
                      <p>{user.name}</p>
                      <IoPersonCircleSharp className="text-xl" />
                    </Link>

                    <NotificationsComponent />
                  </div>

                  <button onClick={handleClick} className="flex hover:text-main transition duration-500 focus:outline-none">
                    Cerrar Sesión
                    <IoLogOut className="text-xl ml-2" />
                  </button>

                </div>

                :
                <button onClick={() => { setShow(true) }} className="inline-flex items-center justify-center px-3 py-2 space-x-2 leading-4 border border-white rounded">
                  <IoPersonCircleSharp className="text-xl" />
                  <span>Ingresar</span>
                </button>
            }

          </div>
        </div>
      </div>
    </div>

    <div className="bg-main text-white py-2">
      <div className="container relative">
        <div className="flex items-center absolute -mt-2 space-x-2 text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <div className="flex flex-col">
            <span>Enviar a </span>
            <b>C.A.B.A</b>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <nav className="flex items-center space-x-7">
            <a href="/benefits">Ofertas del dia</a>
            <a href="/#">Servicio al cliente</a>
            <Link to="/stores">Comercios</Link>
          </nav>
        </div>
      </div>
    </div>
    <SelectUserToLogin show={show} setShow={setShow}></SelectUserToLogin>
  </>;
};

export default Navbar;