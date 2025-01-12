import { Text } from "@react-three/drei";
import React, { useEffect, useState } from "react";

const Stating = ({ state }) => {
  const [ST, setST] = useState("");
  useEffect(() => {
    if (state === "None") {
      setST("None!");
    } else if (state === "Position of Card") {
      setST("Position of Card!");
    } else if (state === "Turn Change") {
      setST("Turn Change!");
    } else if (state === "Suspect") {
      setST("Suspect!");
    }
  }, [state]);
  return (
    <Text position={[0, 7, 0]} color="black" fontSize={1}>
      {ST}
    </Text>
  );
};

export default Stating;
