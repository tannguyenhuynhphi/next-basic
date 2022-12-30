import { AppleOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Switch } from "antd";
import { useTranslation } from "react-i18next";
import { userService } from "services";
import i18n from "translation/i18n";
import classes from "./Right.module.scss";

function RightNavi() {
  const { t } = useTranslation();
  const items = [
    {
      key: "1",
      label: <a href="/profile">{t("navigation.avatar.profile", "Hồ sơ")}</a>,
    },
    {
      key: "2",
      label: (
        <a
          onClick={() => {
            userService.logout();
          }}
        >
          {t("navigation.avatar.logout", "Đăng xuất")}
        </a>
      ),
    },
  ];
  return (
    <div className={classes.rightNavi}>
      <div className={classes.contentNavi}>
        <Switch
          onChange={(checked) => {
            checked ? i18n.changeLanguage("vi") : i18n.changeLanguage("en");
          }}
          checkedChildren="vi"
          unCheckedChildren="en"
          defaultChecked
        />
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
