import { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import reactDom from "react-dom";


const FiltersModal = ({ show, onClose, children }) => {

    const modalRef = useRef();

    useEffect(() => {
        console.log(children);
    }, [children])

    const handleClose = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    }

    if (!show) {
        return null;
    }

    return reactDom.createPortal(
        <div ref={modalRef} onClick={handleClose} className="fixed flex z-50 h-screen w-screen bg-black bg-opacity-50 left-0 top-0 animate__animated animate__fade">
            <div className="w-10/12 overflow-hidden bg-white animate__animated animate__fadeInUp m-auto rounded-xl">
                <div style={{ height: "8%" }} className="p-4 bg-main flex justify-end items-center text-white">
                    <button className="text-2xl" onClick={() => { onClose() }}>
                        <IoClose />
                    </button>
                </div>
                <div className="p-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    {children}
                </div>
            </div>
        </div>
        ,
        document.getElementById("portal")
    );
}

export default FiltersModal;