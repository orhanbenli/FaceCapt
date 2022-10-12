import React from "react";
import Tilt from "react-parallax-tilt";
import face from "./face.png";
import "./Logo.css";

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 55 }}
        style={{ height: 150, width: 150 }}
      >
        <div>
          <h1>
            <img
              style={{ paddingTop: "25px" }}
              src={face}
              alt="face"
              height={100}
              width={100}
            />
          </h1>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
