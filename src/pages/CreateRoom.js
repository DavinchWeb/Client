import React, { useEffect, useMemo, useState } from "react";
import "../styles/createRoom.css";
import axios from "axios";

const CreateRoom = () => {
  const [numPeople, setNumPeople] = useState(2); // 초기값: 2명
  const [visible, setVisible] = useState(true);
  const [link, setLink] = useState("");
  const [RoomNum, setRoomNum] = useState();
  const sendData = () => {
    const data = { HeadCount: { numPeople } };
    axios
      .post("/create", data)
      .then((response) => {
        if (response.data && response.data.link) {
          console.log("Game room link:", response.data.link);
        } else {
          console.error("No link received in response");
        }
      })
      .catch((error) => {
        console.error("Error creating game room:", error);
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`선택된 인원: ${numPeople}`);
    setVisible(false);
    console.log(`선택된 인원: ${numPeople}`);

    try {
      const response = await axios.post(
        "https://8257c5eb-a596-4cff-830a-9f9d274ae206.mock.pstmn.io/create",
        {
          numPeople,
        }
      );

      console.log(response.data.RoomNum);
      setRoomNum(response.data.RoomNum);
    } catch {
      console.log("오류");
    }
  };

  useMemo(() => {
    if (RoomNum) {
      const RoomLink = `http://localhost:3000/game?Room=${RoomNum}`;
      setLink(RoomLink);
    }
  }, [RoomNum]);

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
