import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { styled } from "@mui/system";
import MainPageButton from "./MainPageButton";
import CreateRoomButton from "./CreateRoomButton";
import ActiveRoomButtom from "./ActiveRoomButtom";
import { Room } from "store/store-type";

const MainContainer = styled("div")({
  width: "72px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#202225",
});

const SideBar = () => {
  const activeRooms = useSelector(
    (state: any) => state.room.activeRooms,
    shallowEqual
  );

  const isUserInRoom = useSelector(
    (state: any) => state.room.isUserInRoom,
    shallowEqual
  );

  return (
    <MainContainer>
      <MainPageButton />
      <CreateRoomButton isUserInRoom={isUserInRoom} />
      {activeRooms.map((room: Room, index: number) => {
        return (
          <ActiveRoomButtom
            key={`${room.roomId}-${index}`}
            room={room}
            isUserInRoom={isUserInRoom}
          />
        );
      })}
    </MainContainer>
  );
};

// const mapStoreStateToProps = ({ room }) => {
//   return {
//     ...room,
//   };
// };
export default SideBar;
