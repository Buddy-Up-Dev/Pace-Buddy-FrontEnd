import React from "react";
import ReportContent from "components/reportPage/reportContent/reportContent"
import NavBar from "components/common/navBar/navBar";

function Report() {
  return (
    <>
    <NavBar></NavBar>
    <div style={{ height: 50 }}></div>
      <ReportContent></ReportContent>
    </>
  );
}

export default Report;
