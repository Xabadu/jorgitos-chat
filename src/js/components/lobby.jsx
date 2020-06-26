import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  margin: auto;
  border: 1px solid #2d2d2d;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  padding: 150px 25px;
`;

const StyledIcon = styled.div`
  font-size: 128px;
  margin-bottom: 15px;
`;

const StyledInput = styled.input`
  width: 350px;
  padding: 15px;
  margin-bottom: 30px;
`;

const StyledButton = styled.button`
  border: 1px tomato;
  background: tomato;
  color: white;
  padding: 15px;
  width: 200px;

  &:hover {
    cursor: pointer;
  }
`;

const StyledUserCount = styled.p``;

const StyledError = styled.div`
  background: peru;
  border: peru;
  color: white;
  padding: 10px;
  width: 90%;
`;

const Lobby = ({ db }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState();

  const history = useHistory();

  const handleClick = () => {
    if (username.trim() !== "") {
      setError("");
      const docRef = db.collection("users").doc(username);

      docRef.get().then((doc) => {
        // TODO: Validacion del ultimo "login" del usuario.
        if (doc.exists) {
          setError("El usuario ya existe, por favor ingresa otro");
        } else {
          docRef.set({}).then(() => {
            history.push("/chatroom");
          });
        }
      });
    }
  };

  const onChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <>
      <MainContainer>
        {error && <StyledError>{error}</StyledError>}
        <StyledIcon>
          <span role="img" aria-label="icon">
            😬
          </span>
        </StyledIcon>
        <StyledInput
          type="text"
          placeholder="Username"
          onChange={onChange}
          value={username}
        />
        <StyledButton onClick={handleClick}>Ingresar</StyledButton>
        <StyledUserCount>15 usuarios estan ahora en el chat</StyledUserCount>
      </MainContainer>
    </>
  );
};

Lobby.propTypes = {
  db: PropTypes.shape({
    collection: PropTypes.func,
  }).isRequired,
};

export default Lobby;
