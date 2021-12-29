import React from "react";
import styles from "./ninkname.module.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "components/common/navBar/navBar";
import { SaveBtn } from "./../common/icon/icons";

function Nickname() {
  return (
    <>
      <Navbar></Navbar>
      <SectionBox>
        <div style={{ margin: 25 }}></div>

        <div className={styles.main_ment}>뭐라고 부르면 될까요?</div>

        <section className={styles.element_section}>
          <input className={styles.element}></input>

          <div className={styles.text_ment}>10자 이내로 만들 수 있어요.</div>

          <Link to="/myPage">
            <SaveBtn></SaveBtn>
          </Link>
        </section>
      </SectionBox>
    </>
  );
}

export default Nickname;

const SectionBox = styled.div`
  position: fixed;
  top: 3rem;
  margin: auto;
  width: 375px;
  height: 100%;
  background-color: #f9feff;
  z-index: -1;
`;
