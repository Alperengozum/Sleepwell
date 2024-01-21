import React from "react";
import {ReportsList} from "../components/lists/ReportsList";
import ReportsHeader from "../components/headers/ReportsHeader";
import {SleepFilter} from "../store/SleepStore";
import {getMonthBefore} from "../utils/DateUtils";
import {useFocusEffect} from "@react-navigation/native";

export default function Reports() {
  const [selectedDate, setSelectedDate] = React.useState<SleepFilter>({
    start: getMonthBefore(new Date(), 0),
    end: getMonthBefore(new Date(), -1)
  });

  useFocusEffect(React.useCallback(() => {
    return () => {
      setSelectedDate({
        start: getMonthBefore(new Date(), 0),
        end: getMonthBefore(new Date(), -1)
      });
    };
  }, []))

  return (
    <ReportsHeader setSelectedDate={setSelectedDate} selectedDate={selectedDate}>
      <ReportsList/>
    </ReportsHeader>
  );
}
