import React, { useState } from "react";
import "../styles/Startpage.css";
import LBcom from "../components/LinkButtonCom";
import NBcom from "../components/NomalButtonCom";
import RuleComponent from "../components/RuleComponent";
import { Link } from "react-router-dom";

const Startpage = () => {
  const [Rulevisible, setRulevisible] = useState(false);
  const toggleVisible = () => {
    setRulevisible((prev) => !prev);
  };
  return (
    <div className="main">
      <div className="content">
        {/* <LBcom
          to="/createRoom"
          title={"Start!"}
          className={"start button"}
        ></LBcom> */}
        <NBcom
          onClick={toggleVisible}
          title={"RULE"}
          className={"RULE button"}
          aName={"astart"}
        ></NBcom>
        {Rulevisible && ( // 초기값 오류때문에 표시값 설정
          <RuleComponent isVisible={Rulevisible} onClose={toggleVisible} />
        )}
        <div className="above box"></div>
        <div className="logobox">
          <div className="logo"></div>
        </div>
        <Link to="/selection">
          <button className="start button">Start!</button>
          <div className="below box"></div>
        </Link>
      </div>
      <span className="footer text">맹&림&손</span>
    </div>
  );
};

export default Startpage;
