import React, { useEffect, useState, useRef } from "react";
import styles from "./recordPost.module.css";
import styled from "styled-components";
import { GET_EXERCISES } from "../../../apollo/queries/exercises/getExercises";
import { useQuery, useMutation } from "@apollo/client";
import { Weathers } from "../../common/icon/weathers";
import Toggle from "../../common/toggle/toggle";
import { ADD_CARD } from "../../../apollo/queries/cardItem/addCard";
import { useHistory } from "react-router";
import { AlertModal } from "../../common/modal/alertModal";
import CalendarBar from "components/postPage/calendar/calendarbar";
import moment from "moment";
import { GET_MYDATE } from "apollo/queries/mydata/mydate";

function RecordPost() {
  const history = useHistory();

  const [selectExe, setSelectExe] = useState(0);
  const [isSelected, setIsSelected] = useState(0);
  const [textByte, setTextByte] = useState(0);
  const [isToggled, setIsToggled] = useState(true);
  const [isDone, setIsDone] = useState(false);
  //const [isBlocked, setIsBlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [todayDate, setTodayDate] = useState(0);
  const [getMoment, setMoment] = useState(moment());
  const today = getMoment;
  const [dateState, setDateState] = useState(today.format("YYYY.MM.DD"));

  const textRef = useRef();

  ////////////////////////////////////////////////////////////

  // const [mydate, setMydate] = useState(0);
  // const { data: dateList } = useQuery(GET_MYDATE);
  // const mymydate = dateList && dateList["getMyDate"];
  // setMydate(mymydate);

/////////////////////////////////////////////////////////////


  const clearState = () => {
    setSelectExe(0);
    setIsSelected(0);
    setTextByte(0);
    setIsToggled(true);
    setIsDone(false);
    setDateState(today.format("YYYY.MM.DD"));
  };
  const { data } = useQuery(GET_EXERCISES);

  const [addCard, { loading, error, dataS }] = useMutation(ADD_CARD, {
    onCompleted: (res) => {
      console.log(res);
      clearState();
      res.addPost && openModal();
    },
  });

  const exercises = data && data["getExercise"];
  const handleClickExe = (key) => {
    setSelectExe(key);
  };
  const openModal = () => {
    setShowModal(true);
    console.log(showModal);
    document.body.style.overflow = "hidden";
  };
  const handlecheckByte = () => {
    //요만큼 길이제한...
    setTextByte(textRef.current.value.length);
  };

  const handleWClick = (key) => {
    setIsSelected(key);
  };

  const limitedByte = () => {};

  const checkAll = () => {
 
      if (selectExe && isSelected && (45>textByte) && (textByte>10)) { //저장하기 버튼을 textByte 제한에 맞춰 활성화
      setIsDone(true);
    } else {
      setIsDone(false);
    }
  };

  const onSubmit = (event) => { //저장 제출함수
    event.preventDefault();
    isDone && //저장하기 활성화 여부
      addCard({
        variables: {
          uploadDate: dateState,
          exercise: selectExe,
          content: textRef.current.value,
          condition: isSelected,
          feedOpen: +isToggled,
        },
      });
    textRef.current.value = "";
  };

  useEffect(() => {
    checkAll();
    // setIsBlocked(true);
  }, [dateState, selectExe, isSelected, textByte, isToggled]);


  // console.log(typeof textByte);

  return (
    <div className={styles.all}>
      <div style={{ height: 51 }}></div>
      <CalendarBar
        dateState={dateState}
        setDateState={setDateState}
      ></CalendarBar>
      {showModal ? (
        <AlertModal
          setShowModal={setShowModal}
          message1="기록이 저장되었어요!"
          right="확인"
          link="/record"
        ></AlertModal>
      ) : null}
      <section className={styles.section} id={styles.section_exercise}>
        <div className={styles.box_section}>
          <div className={styles.section_name}>운동 선택</div>
          <div className={styles.section_detail}>어떤 운동을 하셨나요?</div>
        </div>
        <div>
          {exercises?.map((exercise) => (
            <Btn
              key={exercise.exerciseIndex}
              isSelectedExe={
                exercise.exerciseIndex === selectExe ? "on" : "off"
              }
              onClick={() => handleClickExe(exercise.exerciseIndex)}
            >
              {exercise.exerciseName}
            </Btn>
          ))}
        </div>
      </section>
      <hr />
      <section className={styles.section}>
        <div className={styles.box_section}>
          <div className={styles.section_name}>컨디션 선택</div>
          <div className={styles.section_detail}>
            운동할 때 컨디션은 어땠나요?
          </div>
        </div>
        <div className={styles.conditions}>
          {Weathers.map((condition) =>
            condition.key === isSelected ? (
              <div key={condition.key}>{condition.active}</div>
            ) : (
              <div
                key={condition.key}
                onClick={() => handleWClick(condition.key)}
              >
                {condition.disabled}
              </div>
            )
          )}
        </div>
      </section>
      <hr />
      <section className={styles.section}>
        <form>
          <div className={styles.box_section}>
            <div className={styles.section_name}>한 줄 기록</div>
            <div className={styles.section_detail}>
              운동의 감정을 간단하게 작성해보세요!
            </div>
          </div>
          <div className={styles.text_form}>
            <textarea
              ref={textRef}
              name="message"
              placeholder="최소 10자에서 최대 45자까지 기록할 수 있어요."
              onKeyUp={handlecheckByte}
              max="45"
            ></textarea>
            <div className={styles.text_byte}>{textByte}/45</div>
          </div>
        </form>
      </section>
      <hr />
      <section className={styles.section}>
        <div className={styles.box_section}>
          <div className={styles.feed}>
            <div className={styles.section_text}>
              <div className={styles.section_name}>피드에 게시</div>
              <div className={styles.section_detail_feed}>
                다른 버디들과 기록을 공유할 수 있어요.
              </div>
            </div>
            <div className={styles.toggle_button}>
              <Toggle
                setIsToggled={setIsToggled}
                isToggled={isToggled}
              ></Toggle>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.feed_open}>
        {isDone ? (
          <div className={styles.submit_active} onClick={onSubmit}>
            <p className={styles.submit_text_active}>저장하기</p>
          </div>
        ) : (
          <div className={styles.submit_disable}>
            <p className={styles.submit_text_disable}>저장하기</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default RecordPost;

const Btn = styled.button`
  margin-right: 1.5%;
  margin-bottom: 1.5%;
  margin-top: 1.5%;
  font-family: Noto Sans KR;
  font-style: normal;
  font-size: 0.75rem;
  background-color: ${(props) =>
    props.isSelectedExe === "on" ? "#00bee6" : "white"};
  border: 1.5px solid
    ${(props) => (props.isSelectedExe === "on" ? "white" : "#c5c5c5")};
  border-radius: 28px;
  height: 1.8rem;
  box-shadow: none;
  color: ${(props) => (props.isSelectedExe === "on" ? "white" : "#474747")};
`;
