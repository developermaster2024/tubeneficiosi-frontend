import { IoClose, IoBasket } from "react-icons/io5";
import { useHistory } from "react-router";


const ProductModal = (props) => {

  const { product, closeModal } = props;

  const history = useHistory();


  return (
    product ?
      <div hidden={!product} className="fixed flex z-10 h-screen w-screen bg-black bg-opacity-50 left-0 top-0 animate__animated animate__fade">
        <div className="w-7/12 h-5/6 overflow-hidden bg-white animate__animated animate__fadeInUp m-auto rounded-xl">
          <div className="bg-main p-4 flex justify-between items-center text-white">
            <h1 className="text-xl flex items-center">
              <IoBasket className="mr-2 text-2xl" />
              Comprar
            </h1>
            <button className="text-2xl" onClick={() => { closeModal() }}>
              <IoClose />
            </button>
          </div>

          <div className="relative">
            <img className="w-4/12 m-auto" src={product.mainImgSrc} alt="" />
            <div className="text-white text-2xl absolute bg-black w-full left-0 bottom-0 bg-opacity-50 p-2">
              {product.name}
              <p> $ {product.price}</p>
            </div>
          </div>
          <div className="px-6 my-4 overflow-y-auto h-[45%] features-container">
            {product.features.map((featuresGroup, i) => {
              return (
                <div key={i} className="text-center mb-4 bg-white p-8 rounded shadow-lg">
                  <h1 className="text-xl text-gray-700 font-bold mb-4">{featuresGroup.name}</h1>
                  <div className="flex justify-around w-full">
                    {featuresGroup.features.map((feature, ifeat) => {
                      return (
                        <div className="flex">
                          {
                            feature.selectAble ?
                              <input className="text-main ring-main border-main focus:ring-main" type="checkbox" name="" id="" />
                              :
                              null
                          }
                          <p className="ml-4">{feature.name}</p>
                          <p className="ml-4">$ {feature.price}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex justify-end">

          </div>
          <div className="flex justify-end items-center">
            <input className="rounded focus:ring-main focus:border-main transiion duration-500" type="number" placeholder="Cantidad..." />
            <p className="mx-4 text-xl">Total: <b className="text-gray-600">$ 4.356</b></p>
            <button onClick={() => { closeModal() }} className="bg-main rounded text-white p-2 mx-2">
              cancelar
            </button>
            <button onClick={() => { history.push('/checkout') }} className="bg-main rounded text-white p-2 mx-2">
              comprar
            </button>
          </div>
        </div>
      </div>
      :
      null
  )
}

export default ProductModal;