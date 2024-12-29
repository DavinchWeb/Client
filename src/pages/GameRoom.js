import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "../styles/GameRoom.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import My3DGame from "../3Dcomponents/Davinch3D";

const GameRoom = () => {
  const locate = useLocation();
  // const navi = useNavigate();
  const queParm = new URLSearchParams(locate.search); // 쿼리 스트링 받아오기
  const roomNum = queParm.get("room");
  const [Roomdata, setRoomData] = useState({});
  //const Url = `https://8257c5eb-a596-4cff-830a-9f9d274ae206.mock.pstmn.io/game?Room=${roomNum}`;
  const Url = `http://127.0.0.1:3030/game?room=${roomNum}/load`;
  const [MyCards, setMycards] = useState([]);

  // http://localhost:3000/game/?Room=${roomNum} http://127.0.0.1:3030/game?Room=${roomNum}
  useEffect(() => {
    if (roomNum) {
      axios
        .get(Url)
        .then((response) => {
          setRoomData(response.data);
          setMycards(response.data.user1.MyCard);
        })
        .catch((error) => {
          console.error("Error fetching room data:", error);
        });
    }
  }, []);
  return (
    <div>
      {Roomdata.userCount ? (
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
            <My3DGame cards={MyCards} /> {/* 3D 게임 로직 */}
          </Canvas>
        </div>
      ) : (
        <p>데이터를 불러오는 중...</p>
      )}
    </div>
  );
};

export default GameRoom;
