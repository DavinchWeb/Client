import React, { useRef, useEffect, useState } from "react";
import Card from "./Cards";
import Ground from "./Ground";
import axios from "axios";

const Davinch3D = ({
  MyCards,
  cardPos,
  angle,
  viewPos,
  num,
  state,
  onCardPositionUpdate,
  gameidx,
  whatme,
  headcount,
}) => {
  const totalCards = MyCards.length;
  const offset = (totalCards - 1) / 2;
  const cardRefs = useRef([]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, MyCards.length);
  }, [MyCards]);

  return (
    <>
      {MyCards.map((card, index) => {
        const positionX = (index - offset) * 2.1;
        const myRotation = card.flip
          ? [-Math.PI / 2, 0, 0]
          : [-Math.PI / 8, 0, 0];

        const opponentRotation = card.flip
          ? [-Math.PI / 2, angle + Math.PI * 2, 0] // 뒤집힘
          : [0, angle + Math.PI, 0]; // 안뒤집힘

        const position = [
          Math.cos(angle) * positionX + Math.sin(angle) * 10,
          card.flip ? 0 : 1,
          whatme == true
            ? card.flip == true
              ? -Math.sin(angle) * positionX + Math.cos(angle) * 12
              : -Math.sin(angle) * positionX + Math.cos(angle) * 13
            : card.flip == true // 까짐
            ? -Math.sin(angle) * positionX + Math.cos(angle) * 6
            : -Math.sin(angle) * positionX + Math.cos(angle) * 13, // ㄴㄴ
        ];
        return (
          <React.Fragment key={index}>
            <Ground />
            <Card
              state={state}
              cardview={card.flip}
              cardcolor={card.color}
              cardvalue={card.value}
              position={position}
              rotation={
                whatme ? myRotation : opponentRotation
                // card.flip ? Math.PI / 2 : whatme ? -Math.PI / 8 : 0,
                // whatme ? 0 : angle + Math.PI,
                // card.flip ? Math.PI : 0,
                // 나면 0 아니면 Math.PI 180 도
              }
              ref={(el) => {
                if (el) cardRefs.current[index] = el;
              }}
              onClick={() => {
                onCardPositionUpdate(
                  index,
                  [position[0], 4, position[2]],
                  gameidx,
                  card.flip
                );
              }}
            />
          </React.Fragment>
        );
      })}
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
                position={[
                  Math.cos(angle) * buttoposX + Math.sin(angle) * 13,
                  3,
                  -Math.sin(angle) * buttoposX + Math.cos(angle) * 12.5,
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
