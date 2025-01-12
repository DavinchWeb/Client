import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "../styles/GameRoom.css";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import My3DGame from "../3Dcomponents/Davinch3D";
import Stating from "../3Dcomponents/Stating";

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
    }
  }, [stating]);

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
          setState(resdata.req.state); //
          setRoomData(resdata);
          settabledata(resdata.table);
          // setme(resdata.userOrder);
          setCardPos(resdata.req.cardPos);
          // setMycards(resdata.table[resdata.userOrder]);
          // setOterCards(
          //   resdata.table.filter((_, index) => index !== resdata.userOrder)
          // );
        })
        .catch((error) => {
          console.error("Error fetching room data:", error);
        });
    }, 1000);
  }, []);
  const angle = (Math.PI * 2) / tabledata.length;

  const [selectedCard, setSelectedCard] = useState(); // 클릭된 카드 상태
  const handleCardClick = (index, position, gameidx) => {
    setSelectedCard({ index, position, gameidx }); // 클릭된 카드의 인덱스와 위치 저장
  };
  const gameRefs = useRef([]); // My3DGame refs를 저장하는 배열

  useEffect(() => {
    console.log("Table Data:", tabledata);

    // 각 My3DGame의 cardRefs에 접근
    gameRefs.current.forEach((gameRef, idx) => {
      if (gameRef) {
        console.log(`Player ${idx} Card Refs:`, gameRef.getCardRefs());
      }
    });
  }, [tabledata]);

  return (
    <div>
      {Roomdata != "Game End" ? (
        <div>
          <Canvas
            style={{ height: "100vh", width: "100%" }}
            camera={{ position: [0, 8, 14], fov: 100 }}
            onCreated={({ camera }) => {
              camera.lookAt(0, -3, 0); // 카메라설정
            }}
          >
            <Stating state={stating}></Stating>
            {viewPos == true ? console.log("view!") : console.log("none")}
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
                    angle={angle * (idx - me)} // 0 1 2 me = userOrder
                    num={roomnum}
                    onCardPositionUpdate={handleCardClick}
                  />
                  {selectedCard && selectedCard.gameidx !== me ? (
                    <>
                      <mesh position={selectedCard.position}>
                        <planeGeometry args={[1.5, 0.5]} />
                        <meshBasicMaterial color="blue" toneMapped={false} />
                      </mesh>
                      <Html position={[0, 0, 0]}>
                        <div className="suspect_grid">
                          <div>조커</div>
                          <div>0</div>
                          <div>1</div>
                          <div>2</div>
                          <div>3</div>
                          <div>4</div>
                          <div>5</div>
                          <div>6</div>
                          <div>7</div>
                          <div>8</div>
                          <div>9</div>
                          <div>10</div>
                          <div>11</div>
                          <div
                            onClick={() => {
                              console.log("추론하기!");
                            }}
                          >
                            추론하기!
                          </div>
                        </div>
                      </Html>
                    </>
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
