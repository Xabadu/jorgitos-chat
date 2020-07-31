import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled, { ThemeProvider } from "styled-components";
import { format } from "date-fns";

const appBackground = styled.div`
  background: rgba(250, 250, 250, 0.9);
`;

const MainContainer = styled.div`
  max-height: 80%;
  height: 800px;
  max-width: 900px;
  border: 1px solid tomato;
  display: grid;
  grid-template-columns: minmax(600px, auto) 200px;
  grid-template-rows: minmax(600px, auto) 50px;
  grid-template-areas:
    "messages sidebar"
    "textarea sidebar";
  border: 2px solid hotpink;
  box-sizing: border-box;
`;

const MessagesContainer = styled(appBackground)`
  word-break: break-word;
  overflow-y: scroll;
  border-bottom: 1px solid hotpink;
  grid-area: messages;
  padding: 0 0.5em;
`;

const SidebarContainer = styled(appBackground)`
  border-left: 1px solid hotpink;
  grid-area: sidebar;
  height: 100%;
  overflow-y: scroll;
`;

const TextAreaContainer = styled.div`
  grid-area: textarea;
  display: grid;
  grid-template-columns: 4fr 1fr;
`;

const TextInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: none;
  outline: none;
  margin-bottom: 0;
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 0px;
  color: white;
  border: none;
  transition: 0.3s all ease-in-out;
  background-color: ${(props) => props.theme.backgroundColor};
  border-radius: 0;
  font-size: 16px;
  width: 140px;
  z-index: 10px;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.highlight};
    background-position-x: calc(140px - 50px);
  }

  &:focus {
    background-color: ${(props) => props.theme.highlight};
    background-position-x: -70px;
    box-shadow: 0 0 5px #ff69f488;
  }
`;

const UserList = styled.ul`
  list-style-type: none;
  padding-inline-start: 0;
`;

const UserItem = styled.li`
  padding: 0.5em 0;
  &::before {
    content: "⚡️";
    margin: 0 10px;
  }
  &.offline {
    &::before {
      content: "😴";
      margin: 0 10px;
    }
  }
  &.afk {
    &::before {
      content: "😴";
      margin: 0 10px;
    }
  }
`;

const UserButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
`;

const theme = {
  backgroundColor: "hotpink",
  highlight: "deeppink",
  secondary: "hotpink",
  secondaryHighlight: "deeppink",
};

Button.defaultProps = {
  theme: {
    backgroundColor: "tomato",
    highlight: "coral",
    secondary: "lime",
    secondaryHighlight: "lawngreen",
  },
};
UserList.defaultProps = {
  theme: {
    backgroundColor: "tomato",
    highlight: "coral",
    secondary: "lime",
    secondaryHighlight: "lawngreen",
  },
};

const MessageText = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
  padding: 10px 5px;
  border: 1px solid hotpink;
  border-radius: 4px;
`;

const MessageUser = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  span {
    font-weight: normal;
    font-size: 12px;
  }
`;

const MessageContent = styled.div``;

const Chatroom = ({ db }) => {
  const [userList, setUserList] = useState([]);
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const messageContainer = document.querySelector(
    ".chatroom-message-container"
  );

  const playZumbido = () => {
    const audioCtx = new window.AudioContext();
    const audioElement = document.querySelector("audio");

    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    audioElement.play();
    const mainContainer = document.querySelector(".chatroom-main-container");
    mainContainer.classList.add("shake");
    setTimeout(() => {
      mainContainer.classList.remove("shake");
    }, 1000);
  };

  useEffect(() => {
    const usersRef = db.collection("users");

    return usersRef.onSnapshot((data) => {
      setUserList(data.docs);
    });
  }, []);

  useEffect(() => {
    const messagesRef = db.collection("messages");

    return messagesRef.orderBy("datetime").onSnapshot((data) => {
      setMessagesList(data.docs);
      if (messageContainer && messageContainer.scrollHeight) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }
    });
  }, [messageContainer]);

  useEffect(() => {
    const zumbidosRef = db.collection("zumbidos");

    return zumbidosRef.where("played", "<", 1).onSnapshot((data) => {
      if (data.docs) {
        data.docs.forEach((doc) => {
          if (doc.data().to === localStorage.getItem("username")) {
            playZumbido();
            db.collection("zumbidos").doc(doc.id).set(
              {
                played: 1,
              },
              { merge: true }
            );
          }
        });
      }
    });
  });

  const handleClick = () => {
    if (message.trim() !== "") {
      db.collection("messages")
        .add({
          user: localStorage.getItem("username"),
          message,
          datetime: new Date(),
        })
        .then(() => {
          setMessage("");
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  const sendZumbido = (user) => {
    db.collection("zumbidos").add({
      to: user,
      played: 0,
    });
  };

  return (
    <MainContainer className="chatroom-main-container">
      <MessagesContainer className="chatroom-message-container">
        {messagesList
          .filter((msg) => msg.data().user !== null)
          .map((msg) => (
            <MessageText
              key={`${msg.data().user}-${msg.data().datetime.nanoseconds}`}
            >
              <MessageUser>
                {msg.data().user}{" "}
                <span>
                  {format(
                    msg.data().datetime.toDate(),
                    "d MMM yyyy hh:mm aaaa"
                  )}
                </span>
              </MessageUser>
              <MessageContent>{msg.data().message}</MessageContent>
            </MessageText>
          ))}
      </MessagesContainer>
      <SidebarContainer>
        <ThemeProvider theme={theme}>
          <UserList>
            {userList.map((user) => (
              <UserItem key={user.id}>
                <UserButton onClick={() => sendZumbido(user.id)}>
                  {user.id}
                </UserButton>
              </UserItem>
            ))}
          </UserList>
        </ThemeProvider>
      </SidebarContainer>
      <TextAreaContainer>
        <TextInput
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
          value={message}
        />
        <ThemeProvider theme={theme}>
          <Button onClick={handleClick}>Enviar</Button>
        </ThemeProvider>
      </TextAreaContainer>
    </MainContainer>
  );
};

Chatroom.propTypes = {
  db: PropTypes.shape({
    collection: PropTypes.func.isRequired,
  }).isRequired,
};

export default Chatroom;
