import React, { useEffect, useState } from "react";
import styles from "../styles/Select.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SelectingRoom = () => {
  const [UserCount, setUserCount] = useState(0); // 유저 수
  const navigate = useNavigate();
  useEffect(() => {
    if (UserCount === 0) {
      // UserCount가 0이 아닐 때만 sendData 호출
      return;
    }
    sendData();
  }, [UserCount]);

  const sendData = () => {
    // { count }
    // 선택한 유저수를 보내고 방 번호를 받아오는 함수
    const data = { HeadCount: UserCount };
    axios
      .post("http://127.0.0.1:3030/creation/room", data)
      .then((response) => {
        const parsedata = JSON.parse(response.data);
        if (parsedata && parsedata.roomNum) {
          // data를 받아오면
          console.log("Game room link:", parsedata.roomNum);
          navigate(`/wait?room=${parsedata.roomNum}`);
        } else {
          console.error("No link received in response");
        }
      })
      .catch((error) => {
        console.error("Error creating game room:", error);
      });
  };
  return (
    <div className={styles.contain}>
      <div className={`${styles.circle1}`}></div>
      <div className={`${styles.circle2}`}></div>
      <div
        className={`${styles.two_div} ${styles.box}`}
        onClick={() => {
          setUserCount(2); // { count: 2 } 안에 이걸 넣어서 UserCount를 안쓰고 할수 있을듯
        }}
      >
        <span>Two</span>
      </div>
      <div
        className={`${styles.three_div} ${styles.box}`}
        onClick={() => {
          setUserCount(3);
        }}
      >
        <span>Three</span>
      </div>
      <div
        className={`${styles.four_div} ${styles.box}`}
        onClick={() => {
          setUserCount(4);
        }}
      >
        <span>Four</span>
      </div>
    </div>
  );
};

export default SelectingRoom;
