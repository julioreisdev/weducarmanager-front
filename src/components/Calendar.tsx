import { FC, useCallback, useEffect, useMemo, useState } from "react";
import {
  ICalendarDay,
  ICalendarMonth,
  TagType,
  TCalendar,
  TCalendarTasks,
} from "../interfaces/calendar.interface";
import colors from "../utils/colors";
import { Card, IconButton } from "@mui/material";
import Icons from "../utils/icons";
import { FlexRowCenterBet } from "./style";
import styled from "styled-components";
import { calendar } from "../utils/calendar";
import DayDetailsModal from "../pages/home/DayDetailsModal";

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

  const [day, setDay] = useState<ICalendarDay>();

  const [month, setMonth] = useState(() => {
    return Number(date.getMonth()) + 1;
  });

  const [dataCalendar, setDataCalendar] = useState<TCalendar>([]);

  useEffect(() => {
    setDataCalendar(calendar);
  }, []);

  function updateCalendar(updatedDay?: ICalendarDay, monthId?: number) {
    const updatedMonth = dataCalendar.find((m) => m.id === monthId);
    const updatedDataMonth: ICalendarMonth = {
      id: updatedMonth?.id || 0,
      name: updatedMonth?.name || "",
      days:
        updatedMonth?.days.map((d) => {
          if (d.day === updatedDay?.day) {
            return updatedDay;
          }
          return d;
        }) || [],
    };
    setDataCalendar((prev) =>
      prev.map((m) => {
        if (m.id === updatedDataMonth.id) {
          return updatedDataMonth;
        }
        return m;
      })
    );
    setDay(updatedDay);
  }

  const currentMonth = useMemo(() => {
    return dataCalendar.find((item) => item.id === month);
  }, [month, dataCalendar]);

  const isToday = useCallback(
    (monthNumber: number, dayNumber: number) => {
      return monthNumber === thisMonth && dayNumber === today;
    },
    [month, dataCalendar]
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
  }, [selectedDay, tasks, dataCalendar]);

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

  function dayColor(day: ICalendarDay) {
    if (!day.day) {
      return "";
    }
    if (isToday(month, day.day)) {
      return colors.main;
    }
    if (
      day.is_holiday ||
      day.tag === TagType.holidays ||
      day.tag === TagType.collective_vacation
    ) {
      return colors.red;
    }

    if (day.tag === TagType.school_day || day.tag === TagType.school_saturday) {
      return colors.green;
    }

    if (
      day.tag === TagType.assessments ||
      day.tag === TagType.remedial_classes
    ) {
      return colors.orange;
    }

    if (day.tag === TagType.formations_and_plans) {
      return colors.blue;
    }

    return "";
  }

  function dayTextColor(day: ICalendarDay) {
    if (dayColor(day) === "") {
      return colors.main;
    }

    return "#fff";
  }

  function notifyColor(day: ICalendarDay) {
    if (isToday(month, day.day) || day.is_holiday) {
      return colors.orange;
    }

    return colors.red;
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
                setDay(day);
                setTasksModalIsOpen(true);
              }
            }}
            style={{
              backgroundColor: dayColor(day),
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
                <p style={{ color: dayTextColor(day) }}>
                  {day.day ? day.day : ""}
                </p>
                {dayHaveTask(month, day.day) && (
                  <Icons.NotificationsActiveIcon
                    sx={{
                      color: notifyColor(day),
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
      <DayDetailsModal
        updateCalendar={updateCalendar}
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
        day={day}
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
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #682ee320;
  }
`;

export default CalendarView;
