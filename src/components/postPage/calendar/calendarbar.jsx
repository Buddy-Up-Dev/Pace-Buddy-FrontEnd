import React, { useState, useEffect } from "react";
import styles from "./calendarbar.module.css";
import Calendar from "./calendar";
import moment from "moment";
import { Modal } from "../../common/modal/calendarModal";
import classname from "classnames";
import styled from "styled-components";
import { DropDown } from "../../common/icon/icons";
// import GoBackBtn from "components/goBack/goBackBtn";
import { GoBack } from "../../common/icon/icons";
import { useHistory } from "react-router";



import { useQuery } from "@apollo/client";
import { GET_MYDATE } from "apollo/queries/mydata/mydate";

//구조분해 할당 필요
function CalendarBar(props) {
  const [todayDate, setTodayDate] = useState(0);
  const [getMoment, setMoment] = useState(moment());
  const [showModal, setShowModal] = useState(false);

  const history = useHistory();

  const GoBackClick = () => {
    history.go(-1);
  };

  const dateState = props.dateState;
  const setDateState = props.setDateState;

  const openModal = () => {
    setShowModal(true);
  };

  const today = getMoment;
  return (
    <>
      <div className={styles.height}>
        <div className={styles.goback} onClick={GoBackClick}>
          <GoBack></GoBack>
        </div>

        {/* 캘린더모달 */}
        {showModal ? (
          <Modal
            dateState={dateState}
            setDateState={setDateState}
            setShowModal={setShowModal}
          />
        ) : null}
        <DateButton onClick={openModal}>
          {/* 캘린더에서 dateState에 today.format('YYYY.MM.DD') 값 넣어줌 */}
          <span>{dateState}</span>
          <DropButton onClick={openModal}>
            <DropDown></DropDown>
          </DropButton>
        </DateButton>
      </div>
    </>
  );
}

export default CalendarBar;

const DateButton = styled.button`
  font-family: pretendard;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  height: 20px;
  width: 10%;
  border: none;
  border-radius: 100px;
  margin-left: 32%;
  padding-top: 3%;
  background-color: white;
  color: #474747;
`;

const DropButton = styled.svg`
  position: absolute;
  width: 2rem;
  height: 20px;
  top: 1rem;
  right: 7rem;
`;
