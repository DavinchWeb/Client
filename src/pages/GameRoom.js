import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "../styles/GameRoom.css";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import My3DGame from "../3Dcomponents/Davinch3D";
import Stating from "../3Dcomponents/Stating";
import Buttons2D from "../components/Buttons2D";
import DoorDie from "../3Dcomponents/DoorDie";

const GameRoom = () => {
  const locate = useLocation();
  const roomnum = locate.state?.num;
  const [Roomdata, setRoomData] = useState({});
  const Url = `/game/data`;
  const [MyCards, setMycards] = useState([]);
  const [otherCards, setOterCards] = useState([]);
  const [isPollingStarted, setIstPollingStarted] = useState(false);
  const [stating, setState] = useState("");
  const [reqState, setReqState] = useState("");
  const [tabledata, settabledata] = useState([]);
  const [me, setme] = useState(0);
  const [viewPos, setViewPos] = useState(true);
  const [cardPos, setCardPos] = useState();
  const [suspect, setSuspect] = useState(false);
  const [seeContinue, setSeeContinue] = useState(false);

  useEffect(() => {
    console.log("MyCards:", MyCards, "cardpos", cardPos);
  }, [MyCards]);

  useEffect(() => {
    console.log("otherCards:", otherCards, tabledata);
  }, [otherCards]);

  useEffect(() => {
    if (stating == "None") {
    } else if (stating == "Position of Card") {
    } else if (stating == "Turn Change") {
    } else if (stating == "Suspect") {
      setSuspect(true);
    } else if (stating == "Continue") {
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
        })
        .catch((error) => {
          console.error("Error fetching room data:", error);
        });
    }, 1000);
  }, []);
  const angle = (Math.PI * 2) / tabledata.length;

  const [selectedCard, setSelectedCard] = useState(); // 클릭된 카드 상태
  const resetCard = () => {
    setSelectedCard();
  };
  const handleCardClick = (index, position, gameidx, cardFilp) => {
    setSelectedCard({ index, position, gameidx, cardFilp }); // 클릭된 카드의 인덱스와 위치 저장
  };
  const gameRefs = useRef([]); // My3DGame refs를 저장하는 배열

  useEffect(() => {
    // 각 My3DGame의 cardRefs에 접근
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
                    viewPos={viewPos}
                    MyCards={data}
                    angle={angle * (idx - me)}
                    num={roomnum}
                    onCardPositionUpdate={handleCardClick}
                    whatme={idx == me}
                  />
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
