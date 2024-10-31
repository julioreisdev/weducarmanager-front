import { FC } from "react";
import { TInstructorIndicatores } from "../../interfaces/instructor.interface";
import CardToInstructorIndicatores from "../../components/CardToInstructorIndicatores";
import {
  FlexRowCenterBet,
  TableItemTitle,
  TableItemTitleSub,
} from "../../components/style";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
} from "@mui/material";
import Icons from "../../utils/icons";

const data: TInstructorIndicatores = [
  {
    id: 1,
    name: "Júlio Cezar dos Reis Pais",
    disciplines: [
      {
        id: 1,
        name: "Programador Web",
        total_awaiting_class: 20,
        total_invalid_class: 2,
        total_confirmed_class: 80,
      },
    ],
    total_awaiting_class: 20,
    total_invalid_class: 2,
    total_confirmed_class: 80,
  },
  {
    id: 2,
    name: "Ana Maria Silva",
    disciplines: [
      {
        id: 2,
        name: "Matemática",
        total_awaiting_class: 15,
        total_invalid_class: 1,
        total_confirmed_class: 60,
      },
      {
        id: 3,
        name: "Física",
        total_awaiting_class: 10,
        total_invalid_class: 0,
        total_confirmed_class: 50,
      },
    ],
    total_awaiting_class: 25,
    total_invalid_class: 1,
    total_confirmed_class: 110,
  },
  {
    id: 3,
    name: "Carlos Alberto",
    disciplines: [
      {
        id: 4,
        name: "Química",
        total_awaiting_class: 12,
        total_invalid_class: 1,
        total_confirmed_class: 55,
      },
      {
        id: 5,
        name: "Biologia",
        total_awaiting_class: 18,
        total_invalid_class: 2,
        total_confirmed_class: 70,
      },
    ],
    total_awaiting_class: 30,
    total_invalid_class: 3,
    total_confirmed_class: 125,
  },
  {
    id: 4,
    name: "Mariana Costa",
    disciplines: [
      {
        id: 6,
        name: "História",
        total_awaiting_class: 22,
        total_invalid_class: 2,
        total_confirmed_class: 85,
      },
      {
        id: 7,
        name: "Geografia",
        total_awaiting_class: 16,
        total_invalid_class: 1,
        total_confirmed_class: 65,
      },
    ],
    total_awaiting_class: 38,
    total_invalid_class: 3,
    total_confirmed_class: 150,
  },
];

const InstructorIndicatores: FC = () => {
  return (
    <>
      {data.map((item) => (
        <Accordion key={item.id} sx={{ width: "100%", boxShadow: "none" }}>
          <AccordionSummary
            sx={{ width: "100%" }}
            expandIcon={<Icons.ArrowDropDownIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <FlexRowCenterBet style={{ width: "100%" }}>
              <TableItemTitle style={{ margin: 0 }}>{item.name}</TableItemTitle>
              <CardToInstructorIndicatores
                color="#EF5350"
                confirmed={item.total_confirmed_class}
                awaiting={item.total_awaiting_class}
                invalid={item.total_invalid_class}
              />
            </FlexRowCenterBet>
          </AccordionSummary>
          <AccordionDetails>
            <Card
              sx={{
                backgroundColor: "#FAFAFA",
                padding: "0.5rem",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              {" "}
              {item.disciplines.map((d) => (
                <FlexRowCenterBet style={{ width: "95%" }} key={item.id + d.id}>
                  <TableItemTitleSub style={{ margin: 0 }}>
                    {d.name}
                  </TableItemTitleSub>
                  <CardToInstructorIndicatores
                    color="#000"
                    confirmed={d.total_confirmed_class}
                    awaiting={d.total_awaiting_class}
                    invalid={d.total_invalid_class}
                  />
                </FlexRowCenterBet>
              ))}
            </Card>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default InstructorIndicatores;
