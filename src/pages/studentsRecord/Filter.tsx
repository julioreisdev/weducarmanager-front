import {
  Button,
  Drawer,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/system";
import { FC, useState } from "react";
import {
  FlexRowCenterBet,
  SectionSubTitle,
  sxToInputLabel,
  sxToSelect,
} from "../../components/style";
import Icons from "../../utils/icons";
import colors from "../../utils/colors";
import { IStudentFilters } from "../../interfaces/students.interface";
import AppTextField from "../../components/AppTextField";

type FilterBarProps = {
  open: boolean;
  onClose: () => void;
  setParams: React.Dispatch<React.SetStateAction<IStudentFilters>>;
  params: IStudentFilters;
  ethnicity?: { id: number; description: string }[];
};

const Filter: FC<FilterBarProps> = ({
  open,
  onClose,
  setParams,
  params,
  ethnicity,
}) => {
  const [responsible, setResponsible] = useState("");
  const [ethnicitySelected, setEthnicitySelected] = useState("TODOS");
  const [gender, setGender] = useState("TODOS");
  const [pcd, setPcd] = useState(false);
  const [disturbed, setDisturbed] = useState(false);
  const [eatRestrict, setEatRestrict] = useState(false);
  const [schoolTransport, setSchoolTransport] = useState(false);

  return (
    <Drawer open={open} onClose={onClose} anchor="right">
      <Box sx={{ width: 250, padding: "1rem" }}>
        <FlexRowCenterBet style={{ marginTop: "4rem" }}>
          <SectionSubTitle style={{ margin: 0 }}>Filtros</SectionSubTitle>
          <IconButton sx={{ padding: 0 }} onClick={onClose}>
            <Icons.CancelIcon sx={{ color: colors.red }} />
          </IconButton>
        </FlexRowCenterBet>

        <Box sx={{ marginTop: "1rem" }}>
          <AppTextField
            sx={{ width: "100%", marginBottom: "1rem" }}
            value={responsible}
            onChange={(e) => setResponsible(e.target.value)}
            label="Responsável"
          />
          <FormControl sx={{ marginBottom: "1rem" }} fullWidth>
            <InputLabel sx={sxToInputLabel} id="demo-simple-select-label-Etnia">
              Etnia
            </InputLabel>
            <Select
              size="small"
              labelId="demo-simple-select-label-Etnia"
              id="demo-simple-select-Etnia"
              value={ethnicitySelected}
              label="Etnia"
              onChange={(e) => {
                setEthnicitySelected(e.target.value);
              }}
              sx={sxToSelect}
            >
              <MenuItem sx={{ color: colors.main }} value={"TODOS"}>
                TODOS
              </MenuItem>
              {ethnicity?.map((i) => (
                <MenuItem key={i.id} sx={{ color: colors.main }} value={i.id}>
                  {i.description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ marginBottom: "1rem" }} fullWidth>
            <InputLabel
              sx={sxToInputLabel}
              id="demo-simple-select-label-gender"
            >
              Sexo
            </InputLabel>
            <Select
              size="small"
              labelId="demo-simple-select-label-gender"
              id="demo-simple-select-gender"
              value={gender}
              label="Sexo"
              onChange={(e) => {
                setGender(e.target.value);
              }}
              sx={sxToSelect}
            >
              <MenuItem sx={{ color: colors.main }} value={"TODOS"}>
                TODOS
              </MenuItem>
              <MenuItem sx={{ color: colors.main }} value={"M"}>
                MASCULINO
              </MenuItem>
              <MenuItem sx={{ color: colors.main }} value={"F"}>
                FEMININO
              </MenuItem>
            </Select>
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={pcd}
                color="primary"
                name="pcd"
                onChange={() => setPcd((previousState) => !previousState)}
              />
            }
            label="Pessoa Com Deficiência?"
          />
          <FormControlLabel
            control={
              <Switch
                checked={disturbed}
                color="primary"
                name="disturbed"
                onChange={() => setDisturbed((previousState) => !previousState)}
              />
            }
            label="Distúrbio?"
          />
          <FormControlLabel
            control={
              <Switch
                checked={eatRestrict}
                color="primary"
                name="eatrestrict"
                onChange={() =>
                  setEatRestrict((previousState) => !previousState)
                }
              />
            }
            label="Restrição Alimentar?"
          />
          <FormControlLabel
            control={
              <Switch
                checked={schoolTransport}
                color="primary"
                name="transport"
                onChange={() =>
                  setSchoolTransport((previousState) => !previousState)
                }
              />
            }
            label="Transporte escolar?"
          />
          <FlexRowCenterBet style={{ marginTop: "1rem" }}>
            <Button
              onClick={() => {
                setParams({
                  ...params,
                  responsavel_nome: undefined,
                  cor: undefined,
                  sexo: undefined,
                  pcd: undefined,
                  disturbio: undefined,
                  restricao_alimentar: undefined,
                  transporte_escolar: undefined,
                });
                setResponsible("");
                setEthnicitySelected("TODOS");
                setGender("TODOS");
                setPcd(false);
                setDisturbed(false);
                setSchoolTransport(false);
                setEatRestrict(false);
                onClose();
              }}
              size="small"
              variant="outlined"
              sx={{
                width: "49%",
              }}
              startIcon={<Icons.CancelIcon fontSize="small" color="inherit" />}
            >
              Limpar
            </Button>
            <Button
              onClick={() => {
                setParams({
                  ...params,
                  responsavel_nome: responsible,
                  cor:
                    ethnicitySelected === "TODOS"
                      ? undefined
                      : ethnicitySelected,
                  sexo: gender === "TODOS" ? undefined : gender,
                  pcd: pcd ? "1" : "0",
                  disturbio: disturbed ? "1" : "0",
                  restricao_alimentar: eatRestrict ? "1" : "0",
                  transporte_escolar: schoolTransport ? "1" : "0",
                });
                onClose();
              }}
              size="small"
              variant="contained"
              sx={{
                backgroundColor: colors.main,

                width: "49%",
              }}
              startIcon={
                <Icons.FilterAltIcon
                  fontSize="small"
                  color="inherit"
                  sx={{ color: "#fff" }}
                />
              }
            >
              Filtrar
            </Button>
          </FlexRowCenterBet>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Filter;
