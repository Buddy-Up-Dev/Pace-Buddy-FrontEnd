import { useState, useEffect} from "react";
// import styles from "./calender.module.css";
import styles from "./calendar.module.css";
import moment from "moment";
import { useQuery } from "@apollo/client";
import { GET_MYDATE } from "apollo/queries/mydata/mydate";

// 달력 코드 참조 https://yeolceo.tistory.com/m/69?category=919628

import styled from "styled-components";

const Calendar = (props) => {

  const {loding, data, error} = useQuery(GET_MYDATE);
  const [state, setState] = useState();

//날짜 선택 시 상태
 const [selectDate, setSelectDate] = useState(moment().format('D'));


useEffect(() => {
  if (data) {
    setState(data)
  }
}, [data])

console.log(state);
const dateList = state && state["getMyDate"];
console.log(dateList);

//값이 있는지 확인하고 추출
let dateLength = dateList && Object.keys(dateList).length
console.log(dateLength);


//아래 반복문 이용해서 api랑 비교하여 달력 구성
    for (let i = 0; i <= dateLength; i++) {
    let date = dateList[i];
    console.log(date);
  }



  const [getMoment, setMoment] = useState(moment());
  const today = getMoment; // today == moment()

  const firstWeek = today.clone().startOf("month").week(); //첫주
  const lastWeek =
    today.clone().endOf("month").week() === 1
      ? 53
      : today.clone().endOf("month").week(); //마지막주
  //53주 표현



  const dateState = props.dateState;
  const setDateState = props.setDateState;
  const setShowModal = props.setShowModal;


  const calendarArr=(dateList,dateLength)=>{

        let result = [];
        let week = firstWeek;
        for ( week; week <= lastWeek; week++) { //첫주에서 마지막주까지
          result = result.concat(
            <tr key={week}>
                {
              Array(7).fill(0).map((data, index) => {
                let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day');
                
                const OnLogDate =() => {
                  setDateState(days.format('YYYY.MM.DD'));
                  console.log(dateState); 
                  setShowModal(false);
                  //날짜 클릭시에 모달 끄는 함수
                  //여기서 selectDate state도 같이 집어넣어주면 될 것 같은데
                }

                




                //클릭시 선택 날짜 state에 입력
                const handleClickDate = (key) => {
                    setSelectDate(key);

                    setDateState(days.format('YYYY.MM.DD'));
                    
                    console.log('인덱스',index);
                    console.log('일자',days.format('D'));
                    //key는 운동인덱스였으니까 이 경우엔 버튼날짜인 days.format('YYYY.MM.DD') 사용하면 될것 같기도..
                  };












                //오늘 날짜와 출력하는 days 비교
                if(moment().format('YYYYMMDD') === days.format('YYYYMMDD')){
                   for (let i = 0; i <= dateLength; i++) {
                    let date = dateList[i];
                    if (JSON.stringify(date) === JSON.stringify(moment().format("YYYY.MM.DD"))){
                      return(
                        <button key={days.format('D')}
                          isSelectedDate={selectDate ? "off" : "on"}
                          onClick={() => handleClickDate(days.format('D'))}
                          className={styles.reportdays}>
                          <span>{days.format('D')}</span>
                        </button>);
                        // <Btn key={days.format('D')}
                        //   isSelectedDate={selectDate ? "off" : "on"}
                        //   onClick={() => handleClickDate(days.format('D'))}
                        //   className={styles.reportdays}>
                        //   <span>{days.format('D')}</span>
                        // </Btn>);
                    }
                    
                  }
                  // for (let i = 0; i <= dateLength; i++) {
                  //   let date = dateList[i];
                  //   if (JSON.stringify(date) === JSON.stringify(moment().format('YYYYMMDD'))){
                  //     return(
                  //       <button key={index} className={styles.reportdays}>
                  //         <span>{days.format('D')}</span>
                  //       </button>);
                  // }
                  return(

            //         <Btn
            //   key={exercise.exerciseIndex}
            //   // isSelectedExe={exercise.Index === selectExe ? "on" : "off"}
            //   isSelectedExe={
            //     exercise.exerciseIndex === selectExe ? "on" : "off"
            //   }
            //   onClick={() => handleClickExe(exercise.exerciseIndex)}
            // >
            //   {exercise.exerciseName}
            // </Btn>
                    
                      // <TodayButton key={days.format('D')} onClick={OnLogDate}>
                      //   <span>{days.format('D')}</span>
                      // </TodayButton>


                      //이게 당일날
                      <Btn key={days.format('D')}
                          isSelectedDate={selectDate==days.format('D') ? "on" : "off"}
                          onClick={() => handleClickDate(days.format('D'))}
                          className={styles.reportdays}>
                          <span>{days.format('D')}</span>
                        </Btn>
                  );
                }
                else if(days.format('MM') !== today.format('MM')){
                  for (let i = 0; i <= dateLength; i++) {
                    let date = dateList[i];
                    //기록된 날짜랑 같으면
                    if (JSON.stringify(date) === JSON.stringify(days.format("YYYY.MM.DD"))){
                      return(
                        <button key={days.format('D')}
                          onClick={() => handleClickDate(days.format('D'))}
                         className={styles.reportdays}>
                          <span>{days.format('D')}</span>
                        </button>);
                        // <Btn key={days.format('D')}
                        //   isSelectedDate={selectDate ? "off" : "on"}
                        //   onClick={() => handleClickDate(days.format('D'))}
                        //  className={styles.reportdays}>
                        //   <span>{days.format('D')}</span>
                        // </Btn>);
                    }

                    console.log('done');
                  }
                  return(
                      <button key={days.format('D')} className={styles.notdays}>
                        <span>{days.format('D')}</span>
                      </button>
                      // <Btn key={index}
                      // isSelectedDate={
                      //     index === selectDate ? "on" : "off"
                      //   }
                      //   onClick={() => handleClickDate(index)}
                      //  className={styles.notdays}>
                      //   <span>{days.format('D')}</span>
                      // </Btn>
                  );
                }else{
                  
                  for (let i = 0; i <= dateLength; i++) {
                    let date = dateList[i];
                    if (JSON.stringify(date) === JSON.stringify(days.format("YYYY.MM.DD"))){
                      return(
                        <button key={index}
                        isSelectedDate={
                          index === selectDate ? "on" : "off"
                        }
                        onClick={() => handleClickDate(index)}
                         className={styles.reportdays}>
                          <span>{days.format('D')}</span>
                        </button>);
                        // <Btn key={days.format('D')}
                        // isSelectedDate={
                        //   days.format('D') === selectDate ? "on" : "off"
                        // }
                        // onClick={() => handleClickDate(days.format('D'))}
                        //  className={styles.reportdays}>
                        //   <span>{days.format('D')}</span>
                        // </Btn>);
                    }
                    console.log('done');
                  }
                  return(
                      // <DayButton key={index} className={styles.days} onClick={OnLogDate}>
                      //   <span>{days.format('D')}</span>
                      // </DayButton>
                      <Btn key={days.format('D')}
                      isSelectedDate={
                          days.format('D') === selectDate ? "on" : "off"
                        }
                        onClick={() => handleClickDate(days.format('D'))}
                       className={styles.days} 
                       >
                        <span>{days.format('D')}</span>
                      </Btn>
                  );
                }
              })
            }
            </tr>);
        }
        return result;
      }

  return (
    <div>
      <div className={styles.body}>
        <div
          onClick={() => {
            setMoment(getMoment.clone().subtract(1, "month"));
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 15.5L7 10L12.5 4.5"
              stroke="#474747"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className={styles.font}>{today.format("YYYY.MM ")}</span>

        <div
          onClick={() => {
            setMoment(getMoment.clone().add(1, "month"));
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 4.5L13 10L7.5 15.5"
              stroke="#C5C5C5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div>
        <button className={styles.mondays}>일</button>
        <button className={styles.mondays}>월</button>
        <button className={styles.mondays}>화</button>
        <button className={styles.mondays}>수</button>
        <button className={styles.mondays}>목</button>
        <button className={styles.mondays}>금</button>
        <button className={styles.mondays}>토</button>
      </div>
      <table className={styles.container}>
        <tbody>{calendarArr(dateList, dateLength)}</tbody>
      </table>
    </div>
  );
};
export default Calendar;


const DayButton = styled.button`
  height: 2.2rem;
  width: 10%;
  border: none;
  border-radius: 100px;
  margin-left: 2%;
  margin-right: 2%;
  margin-bottom: 1%;
  background-color: white;
  :hover {
    background-color: #00bee6;
    color: white;
  }
`;

const TodayButton = styled.button`
  height: 2.2rem;
  width: 10%;
  border: none;
  border-radius: 100px;
  margin-left: 2%;
  margin-right: 2%;
  margin-bottom: 1%;
  background-color: #00bee6;
  color: white;
  :hover {
    background-color: white;
    color: #474747;
  }
`;



const Btn = styled.button`
  margin-right: 2%;
  margin-bottom: 1.5%;
  margin-top: 1.5%;
  font-family: Noto Sans KR;
  font-style: normal;
  font-size: 0.85rem;
  background-color: ${(props) =>
    props.isSelectedDate === "on" ? "#00bee6" : "white"};

    ${(props) => (props.isSelectedDate === "on" ? "white" : "#c5c5c5")};
  border-radius: 28px;
  height: 1.8rem;
  box-shadow: none;
  color: ${(props) => (props.isSelectedDate === "on" ? "white" : "#474747")};
`;