import React, { useEffect, useState } from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  max-height: 80%;
  max-width: 900px;
  border: 1px solid tomato;
  display: grid;
  grid-template-columns: minmax(600px, auto) 200px;
  grid-template-rows: minmax(600px, auto) 50px;
  grid-template-areas:
    "messages sidebar"
    "textarea sidebar";
`;

const MessagesContainer = styled.div`
  word-break: break-word;
  overflow-y: scroll;
  max-height: 600px;
  border: 1px solid peru;
  grid-area: messages;
`;

const SidebarContainer = styled.div`
  border: 1px solid hotpink;
  grid-area: sidebar;
`;

const TextAreaContainer = styled.div`
  border: 1px solid papayawhip;
  grid-area: textarea;
  display: grid;
  grid-template-columns: 4fr 1fr;
`;

const TextInput = styled.input`
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 4px;
`;

const UserList = styled.ul`
  border: 1px solid lime;
  list-style-type: none;
`;

const UserItem = styled.li`
  padding: 5px 0;
`;

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
        <UserList>
          {userList.map((user) => (
            <UserItem>{user.id}</UserItem>
          ))}
        </UserList>
      </SidebarContainer>
      <TextAreaContainer>
        <TextInput
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <Button onClick={handleClick}>Enviar</Button>
      </TextAreaContainer>
    </MainContainer>
  );
};

export default Chatroom;
