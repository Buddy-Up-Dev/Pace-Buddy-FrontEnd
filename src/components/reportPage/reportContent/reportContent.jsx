import React from "react";
import styles from "./reportContent.module.css";
// import {ReportIMG, ToReportButton, MadeReportBanner} from "..icon/icons";
import {
  ReportIMG,
  ToReportButton,
  MadeReportBanner,
} from "components/common/icon/icons";
// ReportIMG, ToReportButton, MadeReportBanner
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_MY_REPORT } from "./../../../apollo/queries/report/report";
import { GET_NICKNAME } from "./../../../apollo/queries/users/users";

function ReportContent() {
  const reports = useQuery(GET_MY_REPORT);
  const nick = useQuery(GET_NICKNAME);
  console.log(nick?.data);
  console.log(reports?.data);
  // console.log(reports.data["reporting"]);
  if (reports?.loading) {
    return <></>;
  } else {
    return (
      <div className={styles.wrap_report}>
        <div className={styles.report}>리포트</div>
        <div className={styles.onement}>버디의 한 마디</div>

        {/* 추후 받아오는 결과 값에 다라 바뀌는 멘트 */}
        {reports.data.reportExist ? (
          <div className={styles.changement}>
            {reports?.data["reporting"].conditionMent}
          </div>
        ) : null}
        <div className={styles.emptyimg}>
          <ReportIMG></ReportIMG>
        </div>
        <div className={styles.save_comment_box}>
          <div className={styles.save_comment}>
            {`기록을 꾸준히 저장하고
          운동 컨디션 리포트를 확인해보세요.`}
          </div>
          <div className={styles.to_report_button}></div>
          <Link to="/record">
            <ToReportButton></ToReportButton>
          </Link>
        </div>
        {reports.data.reportExist ? (
          <div className={styles.report_comment_box}>
            <div className={styles.report_comment_line}>
              <span>{nick?.data["userNickname"]}님이</span>
            </div>
            <div className={styles.report_comment_line}>
              <span>최근 가장 많이 한 운동은 </span>
              <span>{reports?.data["reporting"].exerciseName}</span>
              <span>에요!</span>
            </div>
            <div className={styles.report_comment_line}>
              <span>운동을 {reports?.data["reporting"].exerciseType}</span>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default ReportContent;
