import React, { useRef, useState, useEffect } from "react";
import styles from "./cardModal.module.css";
import styled from "styled-components";
import ReactDom from "react-dom";
import { Liked, UnLiked } from "../icon/icons";
import html2canvas from "html2canvas";
import { ShareBtn } from "./../icon/icons";
import Share from "../share/kakaoshare";
import domtoimage from "dom-to-image";
import axios from "axios";
import KaKaoShare from "./../share/kakaoshare";
import { ShareModal } from "./shareModal";

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
  const [imgURL, setImgURL] = useState("");
  const [openShareModal, setOpenShareModal] = useState(false);
  const exerciseImgURL = "images/exercises/exercise" + exercise + ".svg";
  const conditionImgURL = "images/conditions/condition" + condition + ".svg";
  const IMGUR_KEY = process.env.REACT_APP_IMGUR_KEY;

  const uploadImgur = (url) => {
    const apiBase = "https://api.imgur.com/3/image";
    axios
      .post(
        apiBase,
        {
          image: url,
          type: "base64",
        },
        {
          headers: {
            Authorization: "Client-ID " + IMGUR_KEY,
          },
        }
      )
      .then((res) => {
        setImgURL(res.data.data.link);
        console.log(imgURL);
      })
      .catch((e) => {
        console.log("err", e);
      });
  };

  const handleShare = async () => {
    window.scrollTo(0, 0);
    let url = "";
    await html2canvas(imageRef.current).then(async (canvas) => {
      url = await canvas.toDataURL("image/png").split(",")[1];
    });
    await uploadImgur(url);
  };

  const openModal = () => {
    setOpenShareModal(true);
    console.log(openShareModal);
    document.body.style.overflow = "hidden";
    handleShare();
  };
  const close = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
      setOpenShareModal(false);
      document.body.style.overflow = "unset";
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setOpenShareModal(false);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      (
      {openShareModal ? (
        <ShareModal
          message1={"카드를 공유해보아요."}
          imgURL={imgURL}
          setOpenShareModal={setOpenShareModal}
          openShareModal={openShareModal}
          setImgURL={setImgURL}
        ></ShareModal>
      ) : null}
      <div className={styles.container} ref={modalRef} onClick={close}>
        <div className={styles.con} ref={imageRef}>
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
        <div className={styles.share_icon} onClick={openModal}>
          <ShareBtn handleShare={handleShare}></ShareBtn>
          {/* <KaKaoShare imgURL={imgURL} isUpload={isUpload}></KaKaoShare> */}
        </div>
      </div>
      )
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
