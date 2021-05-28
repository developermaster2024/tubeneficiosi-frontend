//Imagenes
import BeneficioSiLogo from '../assets/images/logo.jpg';
import DeliveryMotion from '../assets/images/delivery-motion.gif';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {

  const history = useHistory();

  return (
    <div className="py-24">
      <div className="flex justify-between">
        <div className="w-1/2 bg-gray-50 text-center">
          <img className="m-auto w-1/3 text-gray-700" src={BeneficioSiLogo} alt="" />
          <h1 className="my-8 font-bold text-[70px]">
            Beneficio si
          </h1>
          <p className="text-lg text-gray-500">La mejor plataforma para hacer crecer tus ventas.</p>
          <img src={DeliveryMotion} alt="" />
        </div>
        <div className="w-1/2 bg-white p-6 relative">
          <div className="flex justify-right items-center">
            <img className="ml-auto w-1/12 text-gray-700" src={BeneficioSiLogo} alt="" />
            <h1 className="ml-2 font-bold text-[40px]">
              Beneficio si
            </h1>
          </div>
          <div className="border-b border-main mt-24">
            <h2 className="text-center text-2xl">
              Login de clientes
            </h2>
          </div>

          <form className="text-2xl mt-5" action="">
            <div className="my-12">
              <h2 className="text-gray-600 font-bold">
                E-Mail Address
              </h2>
              <input className="rounded w-full mt-1" type="text" placeholder="Correo Electronico" />
            </div>

            <div className="my-12">
              <h2 className="text-gray-600 font-bold">
                Password
              </h2>
              <input className="rounded w-full mt-1" type="text" placeholder="Password" />
            </div>

            <div className="text-center">
              <button onClick={() => { history.push('/my-account/dashboard') }} className="bg-main px-4 py-2 rounded text-white">
                Iniciar sesion
              </button>
            </div>

            <Link>
              <p className="text-center mt-4 text-lg text-main hover:text-gray-800 transition duration-500">
                ¿He olvidado mi contraseña?
              </p>
            </Link>


            <p className="text-center mt-4 text-lg">
              ¿No tienes una cuenta? <Link to="/register" className="text-main hover:text-gray-800 transition duration-500"> Registrate </Link>
            </p>
          </form>
          <div className="text-sm mt-auto absolute bottom-2 right-2">
            © 2019 <span className="text-main">Beneficio Si.</span> Todos los derechos reservados. Diseñado por Jeyver Vegas
            </div>
        </div>
      </div>
    </div>
  )

}


export default Login;