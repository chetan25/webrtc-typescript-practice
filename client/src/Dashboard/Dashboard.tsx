import React, { useEffect } from "react";
import { styled } from "@mui/system";
import SideBar from "./SideBar/SideBar";
import FriendsSideBar from "./FriendsSideBar/FriendsSideBar";
import Messenger from "./Messenger/Messenger";
import AppBar from "./AppBar/AppBar";
import { logout } from "shared/utils/auth";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { getActions } from "store/actions/authActions";
import { connectSocket } from "rtc/socket";
import Room from "./Room/Room";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
});

const Dashboard = () => {
  const isUserInRoom = useSelector(
    (state: any) => state.room.isUserInRoom,
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const userDetails = localStorage.getItem("user");

    if (!userDetails) {
      logout();
    } else {
      getActions(dispatch).setUserDetails(JSON.parse(userDetails));
      // setUserDetails(JSON.parse(userDetails));
      // connect to socket
      connectSocket(JSON.parse(userDetails));
    }
  }, [dispatch]);

  console.log({ isUserInRoom });
  return (
    <Wrapper>
      <SideBar />
      <FriendsSideBar />
      <Messenger />
      <AppBar />
      {isUserInRoom && <Room />}
    </Wrapper>
  );
};

// const mapActionsToProps = (dispatch) => {
//   return {
//     ...getActions(dispatch),
//   };
// };

// const mapStoreStateToProps = ({ room }) => {
//   return {
//     ...room,
//   };
// };

export default Dashboard;
// export default connect(mapStoreStateToProps, mapActionsToProps)(Dashboard);
