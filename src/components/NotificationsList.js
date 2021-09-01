import clsx from "clsx";
import { forwardRef } from "react";
import NotificationRow from "./NotificationRow";

const NotificationsList = forwardRef(({ notifications, open, onClose, ...rest }, ref) => {
    return (
        <div {...rest} ref={ref} style={{ top: "110%" }} className={clsx(["absolute right-0 z-50 animate__animated animate__fadeInUp"], {
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
                    notifications?.map((notification, i) => {
                        return (
                            <NotificationRow onClick={onClose} notification={notification} />
                        )
                    })
                }

                <h5 className="ml-4 my-2 text-xl">
                    Anteriores
                </h5>
            </div>
        </div >
    )
});

export default NotificationsList;