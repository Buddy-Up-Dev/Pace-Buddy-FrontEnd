import NaverLogin from "components/loginPage/login/naverLogin";
import React from "react";
import NavBar from "components/common/navBar/navBar";
import LoginContents from "components/loginPage/login/loginContents";

function Login() {
  return (
    <>
        <NavBar></NavBar>
        <LoginContents></LoginContents>
    </>
  );
}

export default Login;
