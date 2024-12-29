import React, { useEffect, useState } from "react";
import styles from "../styles/Select.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SelectingRoom = () => {
  const [UserCount, setUserCount] = useState(0); // 유저 수
  const navigate = useNavigate();
  useEffect(() => {
    // 유저 수 확인하기
    console.log(UserCount);
  }, [UserCount]);

  const sendData = () => {
    // { count }
    // 선택한 유저수를 보내고 방 번호를 받아오는 함수
    const data = { HeadCount: { UserCount } };
    axios
      .post("http://127.0.0.1:3030/selection/creation", data)
      .then((response) => {
        if (response.data && response.data.RoomNum) {
          // data를 받아오면
          console.log("Game room link:", response.data.RoomNum);
          navigate(`/wait?room=${response.data.RoomNum}`);
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
          setUserCount(2);
          sendData(); // { count: 2 } 안에 이걸 넣어서 UserCount를 안쓰고 할수 있을듯
        }}
      >
        <span>Two</span>
      </div>
      <div
        className={`${styles.three_div} ${styles.box}`}
        onClick={() => {
          setUserCount(3);
          sendData();
        }}
      >
        <span>Three</span>
      </div>
      <div
        className={`${styles.four_div} ${styles.box}`}
        onClick={() => {
          setUserCount(4);
          sendData();
        }}
      >
        <span>Four</span>
      </div>
    </div>
  );
};

export default SelectingRoom;
