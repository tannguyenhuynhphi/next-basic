import { AppleOutlined } from "@ant-design/icons";
import classes from "./logo.module.scss";

function Logo() {
  return (
    <div className={classes.logos}>
      <div className={classes.iconImage}>
        <AppleOutlined />
      </div>
    </div>
  );
}
export default Logo;
