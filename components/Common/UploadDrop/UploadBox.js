import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { uploadService } from "services/upload.service";
const { Dragger } = Upload;

const UploadDrop = () => {
  const [dataFile, setDataFile] = useState(null);
  const props = {
    name: "file",
    multiple: false,
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
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  console.log("dataFile", dataFile);
  return (
    <Dragger {...props}>
      <input style={{display: "none"}} id="nameImages" value={dataFile && dataFile[0].filename}/>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Nhấp hoặc kéo tệp vào khu vực này để tải lên
      </p>
      {/* <p className="ant-upload-hint">
        Hỗ trợ tải lên một lần hoặc hàng loạt. Nghiêm cấm tải lên dữ liệu công
        ty hoặc các tệp ban nhạc khác
      </p> */}
    </Dragger>
  );
};
export default UploadDrop;
