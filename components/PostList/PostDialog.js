import { ExportOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload } from "antd";
import ModalContent from "components/Common/ModalContent/ModalContent";
import UploadBox from "components/Common/UploadDrop/UploadBox";
import { useState } from "react";
import { postService } from "services";
import classes from "./PostModal.module.scss";

function PostModal(props) {
  const { TextArea } = Input;
  const [on, setOn] = useState(false);
  const onCancelModal = (value) => {
    setOn(value);
  };
  const onFinish = (values) => {
    const nameImages = document.getElementById("nameImages").value;
    const user = JSON.parse(localStorage.getItem("user"));
    const title = values.title;
    const content = values.content;
    const location = values.location;
    if (!nameImages) {
      return console.log("chưa upload");
    }
    postService
      .addPost(title, content, location, nameImages, user.id)
      .then((x) => {
        console.log(x);
      });
  };
  return (
    <ModalContent
      onCancel={() => onCancelModal(false)}
      open={on}
      title={"Thêm mới"}
      edit={<Button onClick={() => setOn(true)}>Thêm mới</Button>}
    >
      <Form
        onFinish={onFinish}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 24,
        }}
        layout="horizontal"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Your title cannot be empty!",
            },
          ]}
        >
          <Input placeholder="title" />
        </Form.Item>
        <Form.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
              message: "Your content cannot be empty!",
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Your title cannot be empty!",
            },
          ]}
          name="location"
          label="Location"
        >
          <Select>
            <Select.Option value="TP.HCM">TP.HCM</Select.Option>
            <Select.Option value="Đồng Tháp">Đồng Tháp</Select.Option>
            <Select.Option value="Vũng Tàu">Vũng Tàu</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList">
          <UploadBox />
        </Form.Item>
        <Form.Item className={classes.actionButton}>
          <Button htmlType="submit" className={classes.bottomButton}>
            Thêm mới
          </Button>
          <Button className={classes.bottomButton} onClick={() => setOn(false)}>
            Hủy
          </Button>
        </Form.Item>
      </Form>
    </ModalContent>
  );
}
export default PostModal;
