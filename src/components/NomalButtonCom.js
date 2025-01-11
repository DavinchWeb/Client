import React from "react";
const ButtonComponent = ({ onClick, title, className }) => {
  return (
    <button onClick={onClick} className={className}>
      <p>{title}</p>
    </button>
  );
};

export default ButtonComponent;
