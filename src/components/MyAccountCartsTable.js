import clsx from "clsx";
import { useState } from "react";
import { IoChevronDownOutline, IoEye, IoCloseSharp, IoStorefrontSharp, IoChevronUp, IoTimeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import Button from "./Button";
import CustomInput from "./CustomInput";

const MyAccountCartsTable = (props) => {

  const { carts, className, values, onClearFilters, onFiltersChange } = props;

  const [showDetails, setShowDetails] = useState(null);

  const showDetailsCart = (i) => {
    if (showDetails === i) {
      setShowDetails(null);
      return;
    }

    setShowDetails(i);
  }

  const deleteCart = (i) => {

  }

  return (
    <div>
      <div className={className}>
        <div className="flex w-full text-center items-center font-bold">
          <div className="w-3/12 p-2">
            <p>ID</p>
            <CustomInput
              placeholder="Id..."
              name="id"
              onChange={onFiltersChange}
              value={values.id}
            />
          </div>
          <div className="w-3/12 p-2">
            <p>Tienda</p>
            <CustomInput
              placeholder="Nombre de la tienda.."
              name="storeName"
              onChange={onFiltersChange}
              value={values.storeName}
            />
          </div>
          <div className="w-3/12 p-2">
            Fecha de Creacion
            <CustomInput
              placeholder="desde..."
              name="from"
              onChange={onFiltersChange}
              value={values.from}
              className="my-2"
            />
            <CustomInput
              placeholder="hasta..."
              name="until"
              onChange={onFiltersChange}
              value={values.until}
              className="my-2"
            />
          </div>
          <div className="w-3/12 p-2">
            <p>Total</p>
            <CustomInput
              placeholder="min"
              name="minPrice"
              onChange={onFiltersChange}
              value={values.minPrice}
              className="my-2"
            />
            <CustomInput
              placeholder="max"
              name="maxPrice"
              onChange={onFiltersChange}
              value={values.maxPrice}
              className="my-2"
            />
          </div>
          <div className="w-3/12 p-2">
            <Button onClick={onClearFilters} className="bg-main transition duration-500 hover:bg-white hover:text-main">
              Limpiar Filtros
            </Button>
          </div>
        </div>
        <div className="w-full text-center">
          {
            carts?.length > 0 ?
              carts?.map((cart, i) =>
                <div key={i} className="bg-white my-4 p-6 rounded-lg transition duration-300 transform hover:shadow-xl hover:-translate-y-2">
                  <div className="flex items-center">
                    <div className="w-3/12">
                      {cart?.id}
                    </div>
                    <div className="w-3/12">
                      <Link to={`/stores/${cart?.store?.slug}`} className="text-blue-500">
                        {
                          cart?.store?.storeProfile?.logo &&
                          <img className="w-[50px] m-auto" src={`${process.env.REACT_APP_API_URL}/${cart?.store?.storeProfile?.logo}`} alt="" />
                        }
                        <p>{cart?.store?.name}</p>
                      </Link>
                    </div>
                    <div className="w-3/12">
                      {cart?.createdAt?.toLocaleString()}
                    </div>
                    <div className="w-3/12 font-bold text-gray-500">
                      ${cart?.subTotal}
                    </div>
                    <div className="w-3/12 flex justify-center items-center text-gray-400">
                      <Link to={`/stores/${cart?.store?.slug}`}>
                        <IoStorefrontSharp className="mx-2 text-2xl cursor-pointer hover:text-main transition duration-300"></IoStorefrontSharp>
                      </Link>
                      {
                        showDetails === i ?
                          <IoChevronUp onClick={() => { showDetailsCart(i) }} className="mx-2 text-2xl cursor-pointer hover:text-main transition duration-300"></IoChevronUp>
                          :
                          <IoChevronDownOutline onClick={() => { showDetailsCart(i) }} className="mx-2 text-2xl cursor-pointer hover:text-main transition duration-300"></IoChevronDownOutline>
                      }
                    </div>
                  </div>
                  <div className={clsx(["w-full animate__animated animate__zoomIn bg-white border-gray-300 border-t mt-4", {
                    'hidden': showDetails != i
                  }])}>
                    {
                      cart?.cartItems?.map((product, i2) =>
                        <div key={i2} className="flex items-center my-4 text-gray-400 text-md">
                          <div className="w-2/12">
                            <IoCloseSharp onClick={() => { deleteCart(i) }} className="cursor-pointer hover:text-main m-auto text-4xl text-main"></IoCloseSharp>
                          </div>
                          <div className="w-3/12">
                            <p>{product.productName}</p>
                          </div>
                          <div className="w-3/12">
                            <img className="h-20 w-20 m-auto rounded" src={`${process.env.REACT_APP_API_URL}/${product.productImage}`} alt="" />
                          </div>
                          <div className="w-2/12 text-lg">
                            {product.quantity}
                          </div>
                          <div className="w-2/12 text-lg">
                            ${product.productPrice}
                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>

              )
              :
              <div className="text-center text-red-500 text-2xl my-8">
                No se Encontraron carritos.
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default MyAccountCartsTable;