import React, {useEffect, useState} from 'react';
import moment from "moment";
import {Text} from 'native-base';

export default function LiveClock() {
  const [time, setTime] = useState(moment().format("hh:mm"));

  useEffect(() => {
    setInterval(update, 1000);
  })

  const update = () => {
    setTime(moment().format("hh:mm"));
  };

  return (
    <Text color="white" fontSize="7xl" bold>
      {time}
    </Text>
  )
}
