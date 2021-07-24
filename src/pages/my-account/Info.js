import ProfileForm from "./Info/ProfileForm";

const MyAccountInfo = () => {
  return (
    <div className="px-20 px-12">
      <h1 className="text-2xl text-gray-600 font-bold my-5">
        Mis Datos
      </h1>

      <ProfileForm />

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