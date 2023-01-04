import { useTranslation } from "react-i18next";
import { Card, Col, Pagination, Row, Skeleton, Typography } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import PostContent from "./PostContent";
import { FormatDatetime } from "helpers/formatDatetime";
import classes from "./PostPage.module.scss";
import { useEffect, useState } from "react";
import { postService } from "services";
const { Text } = Typography;
const { Meta } = Card;
function PostPage(props) {
  const { t } = useTranslation();
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    var page = 1;
    var limit = 10;
    var skip = (page - 1) * limit;
    postService.getPost(limit, skip).then((x) => {
      setData(x.data);
      setTotal(x.total);
    });
  }, []);

  const loadData = (pages) => {
    setPage(pages);
  };
  useEffect(() => {
    var skip = (page - 1) * limit;
    postService.getPost(limit, skip).then((x) => {
      setData(x.data);
      setTotal(x.total);
    });
  }, [page]);
  return (
    <Row>
      <Col span={24}>
        {data &&
          data.map((item) => (
            <Card
              style={{
                margin: 16,
                marginLeft: 200,
                marginRight: 200,
              }}
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Skeleton loading={false} avatar active>
                <Meta
                  title={
                    <Text disabled>
                      <UserOutlined /> {item.userPost.name}{" "}
                      {FormatDatetime(data.dateCreated)}
                    </Text>
                  }
                  description={<PostContent data={item} />}
                />
              </Skeleton>
            </Card>
          ))}
      </Col>
      <Col className={classes.pagination} span={24}>
        <Pagination
          current={page}
          onChange={loadData}
          defaultCurrent={1}
          total={total}
        />
      </Col>
    </Row>
  );
}
export default PostPage;
