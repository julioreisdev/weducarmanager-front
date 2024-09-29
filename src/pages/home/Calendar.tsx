import { FC, useCallback, useMemo, useState } from "react";
import { TCalendarTasks } from "../../interfaces/calendar.interface";
import colors from "../../utils/colors";
import { Card, IconButton } from "@mui/material";
import Icons from "../../utils/icons";
import { FlexRowCenterBet } from "../../components/style";
import styled from "styled-components";
import TasksModal from "./TasksModal";
import { calendar } from "../../utils/calendar";

interface IProps {
  action: boolean;
  userSelect: boolean;
}

const CalendarView: FC<IProps> = ({ action, userSelect }) => {
  const date = new Date();
  const today = date.getDate();
  const thisMonth = date.getMonth() + 1;

  const [tasksModalIsOpen, setTasksModalIsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<{
    month: number;
    day: number;
  }>();

  const [month, setMonth] = useState(() => {
    return Number(date.getMonth()) + 1;
  });

  const currentMonth = useMemo(() => {
    return calendar.find((item) => item.id === month);
  }, [month]);

  const isToday = useCallback(
    (monthNumber: number, dayNumber: number) => {
      return monthNumber === thisMonth && dayNumber === today;
    },
    [month]
  );

  const [tasks, setTasks] = useState<TCalendarTasks>([
    { id: 0, month: 8, day: 1, description: "Visita escola Várzea Branca." },
    {
      id: 1,
      month: 9,
      day: 2,
      description: "Início da campanha contra Suicídio",
    },
    {
      id: 2,
      month: 9,
      day: 28,
      description: "Weducar, calendário. Finalizar base do front",
    },
    { id: 3, month: 9, day: 28, description: "Distribuição de alunos." },
    { id: 4, month: 9, day: 28, description: "Link de preview." },
    { id: 5, month: 9, day: 29, description: "Deploy Weducar Preview" },
  ]);

  function removeTask(id: number) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function addTask(
    monthNumber: number,
    dayNumber: number,
    description: string
  ) {
    setTasks((prev) => [
      ...prev,
      { id: prev.length, month: monthNumber, day: dayNumber, description },
    ]);
  }

  function dayHaveTask(monthNumber: number, dayNumber: number) {
    return tasks.some((t) => t.month === monthNumber && t.day === dayNumber);
  }

  const dayTasks = useMemo(() => {
    return tasks.filter(
      (t) => t.month === selectedDay?.month && t.day === selectedDay.day
    );
  }, [selectedDay, tasks]);

  function changeNextMonth() {
    if (month === 12) {
      setMonth(1);
      return;
    }
    setMonth((prev) => prev + 1);
  }

  function changeBackMonth() {
    if (month === 1) {
      setMonth(12);
      return;
    }
    setMonth((prev) => prev - 1);
  }

  return (
    <Card
      sx={{
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: "5px",
        padding: "0.5rem",
        userSelect: !userSelect ? "none" : "",
      }}
    >
      <FlexRowCenterBet>
        <h5 style={{ color: colors.main }}>{currentMonth?.name}</h5>
        <div>
          <IconButton onClick={changeBackMonth} sx={{ color: colors.main }}>
            <Icons.ArrowLeftIcon />
          </IconButton>
          <IconButton onClick={changeNextMonth} sx={{ color: colors.main }}>
            <Icons.ArrowRightIcon />
          </IconButton>
        </div>
      </FlexRowCenterBet>
      <CalendarContainer>
        <CalendarDay
          style={{
            backgroundColor: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FlexRowCenterBet>
              <p style={{ color: colors.red }}>D</p>
            </FlexRowCenterBet>
          </div>
        </CalendarDay>
        <CalendarDay
          style={{
            backgroundColor: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FlexRowCenterBet>
              <p style={{ color: colors.main }}>S</p>
            </FlexRowCenterBet>
          </div>
        </CalendarDay>
        <CalendarDay
          style={{
            backgroundColor: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FlexRowCenterBet>
              <p style={{ color: colors.main }}>T</p>
            </FlexRowCenterBet>
          </div>
        </CalendarDay>
        <CalendarDay
          style={{
            backgroundColor: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FlexRowCenterBet>
              <p style={{ color: colors.main }}>Q</p>
            </FlexRowCenterBet>
          </div>
        </CalendarDay>
        <CalendarDay
          style={{
            backgroundColor: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FlexRowCenterBet>
              <p style={{ color: colors.main }}>Q</p>
            </FlexRowCenterBet>
          </div>
        </CalendarDay>
        <CalendarDay
          style={{
            backgroundColor: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FlexRowCenterBet>
              <p style={{ color: colors.main }}>S</p>
            </FlexRowCenterBet>
          </div>
        </CalendarDay>
        <CalendarDay
          style={{
            backgroundColor: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FlexRowCenterBet>
              <p style={{ color: colors.red }}>S</p>
            </FlexRowCenterBet>
          </div>
        </CalendarDay>
      </CalendarContainer>
      <CalendarContainer>
        {currentMonth?.days.map((day) => (
          <CalendarDay
            key={month + day.day + day.week_day}
            onClick={() => {
              if (action && day.day) {
                setSelectedDay({ month, day: day.day });
                setTasksModalIsOpen(true);
              }
            }}
            style={{
              backgroundColor: !day.day
                ? ""
                : isToday(month, day.day)
                ? colors.main
                : day.is_holiday
                ? colors.orange
                : "",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FlexRowCenterBet>
                <p style={{ color: isToday(month, day.day) ? "#fff" : "#000" }}>
                  {day.day ? day.day : ""}
                </p>
                {dayHaveTask(month, day.day) && (
                  <Icons.NotificationsActiveIcon
                    sx={{
                      color: colors.red,
                      fontSize: "0.8rem",
                      marginLeft: "0.1rem",
                    }}
                  />
                )}
              </FlexRowCenterBet>
            </div>
          </CalendarDay>
        ))}
      </CalendarContainer>
      <TasksModal
        open={tasksModalIsOpen}
        onClose={() => setTasksModalIsOpen(false)}
        tasks={dayTasks}
        dateTasks={{
          month,
          day: selectedDay?.day || 0,
          monthName: currentMonth?.name || "",
        }}
        removeTask={removeTask}
        addTask={addTask}
      />
    </Card>
  );
};

const CalendarContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0.5rem;
`;

const CalendarDay = styled.div`
  width: 14%;
  padding: 0.3rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #682ee320;
  }
`;

export default CalendarView;
