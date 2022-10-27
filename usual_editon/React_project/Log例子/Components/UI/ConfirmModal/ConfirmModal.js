import "./ComfirmModal.css";
import Card from "../Card/Card";
//引入蒙版
import Backdrop from "../Backdrop/Backdrop";

const ConfirmModal = (props) => {
  return (
    <Backdrop>
      <Card className="confirmModal">
        <div className="confirmText">
          <p>该操作不可恢复！确认吗？</p>
        </div>
        <div className="confirmButton">
          <button onClick={props.onOk} className="okButton">
            确认
          </button>
          <button onClick={props.onCancel}>取消</button>
        </div>
      </Card>
    </Backdrop>
  );
};

export default ConfirmModal;
