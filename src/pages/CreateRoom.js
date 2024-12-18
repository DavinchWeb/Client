import React, { useState } from "react";
import "../styles/createRoom.css";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const CreateRoom = () => {
  const [numPeople, setNumPeople] = useState(2); // 초기값: 2명
  const [visible, setVisible] = useState(true);
  const [link, setLink] = useState("");
  const sendData = () => {
    const data = { HeadCount: { numPeople } };
    axios
      .post("/create", data)
      .then((response) => {
        if (response.data && response.data.link) {
          // 서버에서 링크를 전달했다고 가정
          console.log("Game room link:", response.data.link);
        } else {
          console.error("No link received in response");
        }
      })
      .catch((error) => {
        console.error("Error creating game room:", error);
      });
  };
  // https://3417856e-8e67-45d9-9f14-16de685d94fe.mock.pstmn.io  목서버 주소
  const handleSubmit = async (e) => {
    e.preventDefault();
    const roomId = uuidv4();
    console.log(`선택된 인원: ${numPeople}`);
    // const rand = Math.floor(Math.random() * 100); // 1~100사이 값이 들어감
    //http://127.0.0.1:3030/game?Room=${roomId}
    const RoomLink = `http://localhost:3000/game?Room=${roomId}`; // 링크 만들기
    setLink(RoomLink);
    setVisible(false);
    console.log(`선택된 인원: ${numPeople}`);
    console.log(`생성된 링크: ${RoomLink}`);

    try {
      const response = await axios.post(
        "https://3417856e-8e67-45d9-9f14-16de685d94fe.mock.pstmn.io/create",
        {
          numPeople, // 인원수
        }
      );
      console.log("백엔드", response.data);
    } catch (error) {
      console.error("오류", error);
    }
  };

  const handSelectChan = (e) => {
    setNumPeople(Number(e.target.value));
  };

  return (
    <div className="main">
      <div className="bodying">
        <form onSubmit={handleSubmit}>
          <label htmlFor="num">인원</label>
          <select
            name="people"
            id="num"
            value={numPeople}
            onChange={handSelectChan}
          >
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          {visible && (
            <input
              type="submit"
              onClick={sendData}
              value="게임방 만들기"
            ></input>
          )}
        </form>
        <div className="Link-box">{link}</div>
        <button
          onClick={() => {
            if (link) {
              navigator.clipboard
                .writeText(link)
                .then(() => alert("복사되었습니다!"))
                .catch((error) => alert("복사 실패"));
            }
          }}
        >
          Copy
        </button>
      </div>
      <div className="footers">
        <div className="person in">본인</div>
        {Array.from({ length: numPeople - 1 }).map(
          // Array.from({length:변수길이만큼의 Array생성})
          (_, index) => (
            <div key={index} className="person">
              사람 {index + 1}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CreateRoom;
