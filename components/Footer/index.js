import {
  EnvironmentOutlined,
  FacebookOutlined,
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { userService } from "services";

function FooterLayout() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);
  if (!user) return null;
  return (
    <div className="footer-distributed">
      <div className="footer-left">
        <h3>
          Kbi<span>logo</span>
        </h3>
        <p className="footer-links">
          <a href="#" className="link-1">
            Home
          </a>
          <a href="#">Blog</a>
          <a href="#">Pricing</a>
          <a href="#">About</a>
          <a href="#">Faq</a>
          <a href="#">Contact</a>
        </p>
        <p className="footer-company-name">Company Name © 2023</p>
      </div>
      <div className="footer-center">
        <div className="footer-info">
          <EnvironmentOutlined />
          <p>
            <span>6/8 Lưu Trọng Lư, P. Tân Thuận Đông, Quân 7, TP.HCM </span>
          </p>
        </div>
        <div className="footer-info">
          <PhoneOutlined />
          <p>054291650</p>
        </div>
        <div className="footer-info">
          <MailOutlined />
          <p>
            <a href="mailto:support@company.com">ntan770@gmail.com</a>
          </p>
        </div>
      </div>

      <div className="footer-right">
        <p className="footer-company-about">
          <span>About the company</span>
          Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce
          euismod convallis velit, eu auctor lacus vehicula sit amet.
        </p>

        <div className="footer-icons">
          <a href="#">
            <FacebookOutlined />
          </a>
          <a href="#">
            <TwitterOutlined />
          </a>
          <a href="#">
            <LinkedinOutlined />
          </a>
          <a href="#">
            <GithubOutlined />
          </a>
        </div>
      </div>
    </div>
  );
}
export default FooterLayout;
