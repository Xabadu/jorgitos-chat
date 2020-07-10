import React, { useEffect, useState } from "react";
import styled from "styled-components";

const MainContainer = styled.div`
  border: 1px solid tomato;
  display: grid;
  grid-template-columns: minmax(600px, auto) 200px;
  grid-template-rows: minmax(600px, auto) 50px;
  grid-template-areas:
    "messages sidebar"
    "textarea sidebar";
`;

const MessagesContainer = styled.div`
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

const Chatroom = ({ db }) => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const usersRef = db.collection("users");

    return usersRef.onSnapshot((data) => {
      setUserList(data.docs);
    });
  }, []);

  return (
    <MainContainer>
      <MessagesContainer>Los mensajes</MessagesContainer>
      <SidebarContainer>
        <UserList>
          {userList.map((user) => (
            <UserItem>{user.id}</UserItem>
          ))}
        </UserList>
      </SidebarContainer>
      <TextAreaContainer>
        <TextInput />
        <Button>Enviar</Button>
      </TextAreaContainer>
    </MainContainer>
  );
};

export default Chatroom;
