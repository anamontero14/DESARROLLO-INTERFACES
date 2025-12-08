import { Button } from "@react-navigation/elements";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const Counter = () =>  {
  var [secondsLeft, setSecondsLeft] = useState(60) //estado inicial a 0
  var [isRunning, setRunning] = useState(false)

  useEffect (() => {
    async function setInterval() {
      try {
        if (isRunning && secondsLeft > 0) {
          setSecondsLeft(secondsLeft - 1)
        }
      }finally {
        setRunning(isRunning = false);
      }
    }
    setInterval();
  }, [isRunning, secondsLeft]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        onPress={
          () => setRunning(isRunning = !isRunning) //alterna el valor de is running
        }
      >Start/Pause</Button>
      <Button
          onPress={
            () => {setRunning(isRunning = false); //para el temporizador
            setSecondsLeft(secondsLeft = 60); //reestablece el contador
          }
        }
      >Reset</Button>
      <Text>{secondsLeft}</Text>
    </View>
  );

}

export default Counter;