import { useRef } from "react";
import { IoClose, IoStarOutline } from "react-icons/io5";
import { generateImageUrl } from "../helpers/url";
import Checkbox from "./Checkbox";
import StarIcon from "./StarIcon";
import CustomSelect from "./CustomSelect";
import reactDom from "react-dom";
import { useAuth } from "../contexts/AuthContext";

const ProductToRatingModal = ({ products, onClose }) => {

  const { user } = useAuth();

  const modalRef = useRef();

  const handleCloseModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  }

  const handleChange = (e, id) => {
    console.log(e.target.value);
    console.log(id);
  }

  if (!products || !user) {
    return null;
  }

  return reactDom.createPortal(
    <div ref={modalRef} onClick={handleCloseModal} className="fixed flex z-50 h-screen w-screen bg-black bg-opacity-50 left-0 top-0 animate__animated animate__fade">
      <div className="w-7/12 overflow-hidden bg-white animate__animated animate__fadeInUp m-auto rounded-xl">
        <div style={{ height: "8%" }} className="p-4 bg-main flex justify-end items-center text-white">
          <button className="text-2xl" onClick={() => { onClose() }}>
            <IoClose />
          </button>
        </div>
        <div className="p-8 space-y-4">
          <div className="text-center text-gray-500">
            Por favor agregue el rating a cada producto :)
          </div>
          {
            products?.map((product, i) => {
              return (
                <div key={i} className="flex justify-between text-gray-500">
                  <div className="flex items-center space-x-4">
                    <img className="h-12 w-12 rounded" src={generateImageUrl(product?.productImage)} alt="" />
                    <p className="font-bold">{product?.productName}</p>
                  </div>
                  <div className="flex space-x-4 items-center">
                    <CustomSelect onChange={(e) => { handleChange(e, product?.id) }}>
                      {
                        Array.from(Array(6).keys()).map((n) => {
                          return (
                            <option value={n}>{n}</option>
                          )
                        })
                      }
                    </CustomSelect>
                    <IoStarOutline style={{ fontSize: 70 }} className="text-yellow-500" />
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
    ,
    document.getElementById("portal")
  );
}

export default ProductToRatingModal;