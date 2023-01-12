import { ExportOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
import ModalContent from "components/Common/ModalContent/ModalContent";
import UploadCutBox from "components/Common/UploadCut/UploadCutBox";
import { useContext, useEffect, useState } from "react";
import { productService } from "services/product.service";
import classes from "./ProductDialog.module.scss";
import AppContext from "store/app-context";
import { useTranslation } from "react-i18next";

function ProductDialog(props) {
  const [form] = Form.useForm();
  const { t } = useTranslation();
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
      const init = {
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
    console.log("values", values);
    const imageUrl = props.data
      ? null
      : document.getElementById("nameImagesUploadCutBox").value;
    const name = values.name;
    const detail = values.detail;
    const quantity = values.quantity;
    const promotion = values.promotion;
    const price = values.price;
    console.log("imageUrl", imageUrl);
    // if (imageUrl==null) {
    //   return console.log("chưa upload");
    // }
    if (props.data) {
      productService
        .uploadProduct(
          props.data._id,
          name,
          detail,
          quantity,
          promotion,
          price,
          imageUrl
        )
        .then((x) => {
          if (x.success) {
            AppContextX.showNotification({
              title: t("app.notification.success.title"),
              message: t("app.notification.success.message"),
              status: "success",
            });
            setOn(false), props.refresh();
          }
        });
    } else {
      productService
        .addProduct(name, detail, quantity, imageUrl, promotion, price)
        .then((x) => {
          if (x.success) {
            AppContextX.showNotification({
              title: t("app.notification.success.title"),
              message: t("app.notification.success.message"),
              status: "success",
            });
            setOn(false), props.refresh();
          }
        });
    }
  };
  return (
    <ModalContent
      onCancel={() => onCancelModal(false)}
      open={on}
      title={
        props.data
          ? t("page.product.modal.update.title")
          : t("page.product.modal.add.title")
      }
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
          label={t("page.product.modal.name.title")}
          name="name"
          rules={[
            {
              required: true,
              message: t("page.product.modal.required.name"),
            },
          ]}
        >
          <Input placeholder={t("page.product.modal.placeholder.name")} />
        </Form.Item>
        <Form.Item
          label={t("page.product.modal.detail.title")}
          name="detail"
          rules={[
            {
              required: true,
              message: t("page.product.modal.required.detail"),
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: t("page.product.modal.required.quantity"),
            },
          ]}
          name="quantity"
          label={t("page.product.modal.quantity.title")}
        >
          <InputNumber addonBefore="" addonAfter="Sản phẩm" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: t("page.product.modal.required.price"),
            },
          ]}
          name="price"
          label={t("page.product.modal.price.title")}
        >
          <InputNumber
            // defaultValue={1000}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: t("page.product.modal.required.promotion"),
            },
          ]}
          name="promotion"
          label={t("page.product.modal.promotion.title")}
        >
          <InputNumber
            // defaultValue={100}
            min={0}
            max={100}
            formatter={(value) => `${value}%`}
            parser={(value) => value.replace("%", "")}
            //   onChange={onChange}
          />
        </Form.Item>
        {!props.data && (
          <Form.Item
            label={t("page.product.modal.action.upload")}
            valuePropName="fileList"
          >
            <UploadCutBox />
          </Form.Item>
        )}
        <Form.Item className={classes.actionButton}>
          <Button htmlType="submit" className={classes.bottomButton}>
            {props.data
              ? t("page.product.modal.action.update")
              : t("page.product.modal.action.add")}
          </Button>
          <Button className={classes.bottomButton} onClick={() => setOn(false)}>
            {t("page.product.modal.action.cancel")}
          </Button>
        </Form.Item>
      </Form>
    </ModalContent>
  );
}
export default ProductDialog;
