import { useState, useEffect } from "react";

import { NavLink } from ".";
import { userService } from "services";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useRouter } from "next/router";
const { Header, Content, Footer } = Layout;

export { Navigation };

function Navigation() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  function logout() {
    userService.logout();
  }

  // only show nav when logged in
  if (!user) return null;

  const menu = [
    { key: 1, label: "Home" },
    { key: 2, label: "Page" },
    { key: 3, label: "Logout" },
  ];
  const onClick = (info) => {
    console.log("info", info);
    switch (info.key) {
      case "1":
        return router.push("/");
      case "2":
        return router.push("/page-list");
      case "3":
        return logout();
      default:
        return null;
    }
  };
  return (
    <Header>
      <div className="logo" />
      <Menu
        theme="light"
        mode="horizontal"
        // defaultSelectedKeys={["2"]}
        items={menu}
        onClick={onClick}
      />
    </Header>
  );
}
