import { IoPersonCircle } from "react-icons/io5";


const MyAccountInfo = () => {

  return (
    <div className="px-20 px-12">
      <h1 className="text-2xl text-gray-600 font-bold my-5">
        Mis Datos
      </h1>

      <div className="bg-white rounded p-5 mb-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center w-1/2">
            <IoPersonCircle className="text-[100px] text-gray-500"></IoPersonCircle>
            <button className="bg-main text-white h-[fit-content] px-4 py-2 rounded hover:bg-gray-200 hover:text-main transition duration-500 font-bold">
              <span>Añadir Imagen</span>
            </button>
          </div>
          <div className="w-1/2">
            <h2 className="text-gray-600 font-bold text-xl">
              Nombre:
              </h2>
            <input className="rounded w-full mt-1 focus:border-main focus:ring-main" type="text" placeholder="Nombre" />
          </div>
        </div>
        <div className="flex justify-between my-12">
          <div className="w-1/2">
            <h2 className="text-gray-600 font-bold text-xl">
              Telefono:
              </h2>
            <input className="rounded w-full mt-1 focus:border-main focus:ring-main" type="text" placeholder="Telefono" />
          </div>
        </div>

        <div className="text-right">
          <button className="bg-main text-white h-[fit-content] px-4 py-2 rounded hover:bg-gray-200 hover:text-main transition duration-500 font-bold">
            <span>Guardar</span>
          </button>
        </div>
      </div>

      <h1 className="text-2xl text-gray-600 font-bold my-5">
        Cambiar Contraseña
      </h1>

      <div className="bg-white rounded p-5">
        <div className="flex">
          <div className="w-3/12">
            <h2 className="text-gray-600 font-bold text-xl">
              Constraseña:
              </h2>
            <input className="rounded w-full mt-1 focus:border-main focus:ring-main" type="text" placeholder="Contraseña" />
          </div>
          <div className="ml-12 w-3/12">
            <h2 className="text-gray-600 font-bold text-xl">
              Confirmar Contraseña:
              </h2>
            <input className="rounded w-full mt-1 focus:border-main focus:ring-main" type="text" placeholder="Nueva Contraseña" />
          </div>

        </div>

        <div className="text-right my-5">
          <button className="bg-main text-white h-[fit-content] px-4 py-2 rounded hover:bg-gray-200 hover:text-main transition duration-500 font-bold">
            <span>Guardar</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MyAccountInfo;