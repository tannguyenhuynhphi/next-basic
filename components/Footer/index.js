import {
  EnvironmentOutlined,
  FacebookOutlined,
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

function FooterLayout() {
  return (
    <div class="footer-distributed">
      <div class="footer-left">
        <h3>
          Kbi<span>logo</span>
        </h3>
        <p class="footer-links">
          <a href="#" class="link-1">
            Home
          </a>
          <a href="#">Blog</a>
          <a href="#">Pricing</a>
          <a href="#">About</a>
          <a href="#">Faq</a>
          <a href="#">Contact</a>
        </p>
        <p class="footer-company-name">Company Name © 2023</p>
      </div>
      <div class="footer-center">
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

      <div class="footer-right">
        <p class="footer-company-about">
          <span>About the company</span>
          Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce
          euismod convallis velit, eu auctor lacus vehicula sit amet.
        </p>

        <div class="footer-icons">
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
