import React from "react";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <div>
      <h2>Welcome</h2>
      <Link to="/users">Click to go to users</Link>
      <Link to="/customHookUsers">Click to go to CustomHook users</Link>
    </div>
  );
};

export default Landing;
