import React from "react";
import { styled } from "@mui/system";
import FriendsListItem from "./FriendsListItem";
import { useSelector } from "react-redux";
import { Friend, AppState, OnlineUser } from "store/store-type";

const MainContainer = styled("div")({
  flexGrow: 1,
  width: "100%",
});

const FriendsList = () => {
  const { friends, onlineUsers } = useSelector(
    (state: AppState) => state.friends
  );

  const checkOnline = (friends: Friend[], onlineUsers: OnlineUser[]) => {
    friends.forEach((f) => {
      const isUserOnline = onlineUsers.find((user) => user.userId === f.id);

      f.isOnline = isUserOnline ? true : false;
    });

    return friends;
  };

  return (
    <MainContainer>
      {checkOnline(friends, onlineUsers).map((f) => (
        <FriendsListItem
          username={f.username}
          id={f.id}
          key={f.id}
          isOnline={f.isOnline}
        />
      ))}
    </MainContainer>
  );
};

// const mapStateToProps = ({ friends }) => {
//   return {
//     ...friends,
//   };
// };

export default FriendsList;
