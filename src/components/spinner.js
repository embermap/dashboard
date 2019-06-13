import React from "react";
import "./spinner.css";

export default function Spinner() {
  return (
    <span className="lds-ellipsis">
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}
