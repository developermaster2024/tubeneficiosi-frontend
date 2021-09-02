import { forwardRef } from "react";
import { IoNotificationsSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const NotificationRow = forwardRef(({ notification, ...rest }, ref) => {

    const { type, message, id, additionalData, createdAt } = notification;

    if (type === "ORDER_STATUS_CHANGE") {
        return (
            <Link {...rest} ref={ref} to={`/my-account/orders/${additionalData?.orderId}`}>
                <div className="my-2 flex items-center space-x-2 rounded hover:text-main p-1 notificationRow">
                    <div style={{ backgroundColor: "rgba(0, 150, 136, 0.30)" }} className="w-10 h-10 rounded-full flex bg-opacity-10">
                        <IoNotificationsSharp style={{ color: "rgba(0, 150, 136, 1)" }} className="m-auto text-lg" />
                    </div>
                    <div>
                        <h3 className="font-bold text-xs">{message}</h3>
                        <p className="text-xs">{createdAt}</p>
                    </div>
                </div>
            </Link>
        )
    }

    if (type === "ORDER_CREATED") {
        return (
            <Link {...rest} ref={ref} to={`/my-account/orders/${additionalData?.orderId}`}>
                <div className="my-2 flex items-center space-x-2 rounded hover:text-main p-1 notificationRow">
                    <div style={{ backgroundColor: "rgba(0, 150, 136, 0.30)" }} className="w-10 h-10 rounded-full flex bg-opacity-10">
                        <IoNotificationsSharp style={{ color: "rgba(0, 150, 136, 1)" }} className="m-auto text-lg" />
                    </div>
                    <div>
                        <h3 className="font-bold text-xs">{message}</h3>
                        <p className="text-xs">{createdAt}</p>
                    </div>
                </div>
            </Link>
        )
    }

    return (null)
})

export default NotificationRow;