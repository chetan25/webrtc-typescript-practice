import React from "react";
import Button from "@mui/material/Button";
import Avatar from "shared/components/Avatar";
import Typography from "@mui/material/Typography";
import OnlineIndicator from "./OnlineIndicator";
import { chatTypes, getActions } from "store/actions/chatActions";
import { useDispatch } from "react-redux";
import { ChatTypes } from "@/store/store-type";
import { getDirectChatHistory } from "@/rtc/socket";

type FriendsListItemProps = {
  id: string;
  username: string;
  isOnline: boolean;
};
const FriendsListItem = ({ id, username, isOnline }: FriendsListItemProps) => {
  const dispatch = useDispatch();
  const { setChoosenChatDetails } = getActions(dispatch);

  const handlerChooseActiveChat = () => {
    getDirectChatHistory({ connUserId: id });
    setChoosenChatDetails(
      { id, name: username, username },
      chatTypes.DIRECT as ChatTypes
    );
  };

  return (
    <Button
      onClick={handlerChooseActiveChat}
      style={{
        width: "100%",
        height: "42px",
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        textTransform: "none",
        color: "black",
        position: "relative",
      }}
    >
      <Avatar username={username} />
      <Typography
        style={{
          marginLeft: "7px",
          fontWeight: 700,
          color: "#8e9297",
        }}
        variant="subtitle1"
        align="left"
      >
        {username}
      </Typography>
      {isOnline && <OnlineIndicator />}
    </Button>
  );
};

// const mapActionToProps = (dispatch) => {
//   return {
//     ...getActions(dispatch),
//   };
// };

export default FriendsListItem;
