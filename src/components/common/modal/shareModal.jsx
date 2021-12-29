import React, { useRef } from "react";
import styles from "./shareModal.module.css";
import { useHistory } from "react-router";
import KaKaoShare from "./../share/kakaoshare";
import { Close } from "./../icon/icons";

export const ShareModal = ({
  setOpenShareModal,
  handleShare,
  setImgURL,
  message1,
  message2,
  imgURL,
  openShareModal,
  right,
  link,
}) => {
  const modalRef = useRef();
  const history = useHistory();

  const close = (e) => {
    if (e.target === modalRef.current) {
      setOpenShareModal(false);
    }
  };
  console.log("shareModal", imgURL);

  const closeModalTwo = () => {
    setOpenShareModal(false);
    console.log("false", openShareModal);
  };

  return (
    <div className={styles.container} ref={modalRef} onClick={close}>
      <div className={styles.modal}>
        <div className={styles.modal_container}>
          <div className={styles.message}>
            {message1}
            <br />
            {message2}
          </div>
          <div className={styles.button_container_two}>
            <KaKaoShare imgURL={imgURL}></KaKaoShare>
          </div>
        </div>
        <div className={styles.empty_two} onClick={closeModalTwo}>
          <Close></Close>
          {/* <span className={styles.empty_text}>닫기</span> */}
        </div>
      </div>
    </div>
  );
};
ShareModal.defaultProps = {
  left: null,
  func: null,
};
export default ShareModal;
