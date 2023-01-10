import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import "styles/globals.css";
import { userService } from "services";
import { AppContextProvider } from "store/app-context";
import { NotificationAction } from "components/notification/notificationAction";
import { ConfigProvider, Layout } from "antd";

import { I18nextProvider } from "react-i18next";
import i18n from "translation/i18n";
import Navbar from "components/Navigation/Navbar";
import FooterLayout from "components/Footer";

const { Header, Footer, Sider, Content } = Layout;

function App({ Component, pageProps }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // run auth check on initial load
    authCheck(router.asPath);

    // set authorized to false to hide page content while changing routes
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // run auth check on route change
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ["/login"];
    const path = url.split("?")[0];
    if (!userService.userValue && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/login",
        query: { returnUrl: router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  }
  return (
    <>
      <Head>
        <title>Basic</title>
      </Head>
      <I18nextProvider i18n={i18n}>
        <AppContextProvider>
          <ConfigProvider locale={{ locale: "vi" }}>
            <Layout>
              <Header>
              <Navbar/>
              </Header>
              <Content>
                <div>{authorized && <Component {...pageProps} />}</div>
              </Content>
              <Footer style={{ padding: "0px" }}>
                <FooterLayout />
              </Footer>
            </Layout>
            <NotificationAction />
          </ConfigProvider>
        </AppContextProvider>
      </I18nextProvider>
    </>
  );
}
export default App;
