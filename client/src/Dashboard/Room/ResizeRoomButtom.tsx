import { styled } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import CloseFullScreenIcon from "@mui/icons-material/CloseFullscreen";
import OpenFullScreenIcon from "@mui/icons-material/OpenInFull";

const MainContainer = styled("div")({
  position: "absolute",
  bottom: "10px",
  right: "10px",
});

const ResizeRoomButtom = ({
  isRoomMinimize,
  handleRoomResize,
}: {
  isRoomMinimize: boolean;
  handleRoomResize: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <MainContainer>
      <IconButton style={{ color: "white" }} onClick={handleRoomResize}>
        {isRoomMinimize ? <OpenFullScreenIcon /> : <CloseFullScreenIcon />}
      </IconButton>
    </MainContainer>
  );
};

export default ResizeRoomButtom;
