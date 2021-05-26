//Imagenes
import BeneficioSiLogo from '../assets/images/logo.jpg';
import DeliveryMotion from '../assets/images/delivery-motion.gif';

import { Link } from 'react-router-dom';

const Register = () => {

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
              Registro de clientes
            </h2>
          </div>

          <form className="text-2xl mt-5 px-14" action="">
            <div className="my-12 flex justify-between">
              <div>
                <h2 className="text-gray-600 font-bold">
                  Nombre y Apellido
              </h2>
                <input className="rounded w-full mt-1" type="text" placeholder="Nombre y apellido" />
              </div>
              <div>
                <h2 className="text-gray-600 font-bold">
                  Correo Electronico
              </h2>
                <input className="rounded w-full mt-1" type="text" placeholder="Correo Electronico" />
              </div>
            </div>

            <div className="my-12 flex justify-between">
              <div>
                <h2 className="text-gray-600 font-bold">
                  Contraseña
              </h2>
                <input className="rounded w-full mt-1" type="text" placeholder="Contraseña" />
              </div>
              <div>
                <h2 className="text-gray-600 font-bold">
                  Confirmar Contraseña
              </h2>
                <input className="rounded w-full mt-1" type="text" placeholder="Confirmar Contraseña" />
              </div>
            </div>

            <div className="my-12 flex justify-between">
              <div>
                <h2 className="text-gray-600 font-bold">
                  Telefono
              </h2>
                <input className="rounded w-full mt-1" type="text" placeholder="Telefono" />
              </div>
            </div>

            <div className="text-center">
              <button className="bg-main px-4 py-2 rounded text-white">
                Registrate
              </button>
            </div>
            <p className="text-center mt-4 text-lg">
              ¿Ya tienes cuenta? <Link to="/login" className="text-main hover:text-gray-800 transition duration-500"> Inicia Sesión </Link>
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


export default Register;