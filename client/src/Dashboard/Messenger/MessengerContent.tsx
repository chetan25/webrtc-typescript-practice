import React, { useEffect } from "react";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";
import Avatar from "shared/components/Avatar";
import MessageInput from "./MessageInput";
import { Message, ChatDetails } from "store/store-type";

const MessengerContentWrapper = styled("div")({
  flexGrow: 1,
});

const MessagesWrapper = styled("div")({
  height: "calc(100% - 60px)",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const MessagesHeaderWrapper = styled("div")({
  width: "98%",
  display: "column",
  marginTop: "10px",
});

const MainContainer = styled("div")({
  width: "97%",
  display: "flex",
  marginTop: "10px",
});

const AvatarContainer = styled("div")({
  width: "70px",
});

const MessageContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const MessageContent = styled("div")({
  color: "#DCDDDE",
});

const SameAuthorMessageContent = styled("div")({
  color: "#DCDDDE",
  width: "97%",
});

const SameAuthorMessageText = styled("span")({
  marginLeft: "70px",
});

const UserMessage = ({ message }: { message: Message }) => {
  console.log({ message });
  const {
    content,
    sameAuthor,
    author: { username },
    date,
    sameDay,
  } = message;

  if (sameAuthor && sameDay) {
    return (
      <SameAuthorMessageContent>
        <SameAuthorMessageText>{content}</SameAuthorMessageText>
      </SameAuthorMessageContent>
    );
  }

  return (
    <MainContainer>
      <AvatarContainer>
        <Avatar username={username} />
      </AvatarContainer>
      <MessageContainer>
        <Typography style={{ fontSize: "16px", color: "white" }}>
          {username}{" "}
          <span style={{ fontSize: "12px", color: "#72767d" }}>{date}</span>
        </Typography>
        <MessageContent>{content}</MessageContent>
      </MessageContainer>
    </MainContainer>
  );
};

const MessagesHeader = ({ name = "" }) => {
  return (
    <MessagesHeaderWrapper>
      <Avatar large username={name} />
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "white",
          marginLeft: "5px",
          marginRight: "5px",
        }}
      >
        {name}
      </Typography>
      <Typography
        sx={{
          color: "white",
          marginLeft: "5px",
          marginRight: "5px",
        }}
      >
        {`This is the begining of conversation with ${name}`}
      </Typography>
    </MessagesHeaderWrapper>
  );
};

const Messages = ({
  choosenChatDetails,
  messages,
}: {
  choosenChatDetails: ChatDetails;
  messages: Message[];
}) => {
  console.log("chatMessages", messages);
  return (
    <MessagesWrapper>
      {choosenChatDetails?.name ? (
        <MessagesHeader name={choosenChatDetails?.name} />
      ) : null}
      {messages.map((message) => {
        return <UserMessage message={message} key={message._id} />;
      })}
    </MessagesWrapper>
  );
};

const MessengerContent = ({
  choosenChatDetails,
  messages,
}: {
  choosenChatDetails: ChatDetails;
  messages: Message[];
}) => {
  useEffect(() => {}, []);

  return (
    <MessengerContentWrapper>
      <Messages choosenChatDetails={choosenChatDetails} messages={messages} />
      <MessageInput />
    </MessengerContentWrapper>
  );
};

export default MessengerContent;
