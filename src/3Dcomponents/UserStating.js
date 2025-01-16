import { Text } from "@react-three/drei";
import React from "react";

const UserStating = ({
  currTurn,
  suspectUser,
  suspectCard,
  suspectValue,
  suspectResult,
  reqState,
  idx,
}) => {
  return (
    <>
      {reqState == "Suspect" && (
        <>
          <Text position={[0, 12, 0]} color="black" fontSize={0.8}>
            {`${currTurn}유저가 ${suspectUser}유저의 ${
              suspectCard + 1
            }번째 카드를 `}
          </Text>
          <Text position={[0, 10.5, 0]} color="black" fontSize={0.8}>
            {`${suspectValue}라고 추론함 ${suspectResult ? "성공" : "실패"} `}
          </Text>
        </>
      )}
    </>
  );
};

export default UserStating;
