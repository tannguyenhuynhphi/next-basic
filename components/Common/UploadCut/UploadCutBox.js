import React, { lazy, useContext, useState } from "react";
import ImgCrop from "antd-img-crop";
import { Button, Upload } from "antd";
import { uploadService } from "services/upload.service";
import AppContext from "store/app-context";

const UploadCutBox = () => {
  const [fileList, setFileList] = useState([]);
  const [dataFile, setDataFile] = useState(null);
  const AppContextX = useContext(AppContext);
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
  const props = {
    name: "file",
    multiple: false,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",

    listType: "picture-card",
    onPreview: { onPreview },
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
          AppContextX.showNotification({
            title: "Thông báo!",
            message: "upload thành công",
            status: "success",
          });
        });
      
      } else if (status === "error") {
        AppContextX.showNotification({
          title: "Thông báo!",
          message: "upload không thành công!",
          status: "error",
        });
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <>
      {/* <Button onClick={onUpload}>upload</Button> */}
      <input
        style={{ display: "none" }}
        id="nameImagesUploadCutBox"
        value={dataFile && dataFile[0].filename}
      />
      <ImgCrop grid rotate>
        <Upload {...props}>{fileList.length < 1 && "+ Upload"}</Upload>
      </ImgCrop>
    </>
  );
};
export default UploadCutBox;
