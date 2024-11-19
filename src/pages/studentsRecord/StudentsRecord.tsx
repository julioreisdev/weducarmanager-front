import { FC, useEffect, useMemo, useState } from "react";
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
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import colors from "../../utils/colors";
import Icons from "../../utils/icons";
import AppTextField from "../../components/AppTextField";
import PageLoading from "../../components/PageLoading";
import { IStudent, IStudentFilters } from "../../interfaces/students.interface";
import Filter from "./Filter";
import { UseEthnicity } from "../../hooks/UseEthnicity";
import { createQueryString } from "../../utils/query";
import StudentAdd from "./StudentAdd";
import { UseStudentsStatus } from "../../hooks/UseStudentsStatus";
import StudentEdit from "./StudentEdit";

const StudentsRecord: FC = () => {
  const [filterIsOpen, setFilterIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [matricula, setMatricula] = useState("");
  const [type, setType] = useState("TODOS");
  const [order, setOrder] = useState("A-Z");

  const [params, setParams] = useState<IStudentFilters>({
    id_instancia: localStorage.getItem("instance_id") || "",
    id_ano_letivo: localStorage.getItem("letive_year") || "1",
    order: "A-Z",
    page: 1,
  });
  const { students, studentsLoading, updateStudents } = UseStudents(params);
  const { ethnicity, ethnicityLoading } = UseEthnicity();
  const { studentsStatus } = UseStudentsStatus();

  const [page, setPage] = useState<number>(0);
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    console.log(event);
    setPage(newPage);
    setParams((prev) => {
      return {
        ...prev,
        page: newPage + 1,
      };
    });
  };

  const totalItems = students?.count || 0;
  const currentPage = totalItems > 0 ? page : 0;

  const [student, setStudent] = useState<IStudent>();
  const [formMode, setFormMode] = useState(false);
  const [formEditMode, setFormEditMode] = useState(false);

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

  const filterActive = useMemo(() => {
    if (
      params.cor ||
      params.disturbio ||
      params.responsavel_nome ||
      params.pcd ||
      params.restricao_alimentar ||
      params.sexo ||
      params.disturbio
    ) {
      return true;
    }
    return false;
  }, [params]);

  return (
    <>
      <SectionTitle>
        Alunos -{" "}
        {formMode
          ? "Nova Matrícula"
          : formEditMode
          ? student?.name
          : "Matrículas"}
      </SectionTitle>
      <HeaderActionsContainer>
        <HeaderActionsContainer>
          <HeaderActionsContainerItem>
            {" "}
            {formMode || formEditMode ? (
              <Button
                onClick={() => {
                  if (formEditMode) {
                    setFormEditMode(false);
                  } else {
                    setFormMode(false);
                  }
                }}
                size="small"
                variant="outlined"
                sx={{
                  padding: "0.5rem",
                  width: "100%",
                  borderColor: colors.main,
                  color: colors.main,
                }}
                startIcon={
                  <Icons.ArrowBackIosNewIcon fontSize="small" color="inherit" />
                }
              >
                Voltar
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setFormMode(true);
                }}
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
            )}
          </HeaderActionsContainerItem>

          {!formMode && !formEditMode ? (
            <>
              <HeaderActionsContainerItem>
                {" "}
                <Button
                  onClick={() => {
                    setFilterIsOpen(true);
                  }}
                  size="small"
                  color="warning"
                  variant={filterActive ? "contained" : "outlined"}
                  sx={{
                    padding: "0.5rem",

                    width: "100%",
                  }}
                  startIcon={
                    <Icons.FilterAltIcon fontSize="small" color="inherit" />
                  }
                >
                  {filterActive ? "Filtros Ativos" : "Filtros Avançados"}
                </Button>
              </HeaderActionsContainerItem>
              <HeaderActionsContainerItem>
                {" "}
                <a
                  href={`${
                    import.meta.env.VITE_API
                  }/api/v1/students/students/?${createQueryString(params)}/`}
                  target="_blank"
                >
                  <Button
                    onClick={() => {}}
                    size="small"
                    color="info"
                    variant="outlined"
                    sx={{
                      padding: "0.5rem",

                      width: "100%",
                    }}
                    startIcon={
                      <Icons.PrintIcon fontSize="small" color="inherit" />
                    }
                  >
                    ver Relatório
                  </Button>
                </a>
              </HeaderActionsContainerItem>
            </>
          ) : null}
        </HeaderActionsContainer>
      </HeaderActionsContainer>

      {formMode ? (
        <StudentAdd
          update={() => updateStudents()}
          onClose={() => setFormMode(false)}
        />
      ) : formEditMode ? (
        <StudentEdit
          update={() => updateStudents()}
          onClose={() => setFormEditMode(false)}
          student={student}
        />
      ) : (
        <>
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
                          e.target.value === "TODOS"
                            ? undefined
                            : e.target.value,
                      });
                    }}
                    sx={sxToSelect}
                  >
                    <MenuItem sx={{ color: colors.main }} value={"TODOS"}>
                      TODOS
                    </MenuItem>

                    {studentsStatus?.map((i) => (
                      <MenuItem
                        key={i.id}
                        sx={{ color: colors.main }}
                        value={`${i.id}`}
                      >
                        {i.description}
                      </MenuItem>
                    ))}
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
            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={totalItems}
              rowsPerPage={10}
              page={currentPage}
              onPageChange={handleChangePage}
              labelRowsPerPage={"Alunos por página"}
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} de ${count}`
              }
            />
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
                {students?.results?.map((item, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item?.registration}
                    </TableCell>
                    <TableCell align="center">{item?.name}</TableCell>
                    <TableCell align="center">
                      {item?.responsible_name}
                    </TableCell>
                    <TableCell align="center">
                      {item?.classe ? item.classe.description : ""}
                    </TableCell>
                    <TableCell align="center">
                      {item?.classe ? item?.classe.status.description : ""}
                    </TableCell>

                    <TableCell align="center">
                      <FlexRowCenterBet style={{ justifyContent: "center" }}>
                        <Tooltip
                          onClick={() => {
                            setStudent(item);
                            setFormEditMode(true);
                          }}
                          title={"Editar aluno"}
                        >
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
        </>
      )}
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
