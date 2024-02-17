import SleepStore, {SleepType} from "../store/SleepStore";
import {setAlarm} from "expo-alarm";

export const createIntentAlarm = (date: Date, type?: SleepType, cycleCount?: number): void => {
  //TODO add success modal
  let createDate: Date = new Date();
  setAlarm({
    hour: date.getHours(),
    minutes: date.getMinutes(),
    message: type || SleepType.SLEEP
  })
  SleepStore.addSleep({
    end: date, start: createDate, type: type || SleepType.SLEEP, cycle: cycleCount || undefined
  })
}