import React from "react";

import "./Button.scss";

import classNames from "classnames";

export default function Button(props) {
  // import classnames this will take classname as arg. the 2nd arg is an object
  // with keys of classname. this depends on the value of keys
  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger,
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
