import React from "react";
import {ReportsList} from "../components/lists/ReportsList";
import ReportsHeader from "../components/headers/ReportsHeader";
import {SleepIndicatorChart} from "../components/charts/SleepIndicatorChart";
import {SleepLineChart} from "../components/charts/SleepLineChart";

export default function Reports() {

  return (
    <ReportsHeader>
      <SleepIndicatorChart/>
      <SleepLineChart/>
      <ReportsList/>
    </ReportsHeader>
  );
}
