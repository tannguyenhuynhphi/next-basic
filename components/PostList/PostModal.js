import { ExportOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload } from "antd";
import ModalContent from "components/Common/ModalContent/ModalContent";
import UploadContent from "components/Common/UploadAvatar/UploadAvatar";
import UploadDrop from "components/Common/UploadDrop/UploadDrop";
import { useState } from "react";
import classes from "./PostModal.module.scss";

function PostModal(props) {
  const { TextArea } = Input;
  const [on, setOn] = useState(false);

  const onCancelModal = (value) => {
    setOn(value);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
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
        <Form.Item label="Upload" valuePropName="fileList">
          <UploadDrop />
          <UploadContent/>
        </Form.Item>
        <Form.Item className={classes.actionButton}>
          <Button htmlType="submit" className={classes.bottomButton}>
            Thêm mới
          </Button>
          <Button className={classes.bottomButton}>Hủy</Button>
        </Form.Item>
      </Form>
    </ModalContent>
  );
}
export default PostModal;
