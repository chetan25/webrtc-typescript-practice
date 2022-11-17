import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "store/store-type";

const ChoosenOption = () => {
  const { name } = useSelector(
    (state: AppState) => state.chat.choosenChatDetails!
  );

  return (
    <Typography sx={{ fontSize: "16px", color: "white", fontWeight: "bold" }}>
      {`${name ? `Conversation with: ${name}` : ""}`}
    </Typography>
  );
};

// const mapStoreStateToProps = (state) => {
//   return {
//     name: state.chat.choosenChatDetails?.name,
//   };
// };

export default ChoosenOption;
