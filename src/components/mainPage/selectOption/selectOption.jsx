import React, { memo, useState, useEffect } from "react";
import styles from "./selectOption.module.css";
import CardList from "../../common/cardList/cardList";
import { useQuery, NetworkStatus } from "@apollo/client";
import { IS_LOGGED_IN } from "../../../apollo/queries/login/login";
import styled from "styled-components";
import { GET_EXERCISES } from "../../../apollo/queries/exercises/getExercises";
import ErrorPage from "../../common/feedPage/errorPage";
import {
  GET_ALL_CARD,
  GET_OPTIONAL_CARD,
} from "../../../apollo/queries/cardItem/getCard";
import NullPage from "components/common/feedPage/nullPage";
import Load from "../../common/loader/loader";
import InView from "react-intersection-observer";
import CardItem from "./../../common/cardItem/cardItem";

const SelectOption = memo(() => {
  const [sortByFlag, setSortByFlag] = useState(0);
  const [selectExe, setSelectExe] = useState(0);
  const [fullyLoaded, setFullyLoaded] = useState(false);
  const { data: exeList } = useQuery(GET_EXERCISES);
  const [off, setOff] = useState(0);

  const { loading, error, data, networkStatus, fetchMore, variables } =
    useQuery(selectExe ? GET_OPTIONAL_CARD : GET_ALL_CARD, {
      variables: selectExe
        ? { flag: sortByFlag, exercise: selectExe }
        : { flag: sortByFlag, offset: 0 },
      notifyOnNetworkStatusChange: true,
    });
  console.log(data);

  const exercises = exeList && exeList["getExercise"];
  const postData = data && Object.values(data)[0]["PostData"];
  const likeArray = data && Object.values(data)[0]["likeArray"];

  const handleClickExe = (key) => {
    setSelectExe(key);
  };

  if (networkStatus === NetworkStatus.loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <>
      <section className={styles.section}>
        <div className={styles.sortBar}>
          <span className={styles.feed}>피드</span>
          <div className={styles.sort}>
            <SortFlag
              color={sortByFlag ? "on" : "off"}
              onClick={() => setSortByFlag(0)}
            >
              최신순
            </SortFlag>
            <span> · </span>
            <SortFlag
              color={sortByFlag ? "off" : "on"}
              onClick={() => setSortByFlag(1)}
            >
              인기순
            </SortFlag>
          </div>
        </div>
        <div className={styles.wrapbar}>
          <Btn
            key="0"
            isSelectedExe={selectExe ? "off" : "on"}
            onClick={() => handleClickExe(0)}
          >
            전체
          </Btn>
          {exercises?.map((exercise) => (
            <Btn
              key={exercise.exerciseIndex}
              // isSelectedExe={exercise.Index === selectExe ? "on" : "off"}
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
      <section className={styles.section}>
        <ul className={styles.cardList}>
          {postData?.map((card) => (
            <CardItem
              key={card["Post"].postIndex}
              card={card}
              likeArray={likeArray}
            />
          ))}
        </ul>
        <InView
          onChange={async (inView) => {
            if (inView) {
              const result = await fetchMore({
                variables: {
                  offset: off + 6,
                },
              });
            }
          }}
        />
      </section>
    </>
  );
});

export default SelectOption;

const SortFlag = styled.span`
  color: ${(props) => (props.color === "on" ? "#c5c5c5" : "#00bee6")};
  font-family: Noto Sans KR;
  font-style: normal;
  font-size: 0.75rem;
  font-weight: normal;
  :hover {
    color: #00bee6;
  }
`;

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
