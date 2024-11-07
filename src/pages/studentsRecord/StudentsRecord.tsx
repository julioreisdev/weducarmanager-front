import { FC, useEffect, useState } from "react";
import {
  ActionsTableContainer,
  BigTableActionContainer,
  Disabled,
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
import PageLoading from "../../components/PageLoading";
import { IStudentFilters } from "../../interfaces/students.interface";
import Filter from "./Filter";
import { UseEthnicity } from "../../hooks/UseEthnicity";

const StudentsRecord: FC = () => {
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [matricula, setMatricula] = useState("");
  const [type, setType] = useState("Todos");
  const [order, setOrder] = useState("A-Z");
  const [params, setParams] = useState<IStudentFilters>({
    id_instancia: localStorage.getItem("instance_id") || "",
    id_ano_letivo: localStorage.getItem("letive_year") || "1",
    order: "A-Z",
  });
  const { students, studentsLoading } = UseStudents(params);
  const { ethnicity, ethnicityLoading } = UseEthnicity();

  const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
    return debouncedValue;
  };

  const debouncedInputName = useDebounce(name, 500);
  const debouncedInputMatricula = useDebounce(matricula, 500);

  useEffect(() => {
    if (debouncedInputName) {
      setParams({ ...params, name: debouncedInputName });
    }
    if (debouncedInputMatricula) {
      setParams({ ...params, matricula: debouncedInputMatricula });
    }
  }, [debouncedInputName, debouncedInputMatricula]);

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
              onClick={() => {
                setFilterIsOpen(true);
              }}
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
              sx={{ width: "100%" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Nome"
              onKeyUp={() => {
                if (!name) {
                  setParams({ ...params, name });
                }
              }}
            />
          </BigTableActionContainer>
          <SmallTableActionContainer>
            <AppTextField
              sx={{ width: "100%" }}
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              label="Matrícula"
              onKeyUp={() => {
                if (!matricula) {
                  setParams({ ...params, matricula });
                }
              }}
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
                  setParams({
                    ...params,
                    situacao:
                      e.target.value === "Todos" ? undefined : e.target.value,
                  });
                }}
                sx={sxToSelect}
              >
                <MenuItem sx={{ color: colors.main }} value={"Todos"}>
                  Todos
                </MenuItem>
                <MenuItem sx={{ color: colors.main }} value={"1"}>
                  Ativo
                </MenuItem>
                <MenuItem sx={{ color: colors.main }} value={"2"}>
                  Inativo
                </MenuItem>
                <MenuItem sx={{ color: colors.main }} value={"3"}>
                  Transferido
                </MenuItem>
                <MenuItem sx={{ color: colors.main }} value={"4"}>
                  Desistente
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
                  setParams({ ...params, order: e.target.value });
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

              <TableCell align="center">Situação</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students?.map((student, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {student?.registration}
                </TableCell>
                <TableCell align="center">{student?.name}</TableCell>
                <TableCell align="center">
                  {student?.responsible_name}
                </TableCell>
                <TableCell align="center">
                  {student?.classe.description}
                </TableCell>
                <TableCell align="center">
                  {student?.student_status_obj.description}
                </TableCell>

                <TableCell align="center">
                  <FlexRowCenterBet style={{ justifyContent: "center" }}>
                    <Tooltip title={"Editar aluno"}>
                      <IconButton>
                        <Icons.EditIcon sx={{ color: colors.main }} />
                      </IconButton>
                    </Tooltip>
                    <Disabled>
                      <Tooltip title={"Imprimir - Matrícula"}>
                        <IconButton>
                          <Icons.PrintIcon sx={{ color: colors.main }} />
                        </IconButton>
                      </Tooltip>
                    </Disabled>
                  </FlexRowCenterBet>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PageLoading open={studentsLoading || ethnicityLoading} />
      <Filter
        open={filterIsOpen}
        onClose={() => setFilterIsOpen(false)}
        setParams={setParams}
        params={params}
        ethnicity={ethnicity}
      />
    </>
  );
};

export default StudentsRecord;
