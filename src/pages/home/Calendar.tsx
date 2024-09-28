import { FC, useCallback, useMemo, useState } from "react";
import { TCalendar, TCalendarTasks } from "../../interfaces/calendar.interface";
import colors from "../../utils/colors";
import { IconButton } from "@mui/material";
import Icons from "../../utils/icons";
import { FlexRowCenterBet } from "../../components/style";
import styled from "styled-components";
import TasksModal from "./TasksModal";

const calendar: TCalendar = [
  {
    id: 1,
    name: "Janeiro",
    days: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
  },
  {
    id: 2,
    name: "Fevereiro",
    days: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29,
    ],
  },
  {
    id: 3,
    name: "Março",
    days: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
  },
  {
    id: 4,
    name: "Abril",
    days: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30,
    ],
  },
  {
    id: 5,
    name: "Maio",
    days: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
  },
  {
    id: 6,
    name: "Junho",
    days: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30,
    ],
  },
  {
    id: 7,
    name: "Julho",
    days: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
  },
  {
    id: 8,
    name: "Agosto",
    days: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
  },
  {
    id: 9,
    name: "Setembro",
    days: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30,
    ],
  },
  {
    id: 10,
    name: "Outubro",
    days: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
  },
  {
    id: 11,
    name: "Novembro",
    days: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30,
    ],
  },
  {
    id: 12,
    name: "Dezembro",
    days: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ],
  },
];

const CalendarView: FC = () => {
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
    <div>
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
        {currentMonth?.days.map((day) => (
          <CalendarDay
            key={day}
            onClick={() => {
              setSelectedDay({ month, day });
              setTasksModalIsOpen(true);
            }}
            style={{
              backgroundColor: isToday(month, day) ? colors.main : "",
            }}
          >
            <FlexRowCenterBet>
              <p style={{ color: isToday(month, day) ? "#fff" : "#000" }}>
                {day}
              </p>
              {dayHaveTask(month, day) && (
                <Icons.NotificationsActiveIcon sx={{ color: colors.orange }} />
              )}
            </FlexRowCenterBet>
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
    </div>
  );
};

const CalendarContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border: 2px solid #682ee3;
  border-radius: 5px;
  padding: 0.5rem;
`;

const CalendarDay = styled.div`
  width: 20%;
  padding: 0.3rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #682ee320;
  }
`;

export default CalendarView;
