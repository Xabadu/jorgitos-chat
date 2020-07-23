import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";

const appBackground = styled.div`
  background: rgba(250, 250, 250, 0.9);
`;

const MainContainer = styled.div`
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
  border-bottom: 1px solid hotpink;
  grid-area: messages;
  padding: 0 0.5em;
`;

const SidebarContainer = styled(appBackground)`
  border-left: 1px solid hotpink;
  grid-area: sidebar;
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
  margin-bottom: 1px;
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
  &:hover {
    background-color: ${(props) => props.theme.highlight};
    background-position-x: 120px;
  }
  ,
  &:focus {
    background-color: ${(props) => props.theme.highlight};
    background-position-x: -70px;
  }
`;

const UserList = styled.ul`
  border-bottom: 1px solid ${(props) => props.theme.secondary};
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

const MessageText = styled.p``;

const Chatroom = ({ db }) => {
  const [userList, setUserList] = useState([]);
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);

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
    });
  }, []);

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
        .catch(() => {});
    }
  };

  return (
    <MainContainer>
      <MessagesContainer>
        {messagesList.map((message) => (
          <MessageText>
            {message.data().user}: {message.data().message} -{" "}
            {message.data().datetime.toDate().toString()}
          </MessageText>
        ))}
      </MessagesContainer>
      <SidebarContainer>
        <ThemeProvider theme={theme}>
          <UserList>
            {userList.map((user) => (
              <UserItem>{user.id}</UserItem>
            ))}
          </UserList>
        </ThemeProvider>
      </SidebarContainer>
      <TextAreaContainer>
        <TextInput
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <ThemeProvider theme={theme}>
          <Button onClick={handleClick}>Enviar</Button>
        </ThemeProvider>
      </TextAreaContainer>
    </MainContainer>
  );
};

export default Chatroom;
