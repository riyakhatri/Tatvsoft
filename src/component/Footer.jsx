import React from "react";
import tatvfoft from "../assets/images/tatvasoft.png";

function Footer() {
  return (
    <div
      style={{
        backgroundColor: "whitesmoke",
        marginTop: 50,
        height: 200,
        justifyContent: "center",
      }}
    >
      <div align="center">
        <img src={tatvfoft} id="footer" />
      </div>
    </div>
  );
}

export default Footer;
