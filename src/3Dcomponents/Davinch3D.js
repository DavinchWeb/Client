import React, { useRef, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { DragControls } from "@react-three/drei";
import Card from "./Cards";
import Ground from "./Ground";

const Davinch3D = ({ MyCards, othercards, position, angle }) => {
  const totalCards = MyCards.length;
  const offset = (totalCards - 1) / 2; // 중앙 기준으로 카드들을 배치
  const cardRefs = useRef([]);

  // const othertotal = othercards.length;
  // const otheroffset = (othertotal - 1) / 2;
  // const othercardRefs = useRef([]);

  // useEffect(() => {
  //   othercardRefs.current = othercardRefs.current.slice(0, othertotal); // 배열 길이 맞추기
  // }, [othercards]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, MyCards.length); // 배열 길이 맞추기
  }, [MyCards]);

  return (
    <>
      {MyCards.map((card, index) => {
        // 카드를 중앙에서부터 좌우로 배치
        console.log(card.value);
        const positionX = (index - offset) * 2.1;
        return (
          <React.Fragment key={index}>
            {/* 카드 앞면 */}
            <Ground />
            <Card
              cardview={card.flip}
              cardcolor={card.color}
              cardvalue={card.value}
              // position={[positionX, 1, position]} // 중앙을 기준으로 X축에 배치
              position={[
                Math.cos(angle) * positionX + Math.sin(angle) * 10,
                1,
                -Math.sin(angle) * positionX + Math.cos(angle) * 10,
              ]} // 중앙을 기준으로 X축에 배치
              rotation={[-Math.PI / 8, 0, 0]} // 앞면은 기본 방향
              ref={(el) => (cardRefs.current[index] = el)} // 참조 저장
            />
            {/* 카드 뒷면 */}
            {/* <Card
              cardview={card.flip}
              cardcolor={card.color}
              cardvalue={card.value}
              position={[positionX, 1, 10]} // 앞면과 같은 X값
              rotation={[-Math.PI / 8, Math.PI, 0]} // 뒷면은 180도 회전
              ref={(el) => (cardRefs.current[index] = el)} // 참조 저장
            /> */}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default Davinch3D;
