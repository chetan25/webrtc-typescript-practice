import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { createNewRoom } from "rtc/roomHandler";

const CreateRoomButton = ({ isUserInRoom }: { isUserInRoom: boolean }) => {
  const createNewRoomHnadler = () => {
    // create room and send info to server
    createNewRoom();
  };

  return (
    <Button
      disabled={isUserInRoom}
      onClick={createNewRoomHnadler}
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
    >
      <AddIcon />
    </Button>
  );
};

export default CreateRoomButton;
