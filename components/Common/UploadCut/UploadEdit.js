import React, { lazy, useContext, useState } from "react";
import ImgCrop from "antd-img-crop";
import { Button, Upload } from "antd";
import { uploadService } from "services/upload.service";
import AppContext from "store/app-context";
import { UploadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const UploadEdit = (props) => {
  const [fileList, setFileList] = useState([]);
  const [dataFile, setDataFile] = useState(null);
  const AppContextX = useContext(AppContext);
  const { t } = useTranslation();
  const getSrcFromFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  };
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    const src = file.url || (await getSrcFromFile(file));
    const imgWindow = window.open(src);

    if (imgWindow) {
      const image = new Image();
      image.src = src;
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
  };
  const propsUpload = {
    name: "file",
    multiple: false,
    maxCount:1,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log("data", info.fileList);
      }
      if (status === "done") {
        var formdata = new FormData();
        formdata.append("file", info.fileList[0].originFileObj);
        uploadService.upload(formdata).then((x) => {
          setDataFile(x.response);
        });
      } else if (status === "error") {
        AppContextX.showNotification({
          title: t("app.notification.error.title"),
          message: t("app.notification.error.message"),
          status: "error",
        });
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const updateImages =()=>{
    props.onUpdate()
    setDataFile("")
  }
  return (
    <>
      <input
        style={{ display: "none" }}
        id="nameImagesUploadCutEdit"
        value={dataFile && dataFile[0].filename}
      />
      {dataFile && dataFile[0].filename&&<Button onClick={updateImages} >{t('page.product.action.update')}</Button>}
      <ImgCrop grid rotate>
        <Upload {...propsUpload}>
          <Button icon={<UploadOutlined />}>{t('page.product.action.updateUpload')}</Button>
        </Upload>
      </ImgCrop>
    </>
  );
};
export default UploadEdit;
