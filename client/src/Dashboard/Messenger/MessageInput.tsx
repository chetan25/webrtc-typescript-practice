import React, { useState } from "react";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import { sendDirectMessage } from "rtc/socket";
import { AppState } from "store/store-type";

const MainContainer = styled("div")({
  height: "60px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Input = styled("input")({
  backgroundColor: "#2f3136",
  width: "98%",
  height: "44px",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  padding: "0 10px",
});

const NewMessageInput = () => {
  const { choosenChatDetails } = useSelector((state: AppState) => state.chat);
  const [message, setMessage] = useState("");

  const handleMessageValueChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setMessage(event.target.value);
  };

  const handleKeyPressed: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message.length > 0) {
      sendDirectMessage({
        receiverUserId: choosenChatDetails?.id!,
        content: message,
      });
      setMessage("");
    }
  };

  return (
    <MainContainer>
      <Input
        placeholder={`Write message to ${choosenChatDetails?.name}`}
        value={message}
        onChange={handleMessageValueChange}
        onKeyDown={handleKeyPressed}
      />
    </MainContainer>
  );
};

// const mapStoreStateToProps = ({ chat }) => {
//   return {
//     ...chat,
//   };
// };

export default NewMessageInput;
