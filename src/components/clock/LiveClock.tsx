import React, {useEffect, useState} from 'react';
import moment from "moment";
import {Text} from 'native-base';

export default function LiveClock(props) {
  const {is24Hour} = props;
  const [time, setTime] = useState(moment().format(is24Hour ? 'HH:mm' : 'hh:mm'));

  useEffect(() => {
    setInterval(update, 1000);
  })

  const update = () => {
    setTime(moment().format(is24Hour ? 'HH:mm' : 'hh:mm'));
  };

  return (
    <Text color="white" fontSize="7xl" bold>
      {time}
    </Text>
  )
}
