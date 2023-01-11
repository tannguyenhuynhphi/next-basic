import { ExportOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
import ModalContent from "components/Common/ModalContent/ModalContent";
import UploadCutBox from "components/Common/UploadCut/UploadCutBox";
import { useContext, useEffect, useState } from "react";
import { productService } from "services/product.service";
import classes from "./ProductDialog.module.scss";
import AppContext from "store/app-context";
function ProductDialog(props) {
  console.log("ádasds", props);
  const [form] = Form.useForm();

  useEffect(() => {
    if (props && props.data) {
      const init = {
        name: props.data.name,
        detail: props.data.detail,
        quantity: props.data.quantity,
        promotion: props.data.promotion,
        price: props.data.price,
      };
      form.setFieldsValue(init);
    } else {
        const init  = {
        name: "",
        detail: "",
        quantity: 100,
        promotion: 10,
        price: 100000,
      };
      form.setFieldsValue(init);
    }


  }, []);
  const { TextArea } = Input;
  const [on, setOn] = useState(false);
  const AppContextX = useContext(AppContext);
  const onCancelModal = (value) => {
    setOn(value);
  };
  const onFinish = (values) => {
    const imageUrl = document.getElementById("nameImagesUploadCutBox").value;
    const name = values.name;
    const detail = values.detail;
    const quantity = values.quantity;
    const promotion = values.promotion;
    const price = values.price;
    if (!imageUrl) {
      return console.log("chưa upload");
    }
    productService
      .addProduct(name, detail, quantity, imageUrl, promotion, price)
      .then((x) => {
        console.log(x);
        if (x.success) {
          AppContextX.showNotification({
            title: "Thông báo!",
            message: "Thêm dữ liệu thành công",
            status: "success",
          });
          setOn(false), props.refresh();
        }
      });
  };
  return (
    <ModalContent
      onCancel={() => onCancelModal(false)}
      open={on}
      title={"Thêm mới"}
      edit={<div onClick={() => setOn(true)}>{props.edit}</div>}
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
        form={form}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Your title cannot be empty!",
            },
          ]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          label="Detail"
          name="detail"
          rules={[
            {
              required: true,
              message: "Your detail cannot be empty!",
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Your Quantity cannot be empty!",
            },
          ]}
          name="quantity"
          label="Quantity"
        >
          <InputNumber
            addonBefore=""
            addonAfter="Sản phẩm"
            defaultValue={100}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Your Price cannot be empty!",
            },
          ]}
          name="price"
          label="Price"
        >
          <InputNumber
            defaultValue={1000}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            //   onChange={onChange}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Your Promotion cannot be empty!",
            },
          ]}
          name="promotion"
          label="Promotion"
        >
          <InputNumber
            defaultValue={100}
            min={0}
            max={100}
            formatter={(value) => `${value}%`}
            parser={(value) => value.replace("%", "")}
            //   onChange={onChange}
          />
        </Form.Item>

        <Form.Item label="Upload" valuePropName="fileList">
          <UploadCutBox />
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
export default ProductDialog;
