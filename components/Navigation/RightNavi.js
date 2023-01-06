import {
  AppleOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
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
      label: (
        <a href="/profile">{t("navigation.avatar.profile.title", "Hồ sơ")}</a>
      ),
    },
    {
      key: "2",
      label: (
        <a href="/page-list">
          {t("navigation.avatar.pagesLis.title", "Danh sách Post")}
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          onClick={() => {
            userService.logout();
          }}
        >
          {t("navigation.avatar.logout.title", "Đăng xuất")}
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
        <ShoppingCartOutlined />
        <Dropdown
          menu={{
            items,
          }}
          placement="bottom"
          arrow
        >
          <Avatar icon={<UserOutlined />} />
        </Dropdown>

        <div className={classes.textUser}>
          <span>kbi tan</span>
        </div>
      </div>
    </div>
  );
}
export default RightNavi;
