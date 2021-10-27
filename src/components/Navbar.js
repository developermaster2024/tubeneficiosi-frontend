import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import IPData from 'ipdata';
import PageLogo from './PageLogo';
import NavSearchBar from './NavSearchBar';
import NavLinks from './NavLinks';
import { IoClose, IoMenu, IoSearch } from 'react-icons/io5';
import MobileMenu from './MobileMenu';

const ipdata = new IPData('67c7dfbb37526fc8f7beacac55a5030413e74e26dab32be0e25cbc57');

const Navbar = () => {

  const history = useHistory();

  const [locationInfo, setLocationInfo] = useState({});

  const [ipData, setIpData] = useState(ipdata);

  const [showMenu, setShowMenu] = useState(false);

  const [searchData, setSearchData] = useState({ storeCategoryId: "", search: "" })

  useEffect(() => {
    ipData.lookup().then((response) => {
      console.log(response);
      setLocationInfo(response);
    })
  }, [ipData])

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
        <div className="flex justify-between md:justify-none items-center h-full">

          <PageLogo />

          <NavSearchBar onChange={handleChange} onSubmit={handleSubmit} data={searchData} />

          <NavLinks />

          <div className="md:hidden items-center flex space-x-4">
            <button>
              <IoSearch className="text-2xl" />
            </button>

            <button onClick={() => { setShowMenu((oldShowMenu) => !oldShowMenu) }} type="button" aria-controls="mobile-menu" aria-expanded="false">
              {
                showMenu ?
                  <IoClose className="text-2xl" />
                  :
                  <IoMenu className="text-2xl" />
              }
            </button>
          </div>
        </div>
      </div>
    </div>

    <MobileMenu show={showMenu} onClose={() => { setShowMenu((oldShowMenu) => !oldShowMenu) }} />

    <div className="bg-main text-white py-2">
      <div className="container relative space-y-2">
        <div className="relative md:absolute -mt-2 space-x-2 text-xs">
          <Link className="flex items-center" to={locationInfo?.city ? `/map?city=${locationInfo?.city}` : `/map`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div className="flex flex-col">
              <span>Enviar a </span>
              <b>{locationInfo?.region ? locationInfo?.region : 'Buenos Aires'}, {locationInfo?.city ? locationInfo?.city : 'C.A.B.A'}</b>
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-center flex-wrap">
          <nav className="flex items-center space-x-7">
            <a href="/benefits">Ofertas del dia</a>
            <a href="/#">Servicio al cliente</a>
            <Link to="/stores">Comercios</Link>
          </nav>
        </div>
      </div>
    </div>
  </>;
};

export default Navbar;