import { Col, Image, Row, Typography } from "antd";
const { Text } = Typography;
import classes from "./PostContent.module.scss";
function PostContent(props) {
  return (
    <Row>
      <Col span={8}>
        <div className={classes.images}>
          <Image src={props.data.image} />
        </div>
      </Col>
      <Col span={16}>
        <Text className={classes.createName}> {props.data.title}</Text>
        <Text>{props.data.content}</Text>
      </Col>
    </Row>
  );
}
export default PostContent;
