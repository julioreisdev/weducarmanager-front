import { Backdrop, Box, Fade, Modal } from "@mui/material";
import { FC } from "react";
import { TailSpin } from "react-loader-spinner";
import colors from "../utils/colors";
import { StyleToBoxModal } from "./style";

interface ModalProps {
  open: boolean;
}

const PageLoading: FC<ModalProps> = ({ open }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={StyleToBoxModal}>
          {" "}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <TailSpin width={60} height={60} color={colors.main} />
            <h4 style={{ marginBottom: "1rem" }}>Carregando!</h4>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default PageLoading;
