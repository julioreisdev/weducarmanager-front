import { FC, useState } from "react";
import { Backdrop, Box, Fade, Modal } from "@mui/material";
import colors from "../../utils/colors";
import { FlexRowCenterBet, SectionSubTitle } from "../../components/style";
import { LoadingButton } from "@mui/lab";
import { Tag, TagContainer } from "../home/DayDetailsModal";
import { TagType } from "../../interfaces/calendar.interface";
import Icons from "../../utils/icons";
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

const ConfigDays: FC<IProps> = ({ open, onClose }) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [tag, setTag] = useState<TagType>(TagType.school_day);
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
            Personalizar calendário
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

            <div>
              <TagContainer
                onClick={() => {
                  setTag(TagType.formations_and_plans);
                }}
              >
                {tag === TagType.formations_and_plans ? (
                  <Icons.CheckBoxIcon
                    sx={{ fontSize: "1.9rem", color: colors.main }}
                  />
                ) : (
                  <Icons.CheckBoxOutlineBlankIcon
                    sx={{ fontSize: "1.9rem", color: colors.main }}
                  />
                )}
                <Tag color={colors.blue}>
                  <h5>FORMAÇÕES E PLANEJAMENTOS</h5>
                </Tag>
              </TagContainer>
              <TagContainer
                onClick={() => {
                  setTag(TagType.school_day);
                }}
              >
                {tag === TagType.school_day ? (
                  <Icons.CheckBoxIcon
                    sx={{ fontSize: "1.9rem", color: colors.main }}
                  />
                ) : (
                  <Icons.CheckBoxOutlineBlankIcon
                    sx={{ fontSize: "1.9rem", color: colors.main }}
                  />
                )}
                <Tag color={colors.green}>
                  <h5>DIA LETIVO</h5>
                </Tag>
              </TagContainer>
              <TagContainer
                onClick={() => {
                  setTag(TagType.school_saturday);
                }}
              >
                {tag === TagType.school_saturday ? (
                  <Icons.CheckBoxIcon
                    sx={{ fontSize: "1.9rem", color: colors.main }}
                  />
                ) : (
                  <Icons.CheckBoxOutlineBlankIcon
                    sx={{ fontSize: "1.9rem", color: colors.main }}
                  />
                )}
                <Tag color={colors.green}>
                  <h5>SÁBADO LETIVO</h5>
                </Tag>
              </TagContainer>
              <TagContainer
                onClick={() => {
                  setTag(TagType.assessments);
                }}
              >
                {tag === TagType.assessments ? (
                  <Icons.CheckBoxIcon
                    sx={{ fontSize: "1.9rem", color: colors.main }}
                  />
                ) : (
                  <Icons.CheckBoxOutlineBlankIcon
                    sx={{ fontSize: "1.9rem", color: colors.main }}
                  />
                )}
                <Tag color={colors.orange}>
                  <h5>AVALIAÇÕES</h5>
                </Tag>
              </TagContainer>
              <TagContainer
                onClick={() => {
                  setTag(TagType.remedial_classes);
                }}
              >
                {tag === TagType.remedial_classes ? (
                  <Icons.CheckBoxIcon
                    sx={{ fontSize: "1.9rem", color: colors.main }}
                  />
                ) : (
                  <Icons.CheckBoxOutlineBlankIcon
                    sx={{ fontSize: "1.9rem", color: colors.main }}
                  />
                )}
                <Tag color={colors.orange}>
                  <h5>RECUPERAÇÕES</h5>
                </Tag>
              </TagContainer>
              <TagContainer
                onClick={() => {
                  setTag(TagType.holidays);
                }}
              >
                {tag === TagType.holidays ? (
                  <Icons.CheckBoxIcon
                    sx={{ fontSize: "1.9rem", color: colors.main }}
                  />
                ) : (
                  <Icons.CheckBoxOutlineBlankIcon
                    sx={{ fontSize: "1.9rem", color: colors.main }}
                  />
                )}
                <Tag color={colors.red}>
                  <h5>FERIADOS</h5>
                </Tag>
              </TagContainer>
              <TagContainer
                onClick={() => {
                  setTag(TagType.collective_vacation);
                }}
              >
                {tag === TagType.collective_vacation ? (
                  <Icons.CheckBoxIcon
                    sx={{ fontSize: "1.9rem", color: colors.main }}
                  />
                ) : (
                  <Icons.CheckBoxOutlineBlankIcon
                    sx={{ fontSize: "1.9rem", color: colors.main }}
                  />
                )}
                <Tag color={colors.red}>
                  <h5>FÉRIAS COLETIVAS</h5>
                </Tag>
              </TagContainer>
            </div>

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

export default ConfigDays;
