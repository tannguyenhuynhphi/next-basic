import { AppleOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Switch } from "antd";
import { userService } from "services";
import i18n from "translation/i18n";
import classes from "./right.module.scss";

const items = [
  {
    key: "1",
    label: (
      <a
        onClick={() => {
          userService.logout();
        }}
      >
        logout
      </a>
    ),
  },
];
function RightNavi() {
  return (
    <div className={classes.rightNavi}>
      <div className={classes.contentNavi}>
        <Switch onChange={(checked) => {checked ? i18n.changeLanguage("vi"): i18n.changeLanguage("en")}} checkedChildren="vi" unCheckedChildren="en" defaultChecked />
        <Dropdown
          menu={{
            items,
          }}
          placement="bottom"
          arrow
        >
          <Avatar icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </div>
  );
}
export default RightNavi;
