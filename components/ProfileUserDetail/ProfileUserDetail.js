import {
  CarryOutOutlined,
  CreditCardOutlined,
  EnvironmentOutlined,
  MailOutlined,
  ManOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import classes from "./ProfileUserDetail.module.scss";
import { Typography } from "antd";
import UploadAvatar from "./UploadAvatar";

function ProfileUserDetail(props) {
  const { t } = useTranslation();
  const { Title, Text } = Typography;
  return (
    <Row>
      <Col span={24}>
        <Card
          title={t("page.profile.header.title", "THÔNG TIN CÁ NHÂN")}
          extra={<a href="#">More</a>}
        >
          <Row>
            <Col span={12}>
              <div className={classes.avatar}>
                <Avatar size={150} icon={<UserOutlined />} />
              </div>
            </Col>
            <Col className={classes.contentRight} span={12}>
              <Col span={6}>
                <div className={classes.content}>
                  <UserOutlined />
                  <Title className={classes.title} level={5}>
                    {t("page.profile.name", "Họ Tên:")}
                  </Title>
                  <Text>{props.data.name}</Text>
                </div>
                <div className={classes.content}>
                  <MailOutlined />
                  <Title className={classes.title} level={5}>
                    {t("page.profile.email", "Email:")}
                  </Title>
                  <Text>{props.data.email}</Text>
                </div>
                <div className={classes.content}>
                  <PhoneOutlined />
                  <Title className={classes.title} level={5}>
                    {t("page.profile.phone", "Số điện thoại:")}
                  </Title>
                  <Text>{props.data.phone}</Text>
                </div>
                <div className={classes.content}>
                  <EnvironmentOutlined />
                  <Title className={classes.title} level={5}>
                    {t("page.profile.address", "Địa chỉ:")}
                  </Title>
                  <Text>{props.data.address}</Text>
                </div>
              </Col>
              <Col span={6}>
                <div className={classes.content}>
                  <ManOutlined />
                  <Title className={classes.title} level={5}>
                    {t("page.profile.gender", "Giới tính:")}
                  </Title>
                  <Text>{props.data.gender}</Text>
                </div>
                <div className={classes.content}>
                  <CarryOutOutlined />
                  <Title className={classes.title} level={5}>
                    {t("page.profile.date_of_birth", "Ngày sinh:")}
                  </Title>
                  <Text>{props.data.dateOfBirth}</Text>
                </div>
                <div className={classes.content}>
                  <CreditCardOutlined />
                  <Title className={classes.title} level={5}>
                    {t("page.profile.CMND_CCCD", "CMND_CCCD:")}
                  </Title>
                  <Text>{props.data.cccd}</Text>
                </div>
              </Col>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <UploadAvatar /> 
            </Col>
          </Row>
        </Card>
      </Col>
      {/* <Col span={12}>
        <Card title="Default size card" extra={<a href="#">More</a>}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Col> */}
    </Row>
  );
}
export default ProfileUserDetail;
