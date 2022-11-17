import React, { useState } from "react";
import { Tooltip, Typography, Box } from "@mui/material";
import Avatar from "shared/components/Avatar";
import InvitationDecisionButtons from "./InvitationDecisionButtons";
import { useDispatch } from "react-redux";
import { getAction } from "store/actions/friends";

type PendingInvitationsListItemProps = {
  id: string;
  username: string;
  email: string;
};
const PendingInvitationsListItem = ({
  id,
  username,
  email,
}: PendingInvitationsListItemProps) => {
  const dispatch = useDispatch();
  const { acceptFriendInvitation, rejectFriendInvitation } =
    getAction(dispatch);

  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  const handleAcceptInvitation = () => {
    acceptFriendInvitation({ id });
    setButtonsDisabled(true);
  };

  const handleRejectInvitation = () => {
    rejectFriendInvitation({ id });
    setButtonsDisabled(true);
  };

  return (
    <Tooltip title={email}>
      <div style={{ width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            height: "42px",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Avatar username={username} />
          <Typography
            sx={{
              marginLeft: "7px",
              fontWeight: 700,
              color: "#8e9297",
              flexGrow: 1,
            }}
            variant="subtitle1"
          >
            {username}
          </Typography>
          <InvitationDecisionButtons
            disabled={buttonsDisabled}
            acceptInvitationHandler={handleAcceptInvitation}
            rejectInvitationHandler={handleRejectInvitation}
          />
        </Box>
      </div>
    </Tooltip>
  );
};

// const mapActionsToProps = (dispatch) => {
//   return {
//     ...getAction(dispatch),
//   };
// };

export default PendingInvitationsListItem;
