import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.jpg';
import { useAuth } from '../contexts/AuthContext';
import SelectUserToLogin from './SelectUserToLogin';
import { IoLogOut } from "react-icons/io5"; import useCategories from '../hooks/useCategories';
;


const Navbar = () => {

  const [show, setShow] = useState(false);

  const { user, setAuthInfo } = useAuth();
  const [searchData, setSearchData] = useState({ storeCategoryId: "", search: "" })

  const [{ categories, error: errorCategories, loading: categoriesLoading }, getCategories] = useCategories();

  const handleClick = () => {
    setAuthInfo({ isAuthenticated: false, user: null, token: null });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
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
              src={logo}
              alt="BeneficioSi"
              className="inline-block h-9 rounded-lg"
            />
          </Link>


          <form className="flex items-center px-10 space-x-2 flex-grow" onSubmit={handleSubmit}>
            <select
              name="storeCategoryId"
              value={searchData.storeCategoryId}
              onChange={handleChange}
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
              <Link to="/products">Comprar</Link>
              <a href="/#">Ayuda</a>
            </nav>
            {
              user ?
                <div className="flex">
                  <Link className="flex items-center uppercase" to={"/my-account"}>
                    {user.name}
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </Link>
                  <button onClick={handleClick} className="ml-4 flex hover:text-main transition duration-500 focus:outline-none">
                    Cerrar Sesión
                    <IoLogOut className="text-xl ml-2" />
                  </button>
                </div>

                :
                <button onClick={() => { setShow(true) }} className="inline-flex items-center justify-center px-3 py-2 space-x-2 leading-4 border border-white rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
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