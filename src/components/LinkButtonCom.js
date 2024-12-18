import React from "react";
import { Link } from "react-router-dom";
const ButtonComponent = ({ onClick, title, to, className }) => {
  return (
    <Link to={to}>
      <button onClick={onClick} className={className}>
        {title}
      </button>
    </Link>
  );
};

export default ButtonComponent;
