import React, { useRef, useMemo } from "react";
import styles from "./infoModal.module.css";
import { EggFirst, InfoClose, EggSecond, Eggthird } from "../icon/icons";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';



function InfoModal({ setShowModal }) {
  const modalRef = useRef();
  const close = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
      document.body.style.overflow = "unset";
    }
  };
  const items = [
    <div className="item" data-value="1">1</div>,
    <div className="item" data-value="2">2</div>,
    <div className="item" data-value="3">3</div>,
    <div className="item" data-value="4">4</div>,
    <div className="item" data-value="5">5</div>,
];


  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "unset";
  };
  return (

    <div className={styles.container} ref={modalRef} onClick={close}>
      <div className={styles.x} onClick={()=>setShowModal(false)}>
        <InfoClose></InfoClose>
      </div>
      <AliceCarousel
        animationType="fadeout" 
        animationDuration={1100} //움직이는 애니메이션
        disableButtonsControls
        // infinite : 무한 캐러셀 반복인지 나타냄..
        items={items}
        mouseTracking
    >
      <div className={styles.modal}>
        <div className={styles.modal_container}>
          <div className={styles.big_font}>운동 기록 남기기</div>
          <div className={styles.font}>
            오늘 했던 운동과 컨디션을 기록할 수 있어요.
            <br></br>
            나만의 운동기록 카드를 모아보세요.
          </div>
          <EggFirst></EggFirst>
        </div>
        
      </div>
      <div className={styles.modal}>
        <div className={styles.modal_container}>
          <div className={styles.big_font}>리포트 확인하기</div>
          <div className={styles.font}>
            운동기록을 모아 최근 운동 컨디션을 확인할 수 
            <br></br>
            있어요. 리포트 결과를 SNS에 공유해보세요.
          </div>
          <EggSecond></EggSecond>
        </div>
        
      </div>
      <div className={styles.modal}>
        <div className={styles.modal_container}>
          <div className={styles.big_font}>피드 살펴보기</div>
          <div className={styles.font}>
            나와 같은 운동을 한 버디들의 기록을 살펴보세요.
            <br></br>
            좋은 운동 기록은 좋아요를 눌러 응원할 수 있어요.
          </div>
          <div style={{height:11}}></div>
          <Eggthird></Eggthird>
        </div>
        
      </div>
      </AliceCarousel>
    </div>

  );
 
}

export default InfoModal;