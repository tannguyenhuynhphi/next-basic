import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Dropdown, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { userService } from "services";
import classes from "./RightMenu.module.scss";
import i18n from "translation/i18n";
function RightMenu() {
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem("user"));
  const items = [
    {
      key: "1",
      label: <a href="/profile">{t("navigation.avatar.profile.title")}</a>,
    },
    {
      key: "2",
      label: <a href="/page-list">{t("navigation.avatar.pagesLis.title")}</a>,
    },
    {
      key: "3",
      label: (
        <a href="/product-manager">{t("navigation.avatar.product.title")}</a>
      ),
    },
    {
      key: "4",
      label: (
        <a
          onClick={() => {
            userService.logout();
          }}
        >
          {t("navigation.avatar.logout.title")}
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
              <div className="btn-inner">
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
              <div className="btn-inner">
                <div className={classes.changeLanguage}>
                  <span className={classes.changeLanguageSpanVi}>Vi</span>
                  <span className={classes.changeLanguageSpanEn}>En</span>
                </div>
              </div>
            </button>
          </Tooltip>
        )}
      </div>
      <Badge size="small" count={1}>
        <div className={classes.rightDiv}>
          <ShoppingCartOutlined />
        </div>
      </Badge>
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
        <span>{user?user.email:""}</span>
      </div>
    </div>
  );
}
export default RightMenu;
