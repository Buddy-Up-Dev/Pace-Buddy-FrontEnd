import React, { useEffect } from "react";
import styles from "./kakaoShare.module.css";
const { Kakao } = window;

function KaKaoShare({ imgURL }) {
  const sharing = () => {
    console.log("kakao", imgURL);
    Kakao.Link.createCustomButton({
      container: "#create-kakao-link-btn",
      templateId: 67168,
      templateArgs: {
        THU: imgURL,
      },
    });

    Kakao.Link.sendCustom({
      templateId: 67168,
      templateArgs: { THU: imgURL },
    });
  };

  if (imgURL) {
    return (
      <a id="create-kakao-link-btn">
        <div className={styles.kakao_img} onClick={sharing}>
          <img src="https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png" />
        </div>
      </a>
    );
  } else {
    return <div>링크 생성 중..</div>;
  }
}

export default KaKaoShare;
