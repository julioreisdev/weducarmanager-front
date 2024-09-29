import { FC, useState } from "react";
import { TCalendarTasks } from "../../interfaces/calendar.interface";
import { Backdrop, Box, Button, Fade, IconButton, Modal } from "@mui/material";
import colors from "../../utils/colors";
import { FlexRowCenterBet, SectionSubTitle } from "../../components/style";
import styled from "styled-components";
import Icons from "../../utils/icons";
import AppTextField from "../../components/AppTextField";

interface IProps {
  open: boolean;
  onClose: () => void;
  tasks: TCalendarTasks;
  dateTasks: { month: number; day: number; monthName: string };
  removeTask: (id: number) => void;
  addTask: (
    monthNumber: number,
    dayNumber: number,
    description: string
  ) => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: window.innerWidth <= 720 ? "90%" : 600,
  bgcolor: "background.paper",
  border: `2px solid ${colors.main}`,
  borderRadius: "8px",
  boxShadow: 24,
  padding: "1rem",
};

const TasksModal: FC<IProps> = ({
  open,
  onClose,
  tasks,
  dateTasks,
  removeTask,
  addTask,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [description, setDescription] = useState("");

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (isHovered) {
      event.preventDefault();
      event.currentTarget.scrollLeft += event.deltaY;
    }
  };
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
          <FlexContainer>
            <FlexItem style={{ minWidth: "60%", maxWidth: "60%" }}>
              <FlexRowCenterBet>
                {" "}
                <SectionSubTitle style={{ marginBottom: 0 }}>
                  {dateTasks.day} de {dateTasks.monthName}
                </SectionSubTitle>
                <IconButton onClick={onClose}>
                  <Icons.DoDisturbOnIcon sx={{ color: colors.red }} />
                </IconButton>
              </FlexRowCenterBet>
              {!tasks.length && "Nada agendado"}
              {tasks.length !== 0 && (
                <p style={{ marginBottom: "1rem" }}>
                  {tasks.length} atividade(s)
                </p>
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  gap: "1rem",
                  overflowX: "auto",
                  overflowY: "hidden",
                  cursor: "grab",
                  padding: "0.1rem 0.1rem 0.5rem 0.1rem",
                  textAlign: "center",
                  marginBottom: "0.5rem",
                  "&::-webkit-scrollbar": {
                    height: "3px",
                  },
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onWheel={handleWheel}
              >
                {tasks.map((t) => (
                  <Task>
                    <h5 style={{ paddingTop: "6px" }}>{t.description}</h5>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <IconButton onClick={() => removeTask(t.id)}>
                        <Icons.DoDisturbOnIcon
                          sx={{ color: colors.red, fontSize: "0.9rem" }}
                        />
                      </IconButton>
                      <IconButton onClick={() => removeTask(t.id)}>
                        <Icons.CheckCircleIcon
                          sx={{ color: colors.green, fontSize: "0.9rem" }}
                        />
                      </IconButton>
                    </div>
                  </Task>
                ))}
              </Box>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addTask(dateTasks.month, dateTasks.day, description);
                  setDescription("");
                }}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <AppTextField
                  label="Tarefa"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  type="text"
                  sx={{ width: "78%" }}
                />
                <Button
                  type="submit"
                  size="small"
                  variant="contained"
                  sx={{ backgroundColor: colors.main, padding: "0.5rem" }}
                >
                  Add
                </Button>
              </form>
            </FlexItem>
            <FlexItem style={{ minWidth: "40%", maxWidth: "40%" }}>
              tags
            </FlexItem>
          </FlexContainer>
        </Box>
      </Fade>
    </Modal>
  );
};

const FlexItem = styled.div`
  @media (max-width: 720px) {
    width: 100% !important;
    min-width: 100% !important;
    min-width: 100% !important;
  }
`;

const FlexContainer = styled.div`
  width: center;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media (max-width: 720px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
`;

const Task = styled.div`
  flex-shrink: 0;
  width: 250px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border: 2px solid #682ee3;
  background-color: #682ee3;
  padding: 0.5rem;
  border-radius: 5px;
  color: #fff;
`;

export default TasksModal;
