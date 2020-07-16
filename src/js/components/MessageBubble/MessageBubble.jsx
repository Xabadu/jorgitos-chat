import React from "react";
import { string, oneOf } from "prop-types";
import styled from "styled-components";

const propTypes = {
  by: string.isRequired,
  hour: string.isRequired,
  message: string.isRequired,
  placement: oneOf(["left", "right"]).isRequired,
};

const Hour = styled.p`
  font-size: 12px;
  color: #616161;
`;

const Bubble = styled.div`
  margin: auto;
  padding: 12px;
  max-width: 80%;
  font-size: 14px;
  position: relative;
  border-radius: 5px;
  margin-bottom: 20px;
  ${(props) => `
    margin-${props.placement}: 15px;
    border-top-${props.placement}-radius: 0px;
    background-color: ${props.placement === "right" ? "#f5f5f5" : "#bbdefb"};
  `}

  div {
    display: flex;
    margin-bottom: 5px;
    justify-content: space-between;
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  &:after {
    content: "";
    top: 0;
    position: absolute;
    border: 15px solid transparent;
    ${(props) => `
      border-top: 0;
      ${props.placement}: 0;
      border-${props.placement}: 0;
      margin-${props.placement}: -15px;
      ${
        props.placement === "right"
          ? "border-left-color: #f5f5f5"
          : "border-right-color: #bbdefb"
      }
    `}
  }
`;

const MessageBubble = ({ by, hour, message, placement }) => (
  <Bubble placement={placement}>
    {placement === "left" && (
      <div>
        <p>
          <strong>{by}</strong>
        </p>
        <Hour>{hour}</Hour>
      </div>
    )}
    <p>{message}</p>
  </Bubble>
);

MessageBubble.propTypes = propTypes;

export default MessageBubble;
