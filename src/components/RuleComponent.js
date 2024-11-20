import React from "react";
import "../styles/RuleCom.css";

const RuleComponent = ({ isVisible, onClose }) => {
  if (!isVisible) return null; // isVisible이 false면 렌더링 안 함
  return (
    <div className={`body ${!isVisible ? "visible" : ""}`}>
      <button onClick={onClose} className="Rule-button">
        X
      </button>
    </div>
  );
};

export default RuleComponent;
