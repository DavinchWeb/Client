import React, { useState } from "react";
import "../styles/Startpage.css";
import LBcom from "../components/LinkButtonCom";
import NBcom from "../components/NomalButtonCom";
import RuleComponent from "../components/RuleComponent";

const Startpage = () => {
  const [Rulevisible, setRulevisible] = useState(false);
  const toggleVisible = () => {
    setRulevisible((prev) => !prev);
  };
  return (
    <div className="main">
      <div className="content">
        <h1 className="title">Davinch Code</h1> <br></br>
        <h1 className="title">Game</h1>
        <LBcom to="/createRoom" title={"Start!"}></LBcom>
        <NBcom onClick={toggleVisible} title={"RULE"}></NBcom>
        {Rulevisible && ( // 초기값 오류때문에 표시값 설정
          <RuleComponent isVisible={Rulevisible} onClose={toggleVisible} />
        )}
      </div>
      <span className="footer text">맹&림&손</span>
    </div>
  );
};

export default Startpage;
