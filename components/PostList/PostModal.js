import { ExportOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload } from "antd";
import ModalContent from "components/Common/ModalContent/ModalContent";
import { useState } from "react";
import classes from "./PostModal.module.scss";

function PostModal(props) {
  const { TextArea } = Input;
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [on, setOn] = useState(false);

  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };
  const onCancelModal = (value) => {
    setOn(value);
  };
  return (
    <ModalContent
      onCancel={() => onCancelModal(false)}
      open={on}
      title={"Thêm mới"}
      edit={<Button onClick={() => setOn(true)}>thêm</Button>}
    >
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        onValuesChange={onFormLayoutChange}
        disabled={componentDisabled}
      >
        <Form.Item label="Title">
          <Input />
        </Form.Item>
        <Form.Item label="content">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>
        <Form className={classes.actionButton}>
          <Button className={classes.bottomButton}>Cancel</Button>
          <Button className={classes.bottomButton}>Button</Button>
          {/* <Button className={classes.bottomButton}>Button</Button>
          <Button className={classes.bottomButton}>Button</Button> */}
        </Form>
      </Form>
    </ModalContent>
  );
}
export default PostModal;
