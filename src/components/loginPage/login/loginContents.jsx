import NaverLogin from "components/loginPage/login/naverLogin";
import React from "react";
import styles from "./login.module.css";
import { LoginCharter } from "components/common/icon/icons";
import KakaoLogin from "./kakaoLogin";
import { findByLabelText } from "@testing-library/react";
import styled from "styled-components";

function LoginContents() {
  return (
    <>
      <div style={{ width: 375, margin: "auto" }}>
        <SectionBox>
          <div style={{ margin: 85 }}></div>
          <div>
            <p className={styles.write}>반가워요!</p>
            <p className={styles.write}>버디와 함께</p>
            <p className={styles.write}>운동을 기록해볼까요?</p>
          </div>
          <div className={styles.Logincharter}>
            <LoginCharter></LoginCharter>
          </div>
          <div className={styles.location}>
            <KakaoLogin></KakaoLogin>
          </div>
          <div className={styles.location}>
            <NaverLogin></NaverLogin>
          </div>
        </SectionBox>
      </div>
    </>
  );
}

export default LoginContents;

const SectionBox = styled.div`
  background-color: #f9feff;
  z-index: -1;
  width: 375;
  margin: auto;
`;