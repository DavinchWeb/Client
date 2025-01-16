import { Text } from "@react-three/drei";
import React, { useEffect, useState } from "react";

const Stating = ({ state, Scontinue }) => {
  const [ST, setST] = useState("");
  useEffect(() => {
    if (state === "None") {
      setST("다른 플레이어 진행중 . . .");
    } else if (state === "Position of Card") {
      setST("카드 놓을 곳을 정하세요");
    } else if (state === "Turn Change") {
      setST("Turn Change!");
    } else if (Scontinue) {
      setST("선택하세요!");
    } else if (state === "Suspect") {
      setST("추론하세요!");
    }
  }, [state]);
  return (
    <Text position={[0, 9, 0]} color="black" fontSize={1}>
      {ST}
    </Text>
  );
};

export default Stating;
