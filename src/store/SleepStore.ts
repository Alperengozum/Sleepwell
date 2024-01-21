import {action, makeAutoObservable} from "mobx";
import {getItem, setItem} from "../utils/AsyncStorageUtils";

export enum SleepType {
  SLEEP = "sleep",
  POWERNAP = "powernap"
}

export interface Sleep {
  type: SleepType
  start: Date,
  end: Date,
  cycle?: number,
  id?: number
}

export interface ISleepStore {
  getSleeps(type?: SleepType, filters?:Partial<SleepFilter>): Array<Sleep> | undefined;

  setSleeps(sleeps: Array<Sleep>): void;

  addSleep(sleeps: Sleep): void;

  deleteSleep(id: number): void
}

export interface SleepFilter {
  start?: Date,
  end?: Date,
}

class SleepStore implements ISleepStore {

  public sleeps: Array<Sleep> | undefined;

  constructor() {
    getItem("sleeps").then(
      (sleeps) => {
        this.setSleeps(sleeps || [])
        makeAutoObservable(this);
      }
    )
  }


  getSleeps(type?: SleepType, filters?: Partial<SleepFilter>): Array<Sleep> | undefined {
    if (!this.sleeps) {
      return undefined
    }
    let sleeps = this.sleeps
    if (type) {
      sleeps = this.sleeps.filter((sleep) => sleep.type == type);
    }
    if (filters) {
      if (filters.start) {
        sleeps = sleeps.filter((sleep) => {
          return new Date(sleep.start)>= filters.start!;
        });
      }
      if (filters.end) {
        sleeps = sleeps.filter((sleep) => new Date(sleep.start) <= filters.end!);
      }
    }
    return sleeps;
  }

  setSleeps(sleeps: Array<Sleep>): void {
    this.sleeps = sleeps;
    setItem("sleeps", sleeps)
    action(async () => {
    });
  }

  addSleep(sleep: Sleep): void {
    if (!this.sleeps) {
      this.sleeps = [sleep];
    }
    if (!sleep.id) {
      sleep.id = this.sleeps.length || Math.random() * 1000;
    }
    this.sleeps.push(sleep);
    setItem("sleeps", this.sleeps)

    action(async () => {
    });
  }

  deleteSleep(id: number): void {
    if (!this.sleeps) {
      console.error("There is nothing to delete.")
    }
    this.sleeps = this.sleeps?.filter((s) => s.id != id);
    setItem("sleeps", this.sleeps)

    action(async () => {
    });
  }

}

export default new SleepStore();
