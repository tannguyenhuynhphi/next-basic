import { Menu } from "antd";
import { useRouter } from "next/router";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
function LeftMenu() {
  const router = useRouter();
  const menu = [
    { key: 1, label: "Home" },
    { key: 2, label: "Post" },
    { key: 3, label: "Product" },
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
      style={{ width: '1000%' }}
      items={menu}
      onClick={onClick}
    />
  );
}
export default LeftMenu;
