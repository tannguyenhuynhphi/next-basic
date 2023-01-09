import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { userService } from "services";
import classes from "./RightMenu.module.scss";
import i18n from "translation/i18n";
function RightMenu() {
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
  const text = <span>Việt/Anh</span>;
  return (
    <div className={classes.menuRight}>
      <div className={classes.rightDiv}>
        {i18n.language === "vi" ? (
          <Tooltip placement="bottom" title={text}>
            <button onClick={() => i18n.changeLanguage("en")}>
              <div class="btn-inner">
                <div className={classes.changeLanguage}>
                  <span className={classes.changeLanguageSpanVi}>En</span>
                  <span className={classes.changeLanguageSpanEn}>Vi</span>
                </div>
              </div>
            </button>
          </Tooltip>
        ) : (
          <Tooltip placement="bottom" title={text}>
            <button onClick={() => i18n.changeLanguage("vi")}>
              <div class="btn-inner">
                <div className={classes.changeLanguage}>
                  <span className={classes.changeLanguageSpanVi}>Vi</span>
                  <span className={classes.changeLanguageSpanEn}>En</span>
                </div>
              </div>
            </button>
          </Tooltip>
        )}
      </div>
      <div className={classes.rightDiv}>
        <ShoppingCartOutlined />
      </div>
      <div className={classes.rightDiv}>
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
      <div className={classes.rightDiv}>
        <span>ntan@gmail.com</span>
      </div>
    </div>
  );
}
export default RightMenu;
