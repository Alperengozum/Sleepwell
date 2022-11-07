import React from "react";
import {GenericCard} from "../cards/GenericCard";
import {Dimensions} from "react-native";
import SleepStore from "../../store/SleepStore";
import {Observer} from "mobx-react";
import {LineChart} from "react-native-chart-kit";

export const SleepLineChart = () => {

  return (
    <Observer>
      {() => {
        let data = SleepStore.getSleeps()?.map((sleep) => sleep.cycle).filter((sleep) => (sleep != undefined))
        if (!data){
          data = [0]
        }
        if (data.length == 0) {
          data = [0]
        }
        return (
          <GenericCard style={{marginVertical: 10}}>
            <LineChart
              data={{datasets: [{data}]}}
              width={Dimensions.get("window").width} // from react-native
              height={Dimensions.get("window").height / 3}
              yLabelsOffset={20}
              chartConfig={{
                backgroundGradientFrom: "#1f2937",
                backgroundGradientTo: "#440e6a",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              bezier
              style={{borderRadius: 20}}
            />
          </GenericCard>);
      }}
    </Observer>
  );
};
