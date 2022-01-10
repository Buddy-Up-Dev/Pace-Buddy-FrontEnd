import { useState, useEffect} from "react";
// import styles from "./calender.module.css";
import styles from "./calendar.module.css";
import moment from "moment";
import { useQuery } from "@apollo/client";
import { GET_MYDATE } from "apollo/queries/mydata/mydate";

// 달력 코드 참조 https://yeolceo.tistory.com/m/69?category=919628

import styled from "styled-components";


// const Calendar = (props) => {
function Calendar(props) {
  ///캘린더바에서 받아온 props
  const dateState = props.dateState;
  const setDateState = props.setDateState;
  const setShowModal = props.setShowModal;

  const {loding, data, error} = useQuery(GET_MYDATE);
  const [state, setState] = useState();

  //날짜 선택 시 상태
  const [selectDate, setSelectDate] = useState(dateState);


  useEffect(() => {

    if (data) {
      setState(data)
    }
    

  }, [data])

  console.log(state);
  const dateList = state && state["getMyDate"];
  console.log(dateList);
  console.log('데이터레스트 타입',typeof(dateList));

  //값이 있는지 확인하고 추출
  const dateLength = dateList && Object.keys(dateList).length
  console.log('데이터 길이', dateLength);

  // 아래 for문에서 dateLength랑 date가 undefined
  // for (let i = dateLength; i >-1; i--) { //최근 날짜에서 먼날짜까지 반복문
  //   // let cont = state && state["getMyDate"];
  //   let date = dateList[i];
  //   console.log('반복문 안의 기록 날짜이다', date);

  //   if (date == dateState){
  //     let momentDate = moment(dateState, 'YYYY.MM.DD').subtract(1, "days");

  //     let redirectDate = momentDate.format('YYYY.MM.DD')
  //     console.log('깎아낸 문자열 이다', redirectDate);

  //     setDateState(redirectDate);
  //   }
  //   else {
  //     break;
  //   }
  // }

  console.log('초기 날짜',dateState); //string임

  const [getMoment, setMoment] = useState(moment());
  const today = getMoment; // today == moment()

  const firstWeek = today.clone().startOf("month").week(); //첫주
  const lastWeek =
    today.clone().endOf("month").week() === 1
      ? 53
      : today.clone().endOf("month").week(); //마지막주
  //53주 표현




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
                    console.log('선택날짜',dateState);
                    //key는 운동인덱스였으니까 이 경우엔 버튼날짜인 days.format('YYYY.MM.DD') 사용하면 될것 같기도..
                  };




///////////////////////////////////////////////////////////////
                // 아래 for문에서 dateLength랑 date가 undefined
                if(dateState){
                  console.log(dateState);
                  console.log(dateLength);
                  console.log(dateList);
                  
                  //왜 밑에 반복문에서는 되느데 이 반복문에서만 안되냔 말이ㅑㅇ
                  for (let i = dateLength; i >-1; i--) { //최근 날짜에서 먼날짜까지 반복문
                    // let cont = state && state["getMyDate"];
                    let date = dateList[i];
                    console.log('반복문 안의 기록 날짜이다', dateList[i]);

                    if (date == dateState){
                      let momentDate = moment(dateState, 'YYYY.MM.DD').subtract(1, "days");

                      let redirectDate = momentDate.format('YYYY.MM.DD')
                      console.log('깎아낸 문자열 이다', redirectDate);

                      setDateState(redirectDate);
                    }
                    else {
                      break;
                    }
                  }
                }
              
/////////////////////////////////////////////////////////////////////




                //오늘 날짜와 출력하는 days 비교해서 캘린더 컴포넌트 생성시에 당일 효과 넣음
                //여기를 바꿔야 
                // if(moment().format('YYYYMMDD') === days.format('YYYYMMDD')){
                  //당일날이 아니라 캘린더 바에 표시되는 날짜로 비교하기 -> 캘린더 바에는 처음에 당일을 표시하므로 초기 당일체크는 당연히 됌
                if(dateState === days.format('YYYY.MM.DD')){

                    console.log('바 날짜비교가 되었습니다')

                  return(

                      //이게 당일날
                      <Btn key={days.format('D')}
                          isSelectedDate={selectDate==days.format('D') ? "on" : "on"}
                          onClick={() => handleClickDate(days.format('D'))}
                         >
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
                         className={styles.reportdays}>
                          <span>{days.format('D')}</span>
                        </button>);
                    }

                    console.log('done');
                  }
                  return(
                      <button key={days.format('D')} className={styles.notdays}>
                        <span>{days.format('D')}</span>
                      </button>
                  );



                }else if(moment().format('YYYY.MM.DD') < days.format('YYYY.MM.DD')){
                  for (let i = 0; i <= dateLength; i++) {
                  // for (let i = dateLength; i >-1; i--){
                    let date = dateList[i];
                    if (JSON.stringify(date) === JSON.stringify(days.format("YYYY.MM.DD"))){
                      return(
                        <button key={index}
                        isSelectedDate={
                          index === selectDate ? "on" : "off"
                        }
                         className={styles.reportdays}>
                          <span>{days.format('D')}</span>
                        </button>);
                    }
                    console.log('asdfasdfdone');
                  }
                  return(
                      <Btn key={days.format('D')}
                      isSelectedDate={
                          days.format('D') === selectDate ? "on" : "off"
                        }
                       className={styles.days} 
                       >
                        <span>{days.format('D')}</span>
                      </Btn>
                  );



                }else{
                  
                  for (let i = 0; i <= dateLength; i++) {
                  // for (let i = dateLength; i >-1; i--){
                    let date = dateList[i];
                    if (JSON.stringify(date) === JSON.stringify(days.format("YYYY.MM.DD"))){
                      return(
                        <button key={index}
                        isSelectedDate={
                          index === selectDate ? "on" : "off"
                        }
                         className={styles.reportdays}>
                          <span>{days.format('D')}</span>
                        </button>);
                    }
                    console.log('done');
                  }
                  return(
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
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 5px;
  margin-top: 5px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-size: 0.85rem;
  border: none;
  width: 30px;
  height: 30px;
  background-color: ${(props) =>
    props.isSelectedDate === "on" ? "#00bee6" : "white"};
  border-radius: 50%;
  box-shadow: none;
  color: ${(props) => (props.isSelectedDate === "on" ? "white" : "#474747")};
`;