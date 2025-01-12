import React, { useRef, useEffect, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { DragControls } from "@react-three/drei";
import Card from "./Cards";
import Ground from "./Ground";
import axios from "axios";
import { data } from "react-router-dom";

const Davinch3D = ({
  MyCards,
  cardPos,
  angle,
  viewPos,
  num,
  state,
  onCardPositionUpdate,
  gameidx,
}) => {
  const totalCards = MyCards.length;
  const offset = (totalCards - 1) / 2;
  const cardRefs = useRef([]);
  const [selectedCard, setSelectedCard] = useState();

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, MyCards.length);
  }, [MyCards]);

  useEffect(() => {
    console.log("selectedCard의 인덱스는 ", selectedCard, "gameidx는", gameidx);
  }, [selectedCard]);

  const handleCardClick = (index, position) => {
    setSelectedCard({ index, position, gameidx }); // 클릭된 카드의 인덱스와 위치 저장
  };
  const [selposition, setSelPosition] = useState([]);
  return (
    <>
      {MyCards.map((card, index) => {
        const positionX = (index - offset) * 2.1;
        const position = [
          Math.cos(angle) * positionX + Math.sin(angle) * 10,
          1,
          -Math.sin(angle) * positionX + Math.cos(angle) * 13,
        ];
        return (
          <React.Fragment key={index}>
            {/* 카드 앞면 */}
            <Ground />
            <Card
              state={state}
              cardview={card.flip}
              cardcolor={card.color}
              cardvalue={card.value}
              position={position}
              rotation={[-Math.PI / 8, 0, 0]}
              // ref={(el) => (cardRefs.current[index] = el)} // 참조
              ref={(el) => {
                if (el) cardRefs.current[index] = el; // 유효한 요소만 저장
              }}
              onClick={() => {
                // 카드 선택 위치
                handleCardClick(index, [position[0], 4, position[2]], gameidx);
                setSelPosition([position[0], 4, position[2]], gameidx);
                onCardPositionUpdate(
                  index,
                  [position[0], 4, position[2]],
                  gameidx
                );
              }} // 카드 클릭 시 이벤트 처리
            />
          </React.Fragment>
        );
      })}
      {/* {selposition && angle != 0 ? (
        <mesh position={selposition}>
          <planeGeometry args={[1.5, 0.5]} />
          <meshBasicMaterial color="blue" toneMapped={false} />
        </mesh>
      ) : (
        ""
      )} */}
      {viewPos == true && cardPos != null && angle == 0
        ? cardPos.map((pos, index) => {
            const buttoposX = -offset * 2.1 - 1.05 + pos * 2.1;
            const data = {
              roomNum: Number(num),
              cardPos: Number(cardPos[index]),
            };
            return (
              <mesh
                onClick={() => {
                  axios.post("/game/pos", data).then((res) => {
                    console.log(res);
                  });
                }}
                color={"red"}
                position={[
                  Math.cos(angle) * buttoposX + Math.sin(angle) * 13,
                  4,
                  -Math.sin(angle) * buttoposX + Math.cos(angle) * 13,
                ]}
                rotation={[-Math.PI / 8, 0, 0]}
              >
                <planeGeometry args={[1, 1]}></planeGeometry>
                <meshBasicMaterial toneMapped={false} color={"red"} />
              </mesh>
            );
          })
        : ""}
    </>
  );
};

export default Davinch3D;
