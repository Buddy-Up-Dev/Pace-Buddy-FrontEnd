import React, { useRef } from "react";
import styles from "./cardModal.module.css";
import styled from "styled-components";
import ReactDom from "react-dom";
import { Liked, UnLiked } from "../icon/icons";
import html2canvas from "html2canvas";
import { ShareBtn } from "./../icon/icons";

export const CardModal = ({
  setShowModal,
  uploadDate,
  content,
  condition,
  exercise,
  handleLikeToggle,
  isLiked,
  setIsLiked,
  likeCount,
}) => {
  const modalRef = useRef();
  const imageRef = useRef();
  const exerciseImgURL = "images/exercises/exercise" + exercise + ".svg";
  const conditionImgURL = "images/conditions/condition" + condition + ".svg";

  const close = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
      document.body.style.overflow = "unset";
    }
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "unset";
  };

  const domToImg = () => {
    console.log(modalRef);
    html2canvas(imageRef.current).then((canvas) => {
      console.log(canvas.toDataURL());
    });
  };

  return (
    <>
      <div className={styles.container} ref={modalRef} onClick={close}>
        <div ref={imageRef}>
          <CardImageCondition
            style={{ backgroundImage: `url(${conditionImgURL})` }}
          >
            <CardImageExercise
              style={{ backgroundImage: `url(${exerciseImgURL})` }}
            >
              <div className={styles.card}>
                <p className={styles.date}>{uploadDate}</p>
                <p className={styles.content}>{content}</p>
              </div>
            </CardImageExercise>
          </CardImageCondition>
        </div>
        <div className={styles.like}>
          <div className={styles.like_icon} onClick={handleLikeToggle}>
            {isLiked ? <Liked /> : <UnLiked />}
          </div>
          <span className={styles.like_text}>{likeCount}</span>
        </div>
        <div className={styles.share_icon} onClick={domToImg}>
          <ShareBtn></ShareBtn>
        </div>
      </div>
    </>
  );
};

const CardImageCondition = styled.li`
  display: block;
  border-radius: 0px;
  background-size: cover;
  align-items: flex-end;
  /* align-content: center; */
  margin-bottom: 0.2em;
  width: 289px;
  height: 385px;
  border: none;
  cursor: pointer;
  transition: transform 250ms ease-in;
  z-index: 0;
`;
const CardImageExercise = styled.div`
  background-size: cover;
  position: relative;
  display: flex-box;
  width: 289px;
  height: 385px;
  z-index: 1;
`;