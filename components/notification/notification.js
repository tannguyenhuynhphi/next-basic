import { Alert } from "antd";


import classes from "./notification.module.scss";

function Notification(props) {
  const { title, message, status } = props;
  return (
    <div className={classes.notification}>
      <Alert
        message={title}
        description={message}
        type={status}
        showIcon
        // closable
      />
    </div>
  );
}

export default Notification;
