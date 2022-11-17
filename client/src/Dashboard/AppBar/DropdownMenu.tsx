import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { logout } from "shared/utils/auth";
import { useDispatch, useSelector } from "react-redux";
import { getActions } from "store/actions/roomAction";
import { AppState } from "store/store-type";

function BasicMenu() {
  const dispatch = useDispatch();
  const { setAudioOnly } = getActions(dispatch);
  const { audioOnly } = useSelector((state: AppState) => state.room);

  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAudioOnly = () => {
    setAudioOnly(!audioOnly);
  };

  return (
    <div>
      <IconButton onClick={handleMenuOpen} style={{ color: "white" }}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={logout}>Logout</MenuItem>
        <MenuItem onClick={handleAudioOnly}>
          {audioOnly ? "Audio Only Enabled" : "Audio only disabled"}
        </MenuItem>
      </Menu>
    </div>
  );
}

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

export default BasicMenu;
