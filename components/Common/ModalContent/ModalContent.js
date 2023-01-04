import { Modal } from "antd";
function ModalContent(props) {
  return (
    <>
      <div>{props.edit}</div>
      <Modal
        title={props.title}
        open={props.open}
        onCancel={() => props.onCancel()}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        width={props.width}
      >
        {props.children}
      </Modal>
    </>
  );
}
export default ModalContent;
