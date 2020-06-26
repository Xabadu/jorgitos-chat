import React from "react";
import { Link } from "react-router-dom";

const Lobby = () => {
  return (
    <>
      <p>Este es el Lobby!</p>
      <Link to="/chatroom">Ir al Chatroom</Link>
    </>
  );
};

export default Lobby;
