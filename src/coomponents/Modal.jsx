import { useContext } from "react";
import { SessionContext } from "../context/SessionContext";
import Form from "./Form";

const Modal = () => {
  const { state, dispatch } = useContext(SessionContext);
  return (
    <div
      className="modal"
      style={{ display: state.isModalOpen ? "flex" : "none" }}>
      <div className="modal_content">
      <button className="close_button" onClick={() => dispatch({ type: "MODAL", payload: false })}>
            X
          </button>
        <Form title="Edit Session" session={state?.selected} /> 
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}>
        </div>
      </div>
    </div>
  );
};
export default Modal;
