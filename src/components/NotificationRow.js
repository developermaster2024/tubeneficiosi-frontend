import { IoNotificationsSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const NotificationRow = ({ notification, ...rest }) => {

    const { type, message, id, additionalData, createdAt } = notification;

    if (type === "ORDER_STATUS_CHANGE") {
        return (
            <Link {...rest} to={`/my-account/orders/${additionalData?.orderId}`}>
                <div className="my-2 flex items-center space-x-2 rounded hover:text-main p-1 notificationRow">
                    <div style={{ backgroundColor: "rgba(0, 150, 136, 0.30)" }} className="w-12 h-12 rounded-full flex bg-opacity-10">
                        <IoNotificationsSharp style={{ color: "rgba(0, 150, 136, 1)" }} className="m-auto text-lg" />
                    </div>
                    <div>
                        <h3 className="font-bold">{message}</h3>
                        <p>{createdAt}</p>
                    </div>
                </div>
            </Link>
        )
    }
}

export default NotificationRow;