
import { IoLocationSharp } from "react-icons/io5";
import MapContainer from "../../components/MapContainer";

const CreateAddress = () => {

  return (
    <div className="p-8">
      <h1 className="text-2xl flex items-center text-gray-600 font-bold my-5">
        <IoLocationSharp className="text-4xl" />
        <span className="ml-4">Añadir dirección</span>
      </h1>

      <div className="bg-white rounded px-8 py-2">
        <form className="mt-5" action="">
          <div className="my-12">
            <h2 className="text-gray-600 font-bold text-xl mb-2">
              Nombre
            </h2>
            <input className="rounded mt-1 w-1/3" type="text" placeholder="Correo Electronico" />
          </div>

          <div className="my-12">
            <h2 className="text-gray-600 font-bold text-xl mb-2">
              Buscar
            </h2>
            <input className="rounded w-full mt-1" type="text" placeholder="search" />
          </div>

          <MapContainer />

          <div className="text-right mt-4">
            <button className="bg-main px-4 py-2 rounded text-white">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateAddress;