import React from "react";
import { styled } from "@mui/system";
import PendingInvitationsListItem from "./PendingInvitationsListItem";
import { useSelector } from "react-redux";
import { Invitation, AppState } from "store/store-type";

const MainContainer = styled("div")({
  width: "100%",
  height: "22%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "auto",
});

const PendingInvitationsList = () => {
  const { pendingInvitations } = useSelector(
    (state: AppState) => state.friends
  );

  return (
    <MainContainer>
      {pendingInvitations
        ? pendingInvitations.map((invitation: Invitation) => (
            <PendingInvitationsListItem
              key={invitation._id}
              id={invitation._id}
              username={invitation.senderId.username}
              email={invitation.senderId.email}
            />
          ))
        : null}
    </MainContainer>
  );
};

// const mapStoreStateToProps = ({ friends }) => {
//   console.log({ friends });
//   return {
//     ...friends,
//   };
// };

export default PendingInvitationsList;
