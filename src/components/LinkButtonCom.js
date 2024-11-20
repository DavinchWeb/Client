import React from "react";
import { Link } from "react-router-dom";
const ButtonComponent = ({ onClick, title, to }) => {
  return (
    <Link to={to}>
      <button onClick={onClick} className="button">
        {title}
      </button>
    </Link>
  );
};

export default ButtonComponent;
