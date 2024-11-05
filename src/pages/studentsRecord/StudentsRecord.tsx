import { FC, useState } from "react";
import {
  ActionsTableContainer,
  BigTableActionContainer,
  FlexRowCenterBet,
  HeaderActionsContainer,
  HeaderActionsContainerItem,
  SectionTitle,
  SmallTableActionContainer,
  sxToInputLabel,
  sxToSelect,
} from "../../components/style";
import { UseStudents } from "../../hooks/useStudents";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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

const StudentsRecord: FC = () => {
  const [name, setName] = useState("");
  const [matricula, setMatricula] = useState("");
  const [type, setType] = useState("Todos");
  const [order, setOrder] = useState("A-Z");
  const { students } = UseStudents({
    id_instancia: Number(localStorage.getItem("id_instancia")),
    order,
    id_ano_letivo: 1,
    initial_row: 0,
    final_row: 10,
    situacao: type === "Todos" ? undefined : type,
    name,
    matricula,
  });
  return (
    <>
      <HeaderActionsContainer>
        <HeaderActionsContainerItem>
          <SectionTitle style={{ margin: 0 }}>Matrícula</SectionTitle>
        </HeaderActionsContainerItem>

        <HeaderActionsContainer>
          <HeaderActionsContainerItem>
            {" "}
            <Button
              size="small"
              variant="contained"
              sx={{
                backgroundColor: colors.main,
                padding: "0.5rem",
                width: "100%",
              }}
              startIcon={
                <Icons.AddIcon
                  fontSize="small"
                  color="inherit"
                  sx={{ color: "#fff" }}
                />
              }
            >
              Nova Matrícula
            </Button>
          </HeaderActionsContainerItem>

          <HeaderActionsContainerItem>
            {" "}
            <Button
              size="small"
              variant="outlined"
              sx={{
                padding: "0.5rem",
                color: colors.main,
                borderColor: colors.main,
                width: "100%",
              }}
              startIcon={
                <Icons.FilterAltIcon
                  fontSize="small"
                  color="inherit"
                  sx={{ color: colors.main }}
                />
              }
            >
              Filtros avançados
            </Button>
          </HeaderActionsContainerItem>
        </HeaderActionsContainer>
      </HeaderActionsContainer>
      <FlexRowCenterBet style={{ margin: "1rem 0 0.5rem 0" }}>
        <ActionsTableContainer>
          <BigTableActionContainer>
            <AppTextField
              required
              sx={{ width: "100%" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Nome"
            />
          </BigTableActionContainer>
          <SmallTableActionContainer>
            <AppTextField
              required
              sx={{ width: "100%" }}
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              label="Matrícula"
            />
          </SmallTableActionContainer>
          <SmallTableActionContainer>
            <FormControl fullWidth>
              <InputLabel
                sx={sxToInputLabel}
                id="demo-simple-select-label-tipo"
              >
                Situação
              </InputLabel>
              <Select
                size="small"
                labelId="demo-simple-select-label-tipo"
                id="demo-simple-select-tipo"
                value={type}
                label="Situação"
                onChange={(e) => {
                  setType(e.target.value);
                }}
                sx={sxToSelect}
              >
                <MenuItem sx={{ color: colors.main }} value={"Todos"}>
                  Todos
                </MenuItem>
                <MenuItem sx={{ color: colors.main }} value={"Ativo"}>
                  Ativo
                </MenuItem>
                <MenuItem sx={{ color: colors.main }} value={"Inativo"}>
                  Inativo
                </MenuItem>
                <MenuItem sx={{ color: colors.main }} value={"Transferido"}>
                  Transferido
                </MenuItem>
                <MenuItem sx={{ color: colors.main }} value={"Desistente"}>
                  Desistente
                </MenuItem>
                <MenuItem sx={{ color: colors.main }} value={"Cursando"}>
                  Cursando
                </MenuItem>
              </Select>
            </FormControl>
          </SmallTableActionContainer>
          <SmallTableActionContainer>
            <FormControl fullWidth>
              <InputLabel sx={sxToInputLabel} id="demo-simple-select-label">
                Ordem
              </InputLabel>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={order}
                label="Ordem"
                onChange={(e) => {
                  setOrder(e.target.value);
                }}
                sx={sxToSelect}
              >
                <MenuItem sx={{ color: colors.main }} value={"A-Z"}>
                  A-Z
                </MenuItem>
                <MenuItem sx={{ color: colors.main }} value={"Z-A"}>
                  Z-A
                </MenuItem>
              </Select>
            </FormControl>
          </SmallTableActionContainer>
        </ActionsTableContainer>
      </FlexRowCenterBet>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Matrícula</TableCell>
              <TableCell align="center">Nome</TableCell>
              <TableCell align="center">Responsável</TableCell>
              <TableCell align="center">Ano</TableCell>
              <TableCell align="center">Turma</TableCell>
              <TableCell align="center">Situação</TableCell>
              <TableCell align="center">Ações</TableCell>
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
                <TableCell align="center">{student.Nome}</TableCell>
                <TableCell align="center">{student.Responsavel}</TableCell>
                <TableCell align="center">{student.Serie}</TableCell>
                <TableCell align="center">{student.Turma}</TableCell>
                <TableCell align="center">{student.Situacao}</TableCell>

                <TableCell align="center">
                  <Tooltip title={"Editar aluno"}>
                    <IconButton>
                      <Icons.EditIcon sx={{ color: colors.main }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={"Imprimir - Matrícula"}>
                    <IconButton>
                      <Icons.PrintIcon sx={{ color: colors.main }} />
                    </IconButton>
                  </Tooltip>
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
