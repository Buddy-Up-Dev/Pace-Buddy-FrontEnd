import React, { useRef } from "react";
import styles from "./alertModal.module.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

export const AlertModal = ({
  setShowModal,
  message1,
  message2,
  left,
  right,
  link,
  func,
}) => {
  const modalRef = useRef();
  const history = useHistory();
  console.log("modal open");

  const close = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
      document.body.style.overflow = "unset";
    }
  };
  const doFunctional = () => {
    if (func) {
      func();
      history.push(link);
    } else {
      history.push(link);
    }
  };
  const closeModalTwo = (num) => {
    setShowModal(false);
    document.body.style.overflow = "unset";
  };
  const closeModalOne = () => {
    setShowModal(false);
    history.push(link);
    history.go(0);
    document.body.style.overflow = "unset";
  };
  return left == null ? (
    <div className={styles.container} ref={modalRef}>
      <div className={styles.modal}>
        <div className={styles.modal_container}>
          <div className={styles.message}>
            {message1}
            <br />
            {message2}
          </div>
          <div className={styles.button_container_one}>
            {/* <Link to={link} style={{ textDecoration: "none" }}> */}
            <div className={styles.full_one} onClick={closeModalOne}>
              <span className={styles.full_text}>{right}</span>
            </div>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.container} ref={modalRef} onClick={close}>
      <div className={styles.modal}>
        <div className={styles.modal_container}>
          <div className={styles.message}>
            {message1}
            <br />
            {message2}
          </div>
          <div className={styles.button_container_two}>
            <div onClick={doFunctional}>
              <div className={styles.full_two}>
                <span className={styles.full_text}>{left}</span>
              </div>
            </div>
            <div className={styles.empty_two} onClick={closeModalTwo}>
              <span className={styles.empty_text}>{right}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
AlertModal.defaultProps = {
  left: null,
  func: null,
};
export default AlertModal;
