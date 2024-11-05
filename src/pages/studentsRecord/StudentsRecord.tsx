import { FC, useState } from "react";
import { FlexRowCenterBet, SectionTitle } from "../../components/style";
import { UseStudents } from "../../hooks/useStudents";
import {
  Fab,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import colors from "../../utils/colors";
import Icons from "../../utils/icons";
import AppTextField from "../../components/AppTextField";
import { SearchContainer } from "./style";

const StudentsRecord: FC = () => {
  const [name, setName] = useState("");
  const { students } = UseStudents({
    id_instancia: Number(localStorage.getItem("id_instancia")),
    order: "A-Z",
    id_ano_letivo: 1,
    initial_row: 0,
    final_row: 10,
  });
  return (
    <>
      <FlexRowCenterBet>
        <SectionTitle style={{ margin: 0 }}>Ficha de Matrícula</SectionTitle>

        <FlexRowCenterBet style={{ gap: "1rem" }}>
          <Tooltip title="Novo aluno">
            <Fab size="small" color="info">
              <Icons.AddIcon
                fontSize="small"
                color="inherit"
                sx={{ color: "#fff" }}
              />
            </Fab>
          </Tooltip>
          <Tooltip title="Filtrar">
            <Fab size="small" color="warning">
              <Icons.FilterAltIcon
                fontSize="small"
                color="inherit"
                sx={{ color: "#fff" }}
              />
            </Fab>
          </Tooltip>
        </FlexRowCenterBet>
      </FlexRowCenterBet>
      <FlexRowCenterBet style={{ margin: "1rem 0 0.5rem 0" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <SearchContainer>
            <AppTextField
              required
              sx={{ width: "84%" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Nome"
            />
            <Tooltip title="Buscar">
              <Fab type="submit" size="small" color="info">
                <Icons.SearchIcon
                  fontSize="small"
                  color="inherit"
                  sx={{ color: "#fff" }}
                />
              </Fab>
            </Tooltip>
          </SearchContainer>
        </form>
      </FlexRowCenterBet>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Matrícula</TableCell>
              <TableCell align="right">Nome</TableCell>
              <TableCell align="right">Responsável</TableCell>
              <TableCell align="right">Ano</TableCell>
              <TableCell align="right">Turma</TableCell>
              <TableCell align="right">Situação</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students?.map((student) => (
              <TableRow
                key={student.Matricula}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {student.Matricula}
                </TableCell>
                <TableCell align="right">{student.Nome}</TableCell>
                <TableCell align="right">{student.Responsavel}</TableCell>
                <TableCell align="right">{student.Ano}</TableCell>
                <TableCell align="right">{student.Turma}</TableCell>
                <TableCell align="right">{student.Situacao}</TableCell>

                <TableCell align="right">
                  <FlexRowCenterBet style={{ justifyContent: "flex-end" }}>
                    <Tooltip title={"Deletar aluno"}>
                      <IconButton>
                        <Icons.RemoveCircleIcon sx={{ color: colors.red }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={"Editar aluno"}>
                      <IconButton>
                        <Icons.EditIcon sx={{ color: colors.main }} />
                      </IconButton>
                    </Tooltip>
                  </FlexRowCenterBet>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StudentsRecord;
