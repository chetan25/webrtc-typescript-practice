import React from "react";
import { Button, Tooltip } from "@mui/material";
import Avatar from "shared/components/Avatar";
import { joinRoom } from "rtc/roomHandler";
import { Room } from "store/store-type";

type ActiveRoomButtomProps = {
  room: Room;
  isUserInRoom: boolean;
};

const ActiveRoomButtom = ({ room, isUserInRoom }: ActiveRoomButtomProps) => {
  const { roomId, createrUserName, participants } = room;
  const amountOfPrticipants = participants!.length;

  const handleJoinActiveRoom = () => {
    if (amountOfPrticipants < 4) {
      joinRoom(roomId);
      // let user join if user < 4
    }
  };

  const activeRoomButtomDisabled = amountOfPrticipants > 3;
  const roomTitle = `Creator: ${createrUserName}. Connected: ${amountOfPrticipants}`;

  return (
    <Tooltip title={roomTitle}>
      <div>
        <Button
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "16px",
            margin: 0,
            padding: 0,
            minWidth: 0,
            marginTop: "10px",
            color: "white",
            backgroundColor: "#5865F2",
          }}
          disabled={activeRoomButtomDisabled || isUserInRoom}
          onClick={handleJoinActiveRoom}
        >
          <Avatar username={createrUserName!} />
        </Button>
      </div>
    </Tooltip>
  );
};

export default ActiveRoomButtom;
