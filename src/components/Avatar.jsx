import React from "react";

const Avatar = (props) => {
  return (
    <div style={{ width: "100%", backgroundColor: "rebeccapurple" }}>
      {props.children}
    </div>
  );
};

export default Avatar;
