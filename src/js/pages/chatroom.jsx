import React, { useEffect, useState } from "react";
import { shape } from "prop-types";
import styled from "styled-components";
import SendIcon from "../components/SendIcon/SendIcon";
import MessageBubble from "../components/MessageBubble/MessageBubble";

const propTypes = {
  db: shape({}).isRequired,
};

const MainContainer = styled.div`
  width: 70%;
  height: 90vh;
  display: grid;
  background-color: #ffffff;
  grid-template-columns: minmax(600px, auto) 250px;
  grid-template-rows: minmax(600px, auto) 110px;
  grid-template-areas:
    "messages sidebar"
    "textarea sidebar";
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);

  @media screen and (max-width: 1200px) {
    width: 90%;
  }
`;

const MessagesContainer = styled.div`
  grid-area: messages;
  overflow-y: scroll;
  padding: 15px;
`;

const SidebarContainer = styled.div`
  border-left: 1px solid rgba(0, 0, 0, 0.12);
  grid-area: sidebar;
`;

const TextAreaContainer = styled.div`
  padding: 10px;
  grid-area: textarea;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TextInput = styled.textarea`
  height: 100%;
  padding: 10px;
  font-size: 16px;
  flex: 1 1 auto;
  margin-right: 5px;
  font-family: inherit;
  resize: none;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 100%;
  transition: background-color 250ms ease;

  &:hover {
    background-color: #fff;
  }
`;

const UserList = styled.ul`
  list-style-type: none;
`;

const UserItem = styled.li`
  padding: 5px 0;
`;

// TODO: remove this factory and fetch messages to firebase
const messageFactory = (totalReturn = 1) =>
  [...Array(totalReturn)].reduce(
    (prev) =>
      prev.concat({
        by: "User example",
        message:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare risus iaculis purus porttitor, non auctor est consequat. Sed sodales vestibulum velit ac venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ornare risus iaculis purus porttitor, non auctor est consequat. Sed sodales vestibulum velit ac venenatis.",
        hour: "A few minutes ago",
      }),
    [],
  );

const Chatroom = ({ db }) => {
  const [userList, setUserList] = useState([]);
  const [messagesList, setMessagesList] = useState([]);

  useEffect(() => {
    const usersRef = db.collection("users");

    return usersRef.onSnapshot((data) => {
      setUserList(data.docs);
      setMessagesList(messageFactory(25));
    });
  }, [db]);

  return (
    <MainContainer>
      <MessagesContainer>
        {messagesList.map((message, key) => (
          <MessageBubble
            key={key.toString()}
            by={message.by}
            hour={message.hour}
            message={message.message}
            placement={key % 2 === 0 ? "left" : "right"}
          />
        ))}
      </MessagesContainer>
      <SidebarContainer>
        <UserList>
          {userList.map((user) => (
            <UserItem key={user.id}>{user.id}</UserItem>
          ))}
        </UserList>
      </SidebarContainer>
      <TextAreaContainer>
        <TextInput placeholder="Escribe tu mensaje!" />
        <Button>
          <SendIcon />
        </Button>
      </TextAreaContainer>
    </MainContainer>
  );
};

Chatroom.propTypes = propTypes;

export default Chatroom;
