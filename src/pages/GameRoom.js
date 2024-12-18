import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
const GameRoom = () => {
  const locate = useLocation();
  // const navi = useNavigate();
  const queParm = new URLSearchParams(locate.search); // 쿼리 스트링 받아오기
  const roomNum = queParm.get("Room");
  const [Roomdata, setRoomData] = useState("");

  // 고유 방 ID확인하기 서버나 DB에서 비교하기
  // const isValidRoom = roomNum && roomNum.length === 36; // UUID 길이 체크 (UUIDv4의 길이는 36)
  useEffect(() => {
    if (roomNum) {
      axios // http://localhost:3000/game/?Room=${roomNum} http://127.0.0.1:3030/game?Room=${roomNum}
        .get(`http://localhost:3000/game/?Room=${roomNum}`)
        .then((response) => {
          setRoomData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching room data:", error);
        });
    }
  });
  return <div>여긴 {roomNum}번 게임방임</div>;
};

export default GameRoom;
