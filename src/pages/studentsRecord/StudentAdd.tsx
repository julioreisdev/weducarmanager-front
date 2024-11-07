import { FC, useState } from "react";
import Icons from "../../utils/icons";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import colors from "../../utils/colors";
import { LoadingButton } from "@mui/lab";
import {
  BigFormContainer,
  FormPageContainer,
  FormSectionContainer,
  SalveDataPageButtonContainer,
  sxToInputLabel,
  sxToSelect,
} from "../../components/style";
import AppTextField from "../../components/AppTextField";
import { UseStudentsStatus } from "../../hooks/UseStudentsStatus";

interface IProps {
  update: () => void;
  onClose: () => void;
}

const StudentAdd: FC<IProps> = ({ update, onClose }) => {
  const [loading, setLoading] = useState(false);
  // Dados básicos do aluno
  const [censusId, setCensusId] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [color, setColor] = useState<number>(0);
  const [colorObj, setColorObj] = useState<{ id: number; description: string }>(
    { id: 0, description: "" }
  );
  const [birthDate, setBirthDate] = useState<string>(" ");
  const [birthplace, setBirthplace] = useState<string | null>(null);

  // Endereço do aluno
  const [address, setAddress] = useState<string | null>(null);
  const [neighborhood, setNeighborhood] = useState<string | null>(null);
  const [city, setCity] = useState<number>(0);

  // Classe e ano escolar
  const [classe, setClasse] = useState<{
    id: number;
    description: string;
    school_year: { id: number; description: string };
  }>({
    id: 0,
    description: "",
    school_year: { id: 0, description: "" },
  });

  // Descrição do aluno e datas
  const [description, setDescription] = useState<string>("");
  const [dateJoined, setDateJoined] = useState<string>("");
  const [dateChanged, setDateChanged] = useState<string>("");

  // Checks relacionados à saúde e necessidades
  const [aeeCheck, setAeeCheck] = useState<number>(0);
  const [allergyCheck, setAllergyCheck] = useState<number>(0);
  const [allergyObservations, setAllergyObservations] = useState<string | null>(
    null
  );
  const [disabilityCheck, setDisabilityCheck] = useState<number>(0);
  const [disabilityObservations, setDisabilityObservations] = useState<
    string | null
  >(null);
  const [disorderCheck, setDisorderCheck] = useState<number>(0);
  const [disorderInstructions, setDisorderInstructions] = useState<string>("");
  const [disorderObservations, setDisorderObservations] = useState<
    string | null
  >(null);

  // Informações do responsável
  const [fatherName, setFatherName] = useState<string>("");
  const [fatherPhone, setFatherPhone] = useState<string>("");
  const [fatherCpf, setFatherCpf] = useState<string | null>(null);
  const [fatherRg, setFatherRg] = useState<string | null>(null);
  const [motherName, setMotherName] = useState<string | null>(null);
  const [motherPhone, setMotherPhone] = useState<string | null>(null);
  const [motherCpf, setMotherCpf] = useState<string | null>(null);
  const [motherRg, setMotherRg] = useState<string | null>(null);

  // Restrições alimentares, medicamentosas, e outras necessidades
  const [foodRestrictionCheck, setFoodRestrictionCheck] = useState<number>(0);
  const [foodRestrictionObservations, setFoodRestrictionObservations] =
    useState<string | null>(null);
  const [medicationCheck, setMedicationCheck] = useState<number>(0);
  const [medicationObservations, setMedicationObservations] = useState<
    string | null
  >(null);

  // Status do aluno
  const [studentStatus, setStudentStatus] = useState<string>("1");
  const [studentStatusObj, setStudentStatusObj] = useState<{
    id: number;
    description: string;
  }>({ id: 0, description: "" });
  const { studentsStatus } = UseStudentsStatus();

  // Outras informações
  const [photo, setPhoto] = useState<string>("");
  const [
    physicalActivityRestrictionCheck,
    setPhysicalActivityRestrictionCheck,
  ] = useState<number>(0);
  const [
    physicalActivityRestrictionObservations,
    setPhysicalActivityRestrictionObservations,
  ] = useState<string | null>(null);
  const [responsibleName, setResponsibleName] = useState<string>("");
  const [responsiblePhone, setResponsiblePhone] = useState<string>("");
  const [responsibleRelationship, setResponsibleRelationship] =
    useState<string>("");
  const [responsibleCpf, setResponsibleCpf] = useState<string | null>(null);
  const [responsibleRg, setResponsibleRg] = useState<string | null>(null);
  const [rg, setRg] = useState<string | null>(null);
  const [susNumber, setSusNumber] = useState<string | null>(null);
  const [schoolTransportCheck, setSchoolTransportCheck] = useState<number>(0);
  const [nisNumber, setNisNumber] = useState<string | null>(null);
  const [oldBirthCertificateCheck, setOldBirthCertificateCheck] =
    useState<number>(0);

  // Outros dados específicos
  const [birthCertificate, setBirthCertificate] = useState<string | null>(null);
  const [birthCertificateIssueDate, setBirthCertificateIssueDate] = useState<
    string | null
  >(null);
  const [birthCertificateRegistry, setBirthCertificateRegistry] = useState<
    string | null
  >(null);
  const [imageRightCheck, setImageRightCheck] = useState<number>(0);
  function createStudent() {}
  return (
    <Box sx={{ marginTop: "1rem" }}>
      <form>
        <Box
          sx={{
            width: "100%",
            height: "400px",
            overflowY: "auto",
            paddingBottom: "70px",
          }}
        >
          <FormPageContainer style={{ paddingTop: "1rem" }}>
            <FormSectionContainer>
              <BigFormContainer>
                <AppTextField
                  required
                  sx={{ width: "100%" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="Nome"
                />
              </BigFormContainer>

              <BigFormContainer>
                <AppTextField
                  sx={{ width: "100%" }}
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  type="date"
                  label="Nascimento"
                  required
                />
              </BigFormContainer>

              <BigFormContainer>
                <FormControl fullWidth>
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
                    <MenuItem sx={{ color: colors.main }} value={"M"}>
                      Masculino
                    </MenuItem>
                    <MenuItem sx={{ color: colors.main }} value={"F"}>
                      Feminino
                    </MenuItem>
                  </Select>
                </FormControl>
              </BigFormContainer>

              <BigFormContainer>
                <AppTextField
                  sx={{ width: "100%" }}
                  value={birthplace || ""}
                  onChange={(e) => setBirthplace(e.target.value)}
                  label="Cidade de Nascimento"
                  required
                />
              </BigFormContainer>

              <BigFormContainer>
                <AppTextField
                  sx={{ width: "100%" }}
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  label="Nome do Responsável"
                  required
                />
              </BigFormContainer>

              <BigFormContainer>
                <AppTextField
                  sx={{ width: "100%" }}
                  value={fatherPhone}
                  onChange={(e) => setFatherPhone(e.target.value)}
                  label="Telefone do Responsável"
                  type="tel"
                  required
                />
              </BigFormContainer>
              <BigFormContainer>
                <AppTextField
                  sx={{ width: "100%" }}
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  label="CPF"
                />
              </BigFormContainer>
            </FormSectionContainer>
            <FormSectionContainer>
              <BigFormContainer>
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
                    value={studentStatus}
                    label="Situação"
                    onChange={(e) => {
                      setStudentStatus(e.target.value);
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
              </BigFormContainer>

              <BigFormContainer>
                <AppTextField
                  sx={{ width: "100%" }}
                  value={classe.description}
                  onChange={(e) =>
                    setClasse({ ...classe, description: e.target.value })
                  }
                  label="Classe"
                />
              </BigFormContainer>
            </FormSectionContainer>
          </FormPageContainer>
        </Box>
        <SalveDataPageButtonContainer
          style={{
            justifyContent: "flex-end",
            width: "100%",
            position: "fixed",
            backgroundColor: "#fff",
            zIndex: 999,
            bottom: 0,
            right: 0,
            padding: "1rem",
            boxShadow: "0 -4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <BigFormContainer>
            <LoadingButton
              type="submit"
              loading={loading}
              onClick={() => {
                createStudent();
              }}
              size="small"
              variant="contained"
              sx={{
                backgroundColor: colors.main,
                padding: "0.5rem",
                width: "100%",
              }}
              startIcon={
                <Icons.CheckIcon
                  fontSize="small"
                  color="inherit"
                  sx={{ color: "#fff" }}
                />
              }
            >
              Salvar
            </LoadingButton>
          </BigFormContainer>
        </SalveDataPageButtonContainer>
      </form>
    </Box>
  );
};

export default StudentAdd;
