import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "../styles/GameRoom.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import My3DGame from "../3Dcomponents/Davinch3D";

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

  useEffect(() => {
    console.log("MyCards:", MyCards);
  }, [MyCards]);

  useEffect(() => {
    console.log("otherCards:", otherCards, tabledata);
  }, [otherCards]);

  useEffect(() => {
    if (stating == "none") return;
    else if (stating == "Position of Card") {
    } else if (stating == "Turn Change") {
    } else if (stating == "Suspect") {
    }
  }, [stating]);

  useEffect(() => {
    if (isPollingStarted.current) return; // roomnum이 없거나 이미 폴링 중이면 실행하지 않음
    const data = { roomNum: Number(roomnum) }; // 폴링 데이터
    const fetchData = setInterval(() => {
      axios
        .post(Url, data)
        .then((response) => {
          const resdata = response.data;
          setReqState(resdata.state);
          setState(resdata.req.state);
          setRoomData(resdata);
          settabledata(resdata.table);
          setme(resdata.userOrder);
          // setMycards(resdata.table[resdata.userOrder]);
          // setOterCards(
          //   resdata.table.filter((_, index) => index !== resdata.userOrder)
          // );
        })
        .catch((error) => {
          console.error("Error fetching room data:", error);
        });
    }, 1000);
  }, []); // 의존성 배열에 roomnum과 Url 추가
  const positioning = [];
  const angle = (Math.PI * 2) / tabledata.length;
  const array = [2, 4, 6, 8];
  return (
    <div>
      {Roomdata.state === "Start" ? (
        <div>
          {/* {MyCards.map((card, index) => (
            <img
              key={index}
              className={styles.card}
              src={require(`../assets/cards/${card}.png`)}
            ></img>
          ))} */}
          <Canvas
            style={{ height: "100vh", width: "100%" }}
            camera={{ position: [0, 9, 15], fov: 75 }}
            onCreated={({ camera }) => {
              // 기본 콜백 속성
              camera.lookAt(0, -2, 0); // 카메라가 (0, 0, 0)을 바라보도록 설정
            }}
          >
            <ambientLight intensity={0.5} /> {/*// 조명 */}
            <directionalLight position={[5, 5, 5]} intensity={1} />
            {/* <OrbitControls /> */}
            {/* {otherCards.map((cards, idx) => {})} */}
            {tabledata.map((data, idx) => {
              return (
                <My3DGame
                  MyCards={data}
                  key={idx}
                  position={array[idx]}
                  angle={angle * (idx - me)} // 0 1 2 me = userOrder
                />
              );
            })}
            {/* <My3DGame MyCards={MyCards} /> */}
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
