import { FC, SyntheticEvent, useState } from "react";
import {
  ICalendarDay,
  TagType,
  TCalendarTasks,
} from "../../interfaces/calendar.interface";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  IconButton,
  Modal,
  Tab,
} from "@mui/material";
import colors from "../../utils/colors";
import { FlexRowCenterBet, SectionSubTitle } from "../../components/style";
import styled from "styled-components";
import Icons from "../../utils/icons";
import AppTextField from "../../components/AppTextField";
import { TabContext, TabList } from "@mui/lab";

interface IProps {
  open: boolean;
  onClose: () => void;
  tasks: TCalendarTasks;
  updateCalendar: (updatedDay: ICalendarDay, monthId: number) => void;
  day?: ICalendarDay;
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
  width: window.innerWidth <= 720 ? "90%" : 400,
  minHeight: "420px",
  bgcolor: "background.paper",
  border: `2px solid ${colors.main}`,
  borderRadius: "8px",
  boxShadow: 24,
  padding: "1rem",
};

const DayDetailsModal: FC<IProps> = ({
  open,
  onClose,
  tasks,
  dateTasks,
  removeTask,
  addTask,
  day,
  updateCalendar,
}) => {
  const [description, setDescription] = useState("");

  const [selectedTab, setSelectedTab] = useState("tags");
  const handleChangeTab = (_: SyntheticEvent, newTab: string) => {
    setSelectedTab(newTab);
  };

  function updateDayTag(day?: ICalendarDay, tag?: TagType) {
    if (!day?.is_holiday && day?.week_day !== "Domingo") {
      console.log("dá");
      updateCalendar(
        {
          day: day?.day || 0,
          is_holiday: day?.is_holiday || false,
          week_day: day?.week_day || "",
          is_weekend: day?.is_weekend || false,
          tag: tag || TagType.school_day,
        },
        dateTasks.month
      );
    }
  }

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
          <TabContext value={selectedTab}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              {" "}
              <IconButton onClick={onClose}>
                <Icons.DoDisturbOnIcon sx={{ color: colors.red }} />
              </IconButton>
            </div>
            <TabList
              sx={{
                marginBottom: "1rem",
                "& .MuiTab-root": {
                  color: "#682EE3",
                },
                "& .Mui-selected": {
                  color: "#682EE3 !important",
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#682EE3",
                },
                border: "none !important",
              }}
              onChange={handleChangeTab}
              variant="scrollable"
            >
              <Tab disableRipple label="Sobre o dia" value={"tags"} />
              <Tab disableRipple label="Tarefas" value={"tasks"} />
            </TabList>
            {selectedTab === "tasks" ? (
              <FlexItem
                style={{
                  width: "100%",
                }}
              >
                <SectionSubTitle style={{ marginBottom: 0 }}>
                  {dateTasks.day} de {dateTasks.monthName} - {tasks.length}{" "}
                  atividade(s)
                </SectionSubTitle>

                <Box
                  sx={{
                    width: "100%",
                    margin: "1rem 0",
                    maxHeight: "180px",
                    overflowY: "auto",
                  }}
                >
                  {tasks.map((t) => (
                    <Task>
                      <h5>{t.description}</h5>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <IconButton
                          sx={{ padding: "0.2rem" }}
                          onClick={() => removeTask(t.id)}
                        >
                          <Icons.DoDisturbOnIcon
                            sx={{ color: colors.red, fontSize: "0.9rem" }}
                          />
                        </IconButton>
                        <IconButton
                          sx={{ padding: "0.2rem" }}
                          onClick={() => removeTask(t.id)}
                        >
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
                  <FlexRowCenterBet style={{ width: "100%" }}>
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
                  </FlexRowCenterBet>
                </form>
              </FlexItem>
            ) : (
              <FlexItem
                style={{
                  width: "100%",
                  opacity:
                    day?.is_holiday || day?.week_day === "Domingo" ? 0.3 : 1,
                }}
              >
                <SectionSubTitle style={{ marginBottom: "1rem" }}>
                  {dateTasks.day} de {dateTasks.monthName} - {tasks.length}{" "}
                  atividade(s)
                </SectionSubTitle>
                <TagContainer
                  onClick={() => {
                    updateDayTag(day, TagType.formations_and_plans);
                  }}
                >
                  {day?.tag === TagType.formations_and_plans ? (
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
                    updateDayTag(day, TagType.school_day);
                  }}
                >
                  {day?.tag === TagType.school_day ? (
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
                    updateDayTag(day, TagType.school_saturday);
                  }}
                >
                  {day?.tag === TagType.school_saturday ? (
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
                    updateDayTag(day, TagType.assessments);
                  }}
                >
                  {day?.tag === TagType.assessments ? (
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
                    updateDayTag(day, TagType.remedial_classes);
                  }}
                >
                  {day?.tag === TagType.remedial_classes ? (
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
                    updateDayTag(day, TagType.holidays);
                  }}
                >
                  {day?.tag === TagType.holidays ? (
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
                    updateDayTag(day, TagType.collective_vacation);
                  }}
                >
                  {day?.tag === TagType.collective_vacation ? (
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
              </FlexItem>
            )}
          </TabContext>
        </Box>
      </Fade>
    </Modal>
  );
};

export const TagContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Tag = styled.div`
  padding: 0.03rem 0.5rem;
  border-radius: 3px;
  border: 2px solid ${(props) => props.color};
  color: ${(props) => props.color};
  cursor: pointer;
`;

const FlexItem = styled.div`
  @media (max-width: 720px) {
    width: 100% !important;
    min-width: 100% !important;
    min-width: 100% !important;
  }
`;

const Task = styled.div`
  flex-shrink: 0;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border: 2px solid #682ee3;
  background-color: #682ee3;
  padding: 0 0.5rem;
  border-radius: 3px;
  color: #fff;
  margin-bottom: 0.5rem;
`;

export default DayDetailsModal;
