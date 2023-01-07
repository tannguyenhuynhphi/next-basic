import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Drawer } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { userService } from "services";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";

function Navbar() {
  const [visible, setvVisible] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);
  // only show nav when logged in
  if (!user) return null;
  const showDrawer = () => {
    setvVisible(true);
  };
  const onClose = () => {
    setvVisible(false);
  };
  return (
    <nav className="menuBar">
      <div className="logo">
        <a href="www.marca.com">logo</a>
      </div>
      <div className="leftMenu">
        <LeftMenu />
      </div>
      <div className="menuCon">
        <div className="rightMenu">
          <RightMenu />
        </div>
        <Button className="barsMenu" type="primary" onClick={showDrawer}>
          <span className="barsBtn" />
        </Button>
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu />
          <RightMenu />
        </Drawer>
      </div>
    </nav>
  );
}
export default Navbar;
