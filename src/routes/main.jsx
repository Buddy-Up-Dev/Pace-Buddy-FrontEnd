import React from "react";
import SelectOption from "../components/common/selectOption/selectOption";
import NavBar from "../components/common/navBar/navBar";
import NaverLogin from "../components/loginPage/login/naverLogin";
import styles from "./routes.module.css";

function Main() {
  return (
    <>
      <div className={styles.body} >
        <div style={{ height: 50 }}></div>
        <NavBar></NavBar>
        <SelectOption></SelectOption>
      </div>
    </>
  );
}

export default Main;
