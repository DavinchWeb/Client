import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
const GameRoom = () => {
  const locate = useLocation();
  // const navi = useNavigate();
  const queParm = new URLSearchParams(locate.search); // 쿼리 스트링 받아오기
  const roomNum = queParm.get("Room");
  const [Roomdata, setRoomData] = useState({});
  const Url = `https://8257c5eb-a596-4cff-830a-9f9d274ae206.mock.pstmn.io/game?Room=${roomNum}`;

  // http://localhost:3000/game/?Room=${roomNum} http://127.0.0.1:3030/game?Room=${roomNum}
  useEffect(() => {
    if (roomNum) {
      axios
        .get(Url)
        .then((response) => {
          setRoomData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching room data:", error);
        });
    }
  }, []);
  return (
    // 각자 View를 다르게 해야함
    <div>
      <div>여긴 {roomNum}번 게임방임</div>
      {Roomdata.userCount ? (
        <div>
          <p>유저 수: {Roomdata.userCount}</p>
          {Roomdata.users &&
            Object.keys(Roomdata.users).map((key) => (
              <div key={key}>
                <h3>{key}</h3>
                <p>Cookie: {Roomdata.users[key]?.Cookie || "정보 없음"}</p>
                <p>
                  Cards:{" "}
                  {Roomdata.users[key]?.cards
                    ? Roomdata.users[key].cards.join(", ")
                    : "카드 없음"}
                </p>
              </div>
            ))}
        </div>
      ) : (
        <p>데이터를 불러오는 중...</p>
      )}
    </div>
  );
};

export default GameRoom;
