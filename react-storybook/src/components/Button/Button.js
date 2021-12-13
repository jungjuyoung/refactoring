import React from "react";
import "./Button.css";

const Button = ({ children, ...restArg }) => {
  return (
    <button className="button" {...restArg}>
      {children}
    </button>
  );
};

export default Button;
