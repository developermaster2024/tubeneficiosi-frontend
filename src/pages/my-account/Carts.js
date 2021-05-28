import { IoCart } from "react-icons/io5";

const MyAccountCarts = () => {
  return (
    <div className="px-8">
      <h1 className="text-2xl flex items-center text-gray-600 font-bold my-5">
        <IoCart className="text-4xl"></IoCart>
        <span className="ml-4">Mis Carritos</span>
      </h1>
    </div>
  )
}

export default MyAccountCarts;