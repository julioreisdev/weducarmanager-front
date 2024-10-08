import { FC, useState } from "react";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import colors from "../../utils/colors";
import { FlexRowCenterBet, SectionSubTitle } from "../../components/style";
import { LoadingButton } from "@mui/lab";
interface IProps {
  open: boolean;
  onClose: () => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: window.innerWidth <= 720 ? "90%" : 350,
  bgcolor: "background.paper",
  border: `2px solid ${colors.main}`,
  borderRadius: "8px",
  boxShadow: 24,
  padding: "1rem",
};

const OpenLetiveYearModal: FC<IProps> = ({ open, onClose }) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <SectionSubTitle style={{ marginBottom: "1rem" }}>
            Abrir ano letivo
          </SectionSubTitle>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <FlexRowCenterBet style={{ marginBottom: "1rem" }}>
              <input
                style={{
                  padding: "0.3rem",
                  border: `1px solid ${colors.main}`,
                  color: colors.main,
                  outline: "none",
                  borderRadius: "3px",
                }}
                required
                type="date"
                value={start}
                onChange={(e) => setStart(e.target.value)}
              />

              <h5 style={{ color: colors.main }}>Até</h5>

              <input
                style={{
                  padding: "0.3rem",
                  border: `1px solid ${colors.main}`,
                  color: colors.main,
                  outline: "none",
                  borderRadius: "3px",
                }}
                required
                type="date"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
              />
            </FlexRowCenterBet>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <LoadingButton
                type="submit"
                size="small"
                disabled={!start || !end}
                variant="contained"
                sx={{
                  backgroundColor: colors.main,
                }}
              >
                Salvar
              </LoadingButton>
            </div>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default OpenLetiveYearModal;
