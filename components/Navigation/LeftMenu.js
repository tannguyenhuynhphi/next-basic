import { Menu } from "antd";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

function LeftMenu() {
  const router = useRouter();
  const { t } = useTranslation();
  const menu = [
    { key: 1, label: t("navigation.menu.home.title")},
    { key: 2, label: t("navigation.menu.post.title")},
    { key: 3, label: t("navigation.menu.product.title")},
  ];
  const onClick = (info) => {
    console.log("info", info);
    switch (info.key) {
      case "1":
        return router.push("/");
      case "2":
        return router.push("/post");
      case "3":
        return router.push("/product");
      default:
        return null;
    }
  };
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      // defaultSelectedKeys={["2"]}
      style={{ width: '150%' }}
      items={menu}
      onClick={onClick}
    />
  );
}
export default LeftMenu;
