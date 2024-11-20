import React from "react";
import { useLocation } from "react-router-dom";

const GameRoom = () => {
  const locate = useLocation();
  // const navi = useNavigate();
  const queParm = new URLSearchParams(locate.search); // 쿼리 스트링 받아오기
  const roomNum = queParm.get("Room");
  // 고유 방 ID확인하기 서버나 DB에서 비교하기
  // const isValidRoom = roomNum && roomNum.length === 36; // UUID 길이 체크 (UUIDv4의 길이는 36)
  return <div>여긴 {roomNum}번 게임방임</div>;
};

export default GameRoom;
