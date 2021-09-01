import clsx from "clsx";
import { forwardRef } from "react";
import { IoNotificationsSharp } from "react-icons/io5";

const NotificationsList = forwardRef(({ notifications, open, onClose, ...rest }, ref) => {
    return (
        <div {...rest} ref={ref} style={{ top: "110%" }} className={clsx(["absolute right-0 z-50 animate__animated animate__fadeInDown"], {
            "hidden": !open
        })}>
            <div style={{ height: "90vh", width: 350, overflowY: "auto" }} className="relative text-gray-500 p-2 rounded bg-white shadow-xl custom-scrollbar">
                <h3 className="text-2xl font-bold">
                    Notificaciones
                </h3>
                <h5 className="ml-4 my-2 text-xl">
                    Nuevas
                </h5>
                {
                    Array.from(Array(3).keys()).map((notification, i) => {
                        return (
                            <div key={i} className="my-2 flex items-center space-x-2">
                                <div style={{ backgroundColor: "rgba(0, 150, 136, 0.30)" }} className="w-12 h-12 rounded-full flex bg-opacity-10">
                                    <IoNotificationsSharp style={{ color: "rgba(0, 150, 136, 1)" }} className="m-auto text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-bold">Nombre de la notificación</h3>
                                    <p>{new Date().toLocaleString()}</p>

                                </div>
                            </div>
                        )
                    })
                }

                <h5 className="ml-4 my-2 text-xl">
                    Anteriores
                </h5>
                {
                    Array.from(Array(10).keys()).map((notification, i) => {
                        return (
                            <div key={i} className="my-2 flex items-center space-x-2">
                                <div style={{ backgroundColor: "rgba(0, 150, 136, 0.30)" }} className="w-12 h-12 rounded-full flex bg-opacity-10">
                                    <IoNotificationsSharp style={{ color: "rgba(0, 150, 136, 1)" }} className="m-auto text-xl" />
                                </div>
                                <div>
                                    <h3 className="font-bold">Nombre de la notificación</h3>
                                    <p>{new Date().toLocaleString()}</p>

                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
});

export default NotificationsList;