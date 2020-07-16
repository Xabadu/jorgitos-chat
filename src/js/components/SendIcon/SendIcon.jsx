import React from "react";
import styled from "styled-components";

const Svg = styled.svg.attrs({
  focusable: false,
  viewBox: "0 0 24 24",
  ariaHidden: true,
})`
  fill: currentColor;
  width: 1em;
  height: 1em;
  display: inline-block;
  font-size: 1.5rem;
  flex-shrink: 0;
  user-select: none;
`;

const SendIcon = () => (
  <Svg>
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </Svg>
);

export default SendIcon;
