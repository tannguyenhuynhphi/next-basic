import {useContext } from "react";
import AppContext from "store/app-context";
import Notification from "./notification";

export { NotificationAction };

function NotificationAction() {
    const notificationCtx = useContext(AppContext);
    const activeNotification = notificationCtx.notification;
  return (
    <>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </> 
  );
}
