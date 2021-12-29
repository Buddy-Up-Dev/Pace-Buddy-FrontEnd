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

function CalendarBar(props) {
  const [todayDate, setTodayDate] = useState(0);
  const [getMoment, setMoment] = useState(moment());
  const [showModal, setShowModal] = useState(false);
  /////////////////////////////////////////////////////////////////////////////


//   const {loding, data, error} = useQuery(GET_MYDATE);
//   const [state, setState] = useState([]);

//   useEffect(() => {
//   console.log('렌더링이 완료되었습니다!');
//   // do some checking here to ensure data exist
//   if (data) {
//     // mutate data if you need to
//     setState(data)
//   }

//   //     for (let i = 0; i <= Object.keys(state).length; i++) {
//   //   // let seoul = moment(mymydate[i]).tz("Asia/Seoul");
//   //   let date = state[i];
//   //   console.log(date);
//   // }
//   // // else (data === null) {return null};
// }, [data])
// ///////////////////////////////////////////////////////////////////////////


///state에 저장 됐는데...
// console.log(state);
// console.log(typeof(state));
// const dateList = state && state["getMyDate"];

// console.log(dateList);
// console.log(typeof(dateList));
// console.log(dateList.length);


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
        {/* 캘린더 모달 */}
        {/* {showModal ? (
          <CalendarModal
            setShowModal={setShowModal}
          />
        ) : null} */}
        {/* <div className={sidebarClasses}>  */}
        {showModal ? (
          <Modal
            dateState={dateState}
            setDateState={setDateState}
            setShowModal={setShowModal}
          />
        ) : null}
        <DateButton onClick={openModal}>
          {/* <span>{today.format('YYYY.MM.DD')}</span> */}
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
