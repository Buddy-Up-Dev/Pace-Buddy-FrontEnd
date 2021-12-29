import React, { useState, useRef } from "react";
import styles from "./myProfile.module.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ProfileActive, RightAngleBracket } from "../common/icon/icons";
import Navbar from "components/common/navBar/navBar";
import { useQuery, useMutation } from "@apollo/client";
import { GET_NICKNAME } from "../../apollo/queries/users/users";
import { LOG_OUT } from "apollo/queries/login/login";
import { AlertModal } from "../common/modal/alertModal";
import { ProfileCam, Next } from "./../common/icon/icons";
import {
  UPLOAD_PROFILE,
  GET_PROFILE,
  DELETE_USER,
} from "./../../apollo/queries/myProfile/myProfile";
const IMG_KEY = process.env.REACT_APP_IMG_KEY;
const { AWS } = window;

console.log(IMG_KEY);
function MyProfile() {
  const { data: prof } = useQuery(GET_PROFILE);
  const { data: nick } = useQuery(GET_NICKNAME);
  const [deleteUser, { error, data: userD }] = useMutation(DELETE_USER);
  const [uploadProfile] = useMutation(UPLOAD_PROFILE);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [addProfile, setAddProfile] = useState(false);
  const [showProfile, setShowProfile] = useState("");
  const photoInput = useRef();
  const nickName = nick && nick["userNickname"];
  const profile = prof && prof["hasProfile"];

  const doLogOut = () => {
    localStorage.removeItem("Token");
    window.location = "/";
  };

  const delUser = () => {
    deleteUser();
  };

  const openModal = (num) => {
    if (num) {
      setShowLogModal(true);
    } else {
      setShowDelModal(true);
    }
    document.body.style.overflow = "hidden";
  };

  const handleClick = () => {
    console.log("handleClick");
    photoInput.current.click();
  };

  const uploadImg = () => {
    AWS.config.update({
      region: "ap-northeast-2",
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: `${IMG_KEY}`,
      }),
    });

    const files = photoInput.current.files;
    const file = files[0];
    const fileName = file.name;

    console.log("fileName >", fileName);

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "s3forprofile",
        Key: fileName,
        Body: file,
      },
    });
    const promise = upload.promise();
    promise.then(
      (data) => {
        setAddProfile(true);
        setShowProfile(`${data.Location}`);
        uploadProfile({ variables: { imgURL: `${data.Location}` } });
        console.log(data);
      },
      (err) => {
        console.log("err >", err);
      }
    );
  };

  return (
    <>
      {showLogModal ? (
        <AlertModal
          setShowModal={setShowLogModal}
          message1="정말 로그아웃 하시겠어요?"
          left="로그아웃"
          right="취소"
          link="/"
          func={doLogOut}
        />
      ) : null}
      {showDelModal ? (
        <AlertModal
          setShowModal={setShowDelModal}
          message1="정말 회원탈퇴를 하시겠어요?"
          message2="저장된 기록들은 전부 사라져요."
          left="회원탈퇴"
          right="취소"
          link="/"
          func={delUser}
        />
      ) : null}
      <Navbar></Navbar>
      <SectionBox>
        <div className={styles.profile_box}>
          <div className={styles.profile}>
            {profile?.hasProfile ? (
              <div>
                <img
                  className={styles.profile_img}
                  src={profile.imgURL}
                  alt="profile"
                />
              </div>
            ) : (
              <ProfileActive size={"100"}></ProfileActive>
            )}

            <input
              type="file"
              accept="image/jpg, image/jpeg, image/png"
              id="file"
              ref={photoInput}
              style={{ display: "none" }}
              onChange={uploadImg}
            />
            <div
              className={styles.profile_camera}
              onClick={() => handleClick(0)}
            >
              <ProfileCam />
            </div>
          </div>
        </div>

        <section className={styles.element_section}>
          <div className={styles.element}>
            <span className={styles.element_text} id={styles.nickName_text}>
              닉네임
            </span>
            <span className={styles.nickName}>{nickName}</span>

            <Link to="/nickname" className={styles.reName}>
              수정하기
            </Link>
            <Link to="/nickname">
              <div className={styles.next_location}>
                <Next></Next>
              </div>
            </Link>
          </div>
          <div className={styles.element}>
            <span className={styles.element_text}>개인정보처리방침</span>
            <div className={styles.bracket}>
              <RightAngleBracket></RightAngleBracket>
            </div>
          </div>
          <div className={styles.element}>
            <span className={styles.element_text}>서비스이용방침</span>
            <div className={styles.bracket}>
              <RightAngleBracket></RightAngleBracket>
            </div>
          </div>
          <div className={styles.element} onClick={() => openModal(1)}>
            <span className={styles.element_text_disable}>로그아웃</span>
          </div>
          <div className={styles.element} onClick={() => openModal(0)}>
            <span className={styles.element_text_disable}>회원탈퇴</span>
          </div>
        </section>
      </SectionBox>
    </>
  );
}

export default MyProfile;

const SectionBox = styled.div`
  position: fixed;
  top: 3rem;
  margin: auto;
  width: 375px;
  height: 100%;
  background-color: #f9feff;
  z-index: -1;
`;
