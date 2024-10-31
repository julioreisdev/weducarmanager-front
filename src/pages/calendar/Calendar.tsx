import { FC, useState } from "react";
import { Disabled, SectionTitle } from "../../components/style";
import CalendarView from "../../components/Calendar";
import { Button } from "@mui/material";
import colors from "../../utils/colors";
import OpenLetiveYearModal from "./OpenLetiveYearModal";
import ConfigDays from "./ConfigDays";

const Calendar: FC = () => {
  const [addLetiveYearModalIsOpen, setAddLetiveYearModalIsOpen] =
    useState(false);

  const [configDaysIsOpen, setConfigDaysIsOpen] = useState(false);

  return (
    <>
      <SectionTitle>Calendário Escolar</SectionTitle>
      <Disabled>
        {" "}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          <Button
            onClick={() => setAddLetiveYearModalIsOpen(true)}
            size="small"
            variant="contained"
            sx={{
              backgroundColor: colors.green,
            }}
          >
            Abrir ano letivo
          </Button>
          <Button
            onClick={() => setConfigDaysIsOpen(true)}
            size="small"
            variant="contained"
            sx={{
              backgroundColor: colors.orange,
            }}
          >
            Personalizar calendário
          </Button>
        </div>
        <CalendarView userSelect={false} action={true} />
      </Disabled>
      <OpenLetiveYearModal
        open={addLetiveYearModalIsOpen}
        onClose={() => setAddLetiveYearModalIsOpen(false)}
      />
      <ConfigDays
        open={configDaysIsOpen}
        onClose={() => setConfigDaysIsOpen(false)}
      />
    </>
  );
};

export default Calendar;
