import { useState } from "react";
import { IoClose, IoBasket } from "react-icons/io5";
import { useHistory } from "react-router";
import { generateImageUrl } from "../helpers/url";
import ProductFeatureCheckbox from "./ProductFeatureCheckbox";
import ProductFeatureGroup from "./ProductFeatureGroup";

const ProductModal = ({ product, closeModal }) => {
  const history = useHistory();

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return null;
  }

  return <div className="fixed flex z-10 h-screen w-screen bg-black bg-opacity-50 left-0 top-0 animate__animated animate__fade">
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
        <img className="w-4/12 m-auto" src={generateImageUrl(product.productImages?.[0]?.path)} alt="" />
        <div className="text-white text-2xl absolute bg-black w-full left-0 bottom-0 bg-opacity-50 p-2">
          {product.name}
          <p> $ {product.finalPrice}</p>
        </div>
      </div>

      <div className="px-6 my-4 overflow-y-auto h-[45%] features-container">
        {

        }
        <ProductFeatureGroup name="Características">
          {product?.productFeatures?.map((feature) => <ProductFeatureCheckbox
            key={feature.id}
            id={feature.id}
            name={feature.name}
            value={feature.value}
            price={feature.price}
            isSelectable={feature.isSelectable}
          />)}
        </ProductFeatureGroup>
        {product?.productFeatureGroups?.map((featuresGroup) => <ProductFeatureGroup
          key={featuresGroup.id}
          name={featuresGroup.name}
        >
          {featuresGroup.productFeatureForGroups.map((feature) => <ProductFeatureCheckbox
            key={feature.id}
            id={feature.id}
            name={feature.name}
            value={feature.value}
            price={feature.price}
            isSelectable={feature.isSelectable}
          />)}
        </ProductFeatureGroup>)}
      </div>
      <div className="flex justify-end items-center">
        <input
          className="inline-block min-w-[100px] rounded focus:ring-main focus:border-main transiion duration-500"
          type="number"
          placeholder="Cantidad..."
          max={product.quantity}
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <p className="mx-4 text-xl">Total: <b className="text-gray-600">$ {quantity * product.finalPrice}</b></p>
        <button type="button" onClick={() => { closeModal() }} className="bg-main rounded text-white p-2 mx-2">
          Cancelar
        </button>
        <button type="button" onClick={() => { history.push('/checkout') }} className="bg-main rounded text-white p-2 mx-2">
          Comprar
        </button>
      </div>
    </div>
  </div>;
}

export default ProductModal;