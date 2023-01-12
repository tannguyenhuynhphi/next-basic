import React, { useContext, useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Checkbox, Form, Input } from "antd";
import classes from "./Login.module.scss";
import { useRouter } from "next/router";
import { userService } from "services";
import AppContext from "store/app-context";
import { useTranslation } from "react-i18next";
const LoginComponents = () => {
  const { t } = useTranslation();
  const AppContextX = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    // redirect to home if already logged in
    if (userService.userValue) {
      router.push("/");
    }
  }, []);

  const onFinish = (values) => {
    return userService
      .login(values.username, values.password)
      .then(() => {
        // get return url from query parameters or default to '/'
        const returnUrl = router.query.returnUrl || "/";
        router.push(returnUrl);
      })
      .catch((error) => {
        AppContextX.showNotification({
          title: t("app.notification.error.title"),
          message: t("app.notification.error.message"),
          status: "error",
        });
      });
  };
  return (
    <Card
      className={classes.main}
      title={t("page.login.title")}
      // extra={<a href="#">More</a>}
      style={{ width: 400 }}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: t("page.login.required.username"),
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder={t("page.login.placeholder.username")}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              // message: t("page.login.required.username"), "Please input your Password!"
              message: t("page.login.required.password"),
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder={t("page.login.placeholder.password")}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>{t("page.login.remember")}</Checkbox>
          </Form.Item>
          <a className="login-form-forgot" href="">
            {t("page.login.ForgotPassword")}
          </a>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            {t("page.login.action.submit")}
          </Button>
          {/* Or <a href="">register now!</a> */}
        </Form.Item>
      </Form>
    </Card>
  );
};
export default LoginComponents;
