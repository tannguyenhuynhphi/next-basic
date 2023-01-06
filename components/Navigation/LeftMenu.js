
import { Menu } from "antd";
import { useRouter } from "next/router";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
function LeftMenu (){
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
      // <Menu mode="horizontal">
      //   <Menu.Item key="mail">
      //     <a href="www.marca.com">Home</a>
      //   </Menu.Item>
      //   <SubMenu title={<span>Blogs</span>}>
      //     <MenuItemGroup title="Item 1">
      //       <Menu.Item key="setting:1">Option 1</Menu.Item>
      //       <Menu.Item key="setting:2">Option 2</Menu.Item>
      //     </MenuItemGroup>
      //     <MenuItemGroup title="Item 2">
      //       <Menu.Item key="setting:3">Option 3</Menu.Item>
      //       <Menu.Item key="setting:4">Option 4</Menu.Item>
      //     </MenuItemGroup>
      //   </SubMenu>
      //   <Menu.Item key="alipay">
      //     <a href="www.marca.com">Contact Us</a>
      //   </Menu.Item>
      // </Menu>
                <Menu
                theme="dark"
                mode="horizontal"
                // defaultSelectedKeys={["2"]}
                items={menu}
                onClick={onClick}
              />
    );
}
export default LeftMenu;
