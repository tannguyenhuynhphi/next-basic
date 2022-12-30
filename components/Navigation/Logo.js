import { AppleOutlined } from "@ant-design/icons";
import classes from "./Logo.module.scss";

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
