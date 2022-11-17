import React from "react";
import { styled } from "@mui/system";
import { shallowEqual, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import MessengerContent from "./MessengerContent";

const MainContainer = styled("div")({
  flexGrow: 1,
  backgroundColor: "#36393f",
  marginTop: "48px",
  display: "flex",
});

const WelcomeMessageContainer = styled("div")({
  flexGrow: 1,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const WelcomeMessage = () => {
  return (
    <WelcomeMessageContainer>
      <Typography variant="h6" sx={{ color: "white" }}>
        To start chatting choose the user
      </Typography>
    </WelcomeMessageContainer>
  );
};

const Messenger = () => {
  const choosenChatDetails = useSelector(
    (state: any) => state.chat.choosenChatDetails,
    shallowEqual
  );

  const messages = useSelector(
    (state: any) => state.chat.messages,
    shallowEqual
  );

  return (
    <MainContainer>
      {!choosenChatDetails ? (
        <WelcomeMessage />
      ) : (
        <MessengerContent
          choosenChatDetails={choosenChatDetails}
          messages={messages}
        />
      )}
    </MainContainer>
  );
};

// const mapStateToProps = ({ chat }) => {
//   return {
//     ...chat,
//   };
// };

export default Messenger;
