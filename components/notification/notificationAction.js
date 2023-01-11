import { notification } from "antd";
import { useContext } from "react";
import AppContext from "store/app-context";

export { NotificationAction };

function NotificationAction() {
  const notificationCtx = useContext(AppContext);
  const [api, contextHolder] = notification.useNotification();
  const activeNotification = notificationCtx.notification;
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: activeNotification && activeNotification.title,
      description: activeNotification && activeNotification.message,
    });
  };
  switch (activeNotification && activeNotification.status) {
    case "success":
      openNotificationWithIcon("success");
      break;
    case "info":
      openNotificationWithIcon("info");
      break;
    case "error":
      openNotificationWithIcon("error");
      break;
    case "warning":
      openNotificationWithIcon("warning");
      break;
    default:
      break;
  }

  return <>{contextHolder}</>;
}
