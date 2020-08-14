import React from "react";
import styled from "styled-components";

const PreviewWrapper = styled.div`
  border: 1px solid tomato;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 15px 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

const StyledButton = styled.button`
  margin: 0 15px;
  padding: 5px 15px;
  border-radius: 4px;
  border: 1px solid #2d2d2d;
  color: #f2f2f2;
  cursor: pointer;
`;

const StyledShuffleButton = styled(StyledButton)`
  background: purple;
`;

const StyledCancelButton = styled(StyledButton)`
  background: darkred;
`;

const StyledSendButton = styled(StyledButton)`
  background: green;
`;

const PreviewImage = styled.img``;

const Preview = (props) => {
  const { onPressCancel, onPressShuffle, onPressSend, src } = props;
  return (
    <PreviewWrapper>
      <PreviewImage src={src} />
      <ButtonWrapper>
        <StyledShuffleButton onClick={onPressShuffle}>
          Shuffle
        </StyledShuffleButton>
        <StyledCancelButton onClick={onPressCancel}>Cancel</StyledCancelButton>
        <StyledSendButton onClick={onPressSend}>Send</StyledSendButton>
      </ButtonWrapper>
    </PreviewWrapper>
  );
};

export default Preview;
