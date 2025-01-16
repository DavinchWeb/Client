import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "../styles/GameRoom.css";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, Text } from "@react-three/drei";
import My3DGame from "../3Dcomponents/Davinch3D";
import Stating from "../3Dcomponents/Stating";
import Buttons2D from "../components/Buttons2D";
import DoorDie from "../3Dcomponents/DoorDie";
import Card from "../3Dcomponents/Cards";
import UserStating from "../3Dcomponents/UserStating";

const GameRoom = () => {
  const locate = useLocation();
  const roomnum = locate.state?.num;
  const [Roomdata, setRoomData] = useState({});
  const Url = `/game/data`;
  const [isPollingStarted, setIstPollingStarted] = useState(false); // polling 관리
  const [stating, setState] = useState(""); // 현재 reqstate 상태
  const [reqState, setReqState] = useState(""); // 테이블 state 상태가 뭔지
  const [tabledata, settabledata] = useState([]); // 카드들 모두 가져오기
  const [me, setme] = useState(0); // 내가 누구인지
  const [cardPos, setCardPos] = useState(); // 카드 위치
  const [seeContinue, setSeeContinue] = useState(false); // continue 보일지 말지
  const [newCard, setNewCard] = useState(); // 새로 먹은 카드
  const gameRefs = useRef([]); // My3DGame refs를 저장하는 배열
  const [selectedCard, setSelectedCard] = useState(); // 클릭된 카드 상태

  const angle = (Math.PI * 2) / tabledata.length;

  useEffect(() => {
    if (stating == "Continue") {
      setSeeContinue(true);
    }
  }, [stating]);

  const setContinue = () => {
    setSeeContinue(false);
  };

  useEffect(() => {
    if (isPollingStarted.current) return; // 이미 폴링 중이면 실행하지 않음
    const data = { roomNum: Number(roomnum) };
    const fetchData = setInterval(() => {
      axios
        .post(Url, data)
        .then((response) => {
          const resdata = response.data;
          if (resdata.userOrder !== undefined) {
            setme(resdata.userOrder);
          }
          setReqState(resdata.state);
          setState(resdata.req.state);
          setRoomData(resdata);
          settabledata(resdata.table);
          setCardPos(resdata.req.cardPos);
          setNewCard(resdata.req.newCard);
        })
        .catch((error) => {
          console.error("Error fetching room data:", error);
        });
    }, 1000);
  }, []);

  const resetCard = () => {
    setSelectedCard();
  };
  const handleCardClick = (index, position, gameidx, cardFilp) => {
    setSelectedCard({ index, position, gameidx, cardFilp }); // 클릭된 카드의 인덱스와 위치 저장
  };

  useEffect(() => {
    // 각 My3DGame의 cardRefs
    gameRefs.current.forEach((gameRef, idx) => {
      if (gameRef) {
        console.log(`Player ${idx} Card Refs:`, gameRef.getCardRefs());
      }
    });
  }, [tabledata]);
  const setnothing = () => {
    setState("");
  };
  return (
    <div>
      {Roomdata != "Game End" ? (
        <div>
          <Canvas
            style={{ height: "100vh", width: "100%" }}
            camera={{ position: [0, 9, 13.5], fov: 110 }}
            onCreated={({ camera }) => {
              camera.lookAt(0, -1.5, 0); // 카메라설정
            }}
          >
            <Stating state={stating} Scontinue={seeContinue}></Stating>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            {tabledata.map((data, idx) => {
              return (
                <>
                  <My3DGame
                    key={idx}
                    gameidx={idx}
                    ref={(el) => (gameRefs.current[idx] = el)} // gameRefs에 0 1 2 를 넣음 My3DGame컴포넌트 인덱스
                    state={stating}
                    cardPos={cardPos}
                    MyCards={data}
                    angle={angle * (idx - me)}
                    num={roomnum}
                    onCardPositionUpdate={handleCardClick}
                    whatme={idx == me}
                    headcount={tabledata.length}
                  />
                  <Text
                    position={[
                      Math.sin(angle * (idx - me)) * 5,
                      1,
                      Math.cos(angle * (idx - me)) * (idx == me ? 9 : 6.5),
                    ]}
                    color="black"
                    fontSize={0.5}
                    rotation={[-Math.PI / 3, 0, 0]}
                  >
                    {idx + 1}번 유저
                  </Text>
                  {selectedCard &&
                  selectedCard.gameidx !== me &&
                  (stating == "Suspect" || reqState == "Suspect") &&
                  selectedCard.cardFilp == false &&
                  stating != "None" ? (
                    <>
                      <mesh position={selectedCard.position}>
                        <planeGeometry args={[1.5, 0.5]} />
                        <meshBasicMaterial color="blue" toneMapped={false} />
                      </mesh>
                      <Buttons2D
                        RN={roomnum}
                        cardUser={selectedCard.gameidx}
                        cardNum={selectedCard.index}
                        reset={setnothing}
                        resetCard={resetCard}
                      ></Buttons2D>
                    </>
                  ) : (
                    ""
                  )}
                  {stating == "Continue" && seeContinue ? (
                    <DoorDie RN={roomnum} reset={setContinue}></DoorDie>
                  ) : (
                    ""
                  )}
                  {stating == "Position of Card" && (
                    <Card
                      position={[0, 2, 5]}
                      cardvalue={newCard.value}
                      cardcolor={newCard.color}
                      arg={[4, 6]}
                    ></Card>
                  )}
                  <UserStating
                    currTurn={
                      ((Roomdata.currTurn - 1 + tabledata.length) %
                        tabledata.length) +
                      1
                    } // 모듈러 연산
                    suspectUser={Roomdata.suspectUser + 1}
                    suspectCard={Roomdata.suspectCard}
                    suspectValue={Roomdata.suspectValue}
                    suspectResult={Roomdata.suspectResult}
                    reqState={reqState}
                    idx={idx}
                  ></UserStating>
                </>
              );
            })}
          </Canvas>
          <form></form>
        </div>
      ) : (
        <p>데이터를 불러오는 중...</p>
      )}
    </div>
  );
};

export default GameRoom;
