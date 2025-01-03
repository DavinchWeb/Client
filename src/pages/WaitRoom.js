import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/WaitRoom.module.css";

const WaitRoom = () => {
  const Url = `https://8257c5eb-a596-4cff-830a-9f9d274ae206.mock.pstmn.io/room/ready`;
  const locate = useLocation();
  //const roomnum = locate.state?.roomnum;
  const navi = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
  const roomnum = urlParams.get("num"); // "123123"
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");
  const [userState, setUserState] = useState(1);
  const [textBox, settextBox] = useState("");

  const texts = [
    "처음 패에서 조커는 나오지 않습니다.",
    "다빈치 코드는 만 7세 이상부터 가능한 게임입니다.",
    "같은 숫자일 때는 흑색 타일이 먼저 배치됩니다.",
    "조커 타일은 어디에나 있을 수 있습니다.",
    "추리에 실패했다면, 당신이 가져왔던 타일을 공개합니다.",
    "다빈치 코드의 원조는 2002년에 일본에서 제작된 '아르고(algo)'라는 게임입니다.",
    "국내 추리 게임 카테고리 중 가장 많이 팔린 보드게임은 다빈치 코드입니다.",
    "다빈치 코드의 총 타일 개수는 조커를 포함해 26개입니다.",
    "자신이 최근에 가져온 타일을 항상 잘 기억하고 있어야 합니다.",
    "한 명이 남을 때까지 다빈치 코드는 계속됩니다.",
    "4인 모드에서는 타일을 각각 3개씩 가지게 됩니다.",
    "2~3인 모드에서는 타일을 각각 4개씩 가지게 됩니다.",
    "더 이상 뽑을 타일이 없다면, 추리 실패 시 원하는 타일을 공개하면 됩니다.",
    "타일을 가장 먼저 모두 공개한 사람이 패배합니다.",
    "후공이 조금 더 유리할지도 모릅니다.",
    "다빈치 코드는 1이 아닌 0부터 타일이 시작합니다.",
    "소설이나 영화 '다빈치 코드'와 보드게임 '다빈치 코드'는 아무런 연관이 없습니다.",
    "다빈치 코드라는 이름은 미국 수출명을 따른 것입니다.",
    "당신의 타일을 들키지 않게 추리할 땐 신중하게 해야 합니다.",
    "당신의 기억력과 관찰력을 확인해 볼게요!",
    "다빈치 코드는 오름차순으로 진행되는 추리 게임입니다.",
    "다빈치 코드는 일본 도쿄대 수학과 학생과 세계 수학 올림픽 1회 우승자가 제작한 게임입니다.",
  ];
  const boxCount = 4;
  const boxes = Array.from({ length: boxCount }, (_, i) => i);

  const data = { roomNum: { roomnum } };

  useEffect(() => {
    // 자동으로 글자 바꾸는 기능
    const sideRanText = setInterval(() => {
      const RanInex = Math.floor(Math.random() * 22);
      settextBox(texts[RanInex]);
    }, 5000);
    return () => {
      clearInterval(sideRanText);
    };
  });
  useEffect(() => {
    // 링크 설정
    setLink(window.location.href);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      axios.post(Url, data).then((res) => {
        console.log(res.data.ready);
        setUserState(res.data.currUserNum);
        if (res.data.ready) {
          clearInterval(interval); // 게임 시작 시 Interval 해제
          navi(`/game`, { state: { num: roomnum } }); // 게임 페이지로 이동
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
        </div>
        <div className={styles.circle}></div>
        <div className={styles.footer}>
          <span>GameRoom Link</span>
          <div className={styles.footer_content}>
            {message && <span>{message}</span>}
            <div className={styles.Linkdiv}>{link}</div>
          </div>
          <div
            onClick={() => {
              if (link) {
                navigator.clipboard.writeText(link);
                setMessage("Copied!");
                setTimeout(() => {
                  setMessage("");
                }, 5000);
              }
            }}
          >
            <div className={styles.paste_div}></div>
          </div>
        </div>
      </div>
      <div className={styles.sidebar}>
        <p>{textBox}</p>
      </div>
    </div>
  );
};

export default WaitRoom;
