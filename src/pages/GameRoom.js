import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "../styles/GameRoom.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import My3DGame from "../3Dcomponents/Davinch3D";

const GameRoom = () => {
  const locate = useLocation();
  const roomnum = locate.state?.num;
  // const navi = useNavigate();
  const [Roomdata, setRoomData] = useState({});
  const Url = `https://8257c5eb-a596-4cff-830a-9f9d274ae206.mock.pstmn.io/game/data`;
  const [MyCards, setMycards] = useState([]);
  const [otherCards, setOterCards] = useState([]);

  const data = { roomNum: { roomnum } };
  // http://localhost:3000/game/?Room=${roomNum} http://127.0.0.1:3030/game?Room=${roomNum}
  useEffect(() => {
    const interval = setInterval(() => {
      if (roomnum) {
        axios
          .post(Url, data)
          .then((response) => {
            const resdata = response.data;
            setRoomData(resdata);
            setMycards(resdata.table[resdata.userOrder]);
            setOterCards(
              resdata.table.filter((_, index) => index !== resdata.userOrder)
            );
            console.log(Roomdata);
            console.log(otherCards);
          })
          .catch((error) => {
            console.error("Error fetching room data:", error);
          });
      }
      return () => clearInterval(interval); // 인터벌 풀기
    }, 10000);
  }, [roomnum, data, Url]);
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
            {/* <My3DGame cards={MyCards} me={whatme} /> */}
          </Canvas>
        </div>
      ) : (
        <p>데이터를 불러오는 중...</p>
      )}
    </div>
  );
};

export default GameRoom;
