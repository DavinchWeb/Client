import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/WaitRoom.module.css";

const WaitRoom = () => {
  const Url = `https://8257c5eb-a596-4cff-830a-9f9d274ae206.mock.pstmn.io/wait?Room=155`;
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");
  const navi = useNavigate();
  const [userState, setUserState] = useState(1);
  const texts = [
    "처음 패에서 조커는 나오지 않아요.",
    "지금 이 글을 보고 있는 당신은 지금도 1분을 낭비했죠.",
    "다빈치 코드는 만 7세 이상부터 가능한 게임입니다.",
    "같은 수 일 때는 흑백 타일이 먼저 배치됩니다.",
    "조커 타일은 어디에나 있을 수 있습니다.",
    "추리에 실패했다면 당신이 가져왔던 타일을 공개해야합니다.",
    "다빈치 코드의 원조는 2002년의 일본의 아르고algo라는 게임이다.",
    "국내에서 추리게임 카테고리 중 가장 많이 팔린 보드게임은 다빈치 코드이다.",
    "다빈치 코드의 총 타일 개수는 조커를 포함해 26개다.",
    "자신이 최근에 가져온 타일을 항상 잘 기억하고 있어야 합니다.",
    "한 명이 남을 때 까지 다빈치 코드는 계속 됩니다.",
    "4인 모드에서는 타일을 각각 3개씩 가지게 됩니다.",
    "2 ~3인 모드에서는 타일을 각각 4개씩 가지게 됩니다.",
    "더 이상 뽑을 타일이 없다면 추리 실패 시 원하는 타일을 공개하면 됩니다.",
    "타일이 먼저 다 공개 된 사람이 패배합니다.",
    "후공이 조금 더 유리할지도 모릅니다.",
    "다빈치 코드는 1이 아닌 0부터 타일이 시작합니다.",
    "소설이나 영화 다빈치 코드와 게임 다빈치 코드는 아무런 연관이 없습니다.",
    "다빈치 코드라는 이름은 미국 수출명을 따른 것이다.",
    "당신의 타일을 들키지 않게 추리할 땐 신중하게 해야 합니다.",
    "당신의 기억력과 관찰력을 확인해 볼게요!",
    "다빈치 코드는 오름차순의 추리게임입니다.",
    "다빈치 코드는 일본의 도쿄대 수학과의 학생과 세계 수학 올림픽 1회 우승자가 제작한 게임이다.",
  ];
  const boxCount = 4;
  const boxes = Array.from({ length: boxCount }, (_, i) => i);

  useEffect(() => {
    setLink(window.location.href);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      axios.get(Url).then((res) => {
        console.log(res.data.gameStart);
        setUserState(res.data.userCount);
        if (res.data.gameStart) {
          clearInterval(interval); // 게임 시작 시 Interval 해제
          navi(`/game?Room=155`); // 게임 페이지로 이동
        }
      });
    }, 5000);
    return () => clearInterval(interval); // 인터벌 풀기
  }, [Url, navi]);

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div className={styles.grid_list}>
          {boxes.map((index) => (
            <div
              key={index}
              className={`${
                index === 0 || index === 3 ? styles.Wbox : styles.Bbox
              } ${
                index < userState
                  ? index === 0 || index === 3
                    ? styles.Win
                    : styles.Bin
                  : ""
              }`}
            ></div>
          ))}
          {/* <div
            className={`${styles.Wbox} ${index < userState ? styles.in : ""}`}
          ></div>
          <div className={styles.Bbox}></div>
          <div className={styles.Wbox}></div>
          <div className={styles.Bbox}></div> */}
        </div>
        <div className={styles.circle}></div>
      </div>
      <div className={styles.footer}>
        <span>GameRoom Link</span>
        <div className={styles.Linkdiv}>{link}</div>
        <div
          onClick={() => {
            if (link) {
              navigator.clipboard.writeText(link);
              setMessage("복사되었습니다!");
            }
          }}
        >
          링크복사
        </div>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default WaitRoom;
