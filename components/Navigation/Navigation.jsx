import { useState, useEffect } from "react";
import { userService } from "services";
import { Breadcrumb, Col, Layout, Menu, Row, theme } from "antd";
import { useRouter } from "next/router";
import Logo from "./Logo";
import LeftNavi from "./RightNavi";
const { Header, Content, Footer } = Layout;

export { Navigation };

function Navigation() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);
  // only show nav when logged in
  if (!user) return null;

  const menu = [
    { key: 1, label: "Home" },
    { key: 2, label: "Page" },
  ];
  const onClick = (info) => {
    console.log("info", info);
    switch (info.key) {
      case "1":
        return router.push("/");
      case "2":
        return router.push("/page-list");
      default:
        return null;
    }
  };
  return (
    <Header>
      <Row>
        <Col span={1}>
          <Logo />
        </Col>
        <Col span={20}>
          <Menu
            theme="light"
            mode="horizontal"
            // defaultSelectedKeys={["2"]}
            items={menu}
            onClick={onClick}
          />
        </Col>
        <Col span={3}>
      <LeftNavi/>
        </Col>
      </Row>
    </Header>
  );
}
