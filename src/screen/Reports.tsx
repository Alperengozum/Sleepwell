import React from "react";
import {ReportsList} from "../components/lists/ReportsList";
import ReportsHeader from "../components/headers/ReportsHeader";

export default function Reports() {

  return (
    <ReportsHeader>
      <ReportsList/>
    </ReportsHeader>
  );
}
