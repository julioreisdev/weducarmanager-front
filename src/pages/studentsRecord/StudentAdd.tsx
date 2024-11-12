import { FC, useEffect, useState } from "react";
import Icons from "../../utils/icons";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Switch,
} from "@mui/material";
import colors from "../../utils/colors";
import { LoadingButton } from "@mui/lab";
import {
  BigFormActionContainer,
  BigFormContainer,
  Disabled,
  FlexRowCenterBet,
  FormPageContainer,
  FormSectionContainer,
  SalveDataPageButtonContainer,
  sxToInputLabel,
  sxToSelect,
} from "../../components/style";
import AppTextField from "../../components/AppTextField";
import { UseEthnicity } from "../../hooks/UseEthnicity";
import { UseShools } from "../../hooks/UseSchools";
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";
import { api, getHeaders } from "../../utils/api";
import { UseSchoolClasses } from "../../hooks/UseSchoolClasses";
import { UseStates } from "../../hooks/UseStates";
import { UseCities } from "../../hooks/UseCities";

interface IProps {
  update: () => void;
  onClose: () => void;
}

const houses = [
  { name: "PAI E MÃE", id: 1 },
  { name: "MÃE", id: 2 },
  { name: "PAI", id: 3 },
  { name: "AVÓS", id: 4 },
  { name: "OUTROS", id: 5 },
];

const StudentAdd: FC<IProps> = ({ update, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<File | Blob | null>();
  const [ethnicitySelected, setEthnicitySelected] = useState("");
  const [schoolSelected, setSchoolSelected] = useState("");
  const [schoolClassSelected, setSchoolClassSelected] = useState("");
  const { ethnicity } = UseEthnicity();
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState(" ");
  const { schools, schoolsLoading } = UseShools();
  const { schoolClasses, schoolClassesLoading } = UseSchoolClasses(
    Number(schoolSelected)
  );
  const [censo, setCenso] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState(" ");
  const [natural, setNatural] = useState("");
  const [nis, setNis] = useState("");
  const [sus, setSus] = useState("");
  const [certificate, setCertificate] = useState("");
  const [expired, setExpired] = useState(" ");
  const [office, setOffice] = useState("");
  const [useTransport, setUseTransport] = useState(false);
  const [pcd, setPcd] = useState(false);
  const [pcdDescription, setPcdDescription] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [responsibleName, setResponsibleName] = useState("");
  const [responsiblePhone, setResponsiblePhone] = useState("");
  const [responsibleHouse, setResponsibleHouse] = useState("");
  const [responsibleRg, setResponsibleRg] = useState("");
  const [responsibleCpf, setResponsibleCpf] = useState("");
  const [responsibleAddress, setResponsibleAddress] = useState("");
  const [responsibleAddressN, setResponsibleAddressN] = useState("");
  const [responsibleAddressCity, setResponsibleAddressCity] = useState("");
  const [responsibleAddressState, setResponsibleAddressState] = useState("");
  const [motherName, setMotherName] = useState("");
  const [motherPhone, setMotherPhone] = useState("");
  const [motherRg, setMotherRg] = useState("");
  const [motherCpf, setMotherCpf] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [fatherPhone, setFatherPhone] = useState("");
  const [fatherRg, setFatherRg] = useState("");
  const [fatherCpf, setFatherCpf] = useState("");

  // Estado para alergia
  const [allergy, setAllergy] = useState(false);
  const [allergyDescription, setAllergyDescription] = useState("");

  // Estado para acompanhamento médico ou psicológico
  const [hasMedicalFollowUp, setHasMedicalFollowUp] = useState(false);
  const [medicalFollowUpReason, setMedicalFollowUpReason] = useState("");

  // Estado para restrição a atividade física
  const [hasPhysicalActivityRestriction, setHasPhysicalActivityRestriction] =
    useState(false);
  const [
    physicalActivityRestrictionDescription,
    setPhysicalActivityRestrictionDescription,
  ] = useState("");

  // Estado para distúrbios
  const [hasDisturbance, setHasDisturbance] = useState(false);
  const [disturbanceDescription, setDisturbanceDescription] = useState("");
  const [disturbanceInstructions, setDisturbanceInstructions] = useState("");

  // Estado para medicação de uso contínuo
  const [usesContinuousMedication, setUsesContinuousMedication] =
    useState(false);
  const [continuousMedicationDescription, setContinuousMedicationDescription] =
    useState("");

  // Estado para restrição alimentar
  const [hasDietaryRestriction, setHasDietaryRestriction] = useState(false);
  const [dietaryRestrictionDescription, setDietaryRestrictionDescription] =
    useState("");

  const [observation, setObservation] = useState("");

  const [openError, setOpenError] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const { states, statesLoading } = UseStates();
  const { cities, citiesLoading } = UseCities(Number(responsibleAddressState));

  useEffect(() => {
    if (schools?.length === 1) {
      setSchoolSelected(schools[0].id.toString());
    }
  }, [schoolsLoading]);

  function createStudent() {
    setLoading(true);

    const data = new FormData();

    //1
    data.append("name", name);
    data.append("gender", gender);
    data.append("cor", ethnicitySelected);
    data.append("census_id", censo);
    //data.append("school", schoolSelected);
    data.append("class", schoolClassSelected);
    data.append("rg", rg);
    data.append("cpf", cpf);
    data.append("birthplace", natural);
    data.append("birth_day", birthday);
    data.append("student_status", "1");
    data.append("instance", localStorage.getItem("instance_id") || "");
    if (photo) {
      data.append("photo", photo);
    }
    data.append("sus_number", sus);
    data.append("sis_number", nis);
    data.append("birth_certificate_issue_date", expired);
    data.append("birth_certificate", certificate);
    data.append("birth_certificate_registry", office);

    data.append("image_right_check", acceptTerms ? "1" : "0");
    data.append("school_transport_check", useTransport ? "1" : "0");
    data.append("disability_check", pcd ? "1" : "0");
    data.append("disability_observations", pcdDescription);

    //2
    data.append("housing", responsibleHouse);
    data.append("responsible_name", responsibleName);
    const responsible_relationship =
      houses.find((i) => i.id === Number(responsibleHouse))?.name || "";
    data.append("responsible_relationship", responsible_relationship);
    data.append("address", responsibleAddress);
    data.append("neighborhood", responsibleAddressN);
    data.append("city", responsibleAddressCity);
    data.append("responsible_phone", responsiblePhone);
    data.append("responsible_rg", responsibleRg);
    data.append("responsible_cpf", responsibleCpf);
    data.append("mother_name", motherName);
    data.append("mother_rg", motherRg);
    data.append("mother_cpf", motherCpf);
    data.append("mother_phone", motherPhone);
    data.append("father_name", fatherName);
    data.append("father_rg", fatherRg);
    data.append("father_cpf", fatherCpf);
    data.append("father_phone", fatherPhone);

    //3
    data.append("allergy_check", allergy ? "1" : "0");
    data.append("allergy_observations", allergyDescription);
    data.append("medical_monitoring_check", hasMedicalFollowUp ? "1" : "0");
    data.append("medical_monitoring_observations", medicalFollowUpReason);
    data.append(
      "physical_activity_restriction_check",
      hasPhysicalActivityRestriction ? "1" : "0"
    );
    data.append(
      "physical_activity_restriction_observations",
      physicalActivityRestrictionDescription
    );
    data.append("disorder_check", hasDisturbance ? "1" : "0");
    data.append("disorder_observations", disturbanceDescription);
    data.append("disorder_instructions", disturbanceInstructions);

    data.append("medical_monitoring_check", hasMedicalFollowUp ? "1" : "0");
    data.append("medical_monitoring_observations", medicalFollowUpReason);

    data.append("food_restriction_check", hasDietaryRestriction ? "1" : "0");
    data.append("food_restriction_observations", dietaryRestrictionDescription);
    data.append("observations", observation);

    api()
      .post(``, data, { headers: getHeaders() })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        setSnackMessage(err.response.data.detail || err.message);
        setOpenError(true);
        setLoading(false);
      });
  }

  function nextButtonIsValid() {
    if (step === 1) {
      return (
        name &&
        birthday &&
        birthday !== " " &&
        ethnicity &&
        gender &&
        schoolSelected &&
        schoolClassSelected
      );
    }
    if (step === 2) {
      return (
        responsibleHouse &&
        responsibleName &&
        responsibleAddress &&
        responsibleAddressN &&
        responsibleAddressCity &&
        responsibleAddressState
      );
    }
    return false;
  }
  return (
    <Box sx={{ marginTop: "1rem" }}>
      <Box
        sx={{
          width: "100%",
          height: "480px",
          overflowY: "auto",
          paddingTop: "0.5rem",
          paddingBottom: "40px",
        }}
      >
        <div style={{ width: "100%", marginBottom: "1.5rem" }}>
          <ProgressBar
            width={"100%"}
            percent={(step * 100) / 3}
            filledBackground="linear-gradient(to right, #c8afff, #682EE3)"
          />
        </div>
        {step === 1 ? (
          <FormPageContainer>
            <FormSectionContainer>
              <BigFormContainer>
                <div style={{ textAlign: "center" }}>
                  <input
                    type="file"
                    id="file-input"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files) {
                        setPhoto(e.target.files[0]);
                      }
                    }}
                  />
                  <label
                    htmlFor="file-input"
                    style={{
                      display: "inline-block",
                      width: "90px",
                      height: "90px",
                      backgroundImage: photo
                        ? `url(${URL.createObjectURL(photo)})`
                        : `url("https://w7.pngwing.com/pngs/589/83/png-transparent-account-avatar-contact-people-profile-user-basic-icon-thumbnail.png")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: "50%",
                      border: "2px solid #ccc",
                      cursor: "pointer",
                      transition: "border-color 0.3s",
                    }}
                  >
                    {!photo && (
                      <span
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          fontSize: "24px",
                          color: "#ccc",
                        }}
                      ></span>
                    )}
                  </label>
                </div>
              </BigFormContainer>
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
                  required
                  sx={{ width: "100%" }}
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  label="Nascimento"
                  type="date"
                />
              </BigFormContainer>
              <BigFormContainer>
                <FormControl fullWidth>
                  <InputLabel
                    sx={sxToInputLabel}
                    id="demo-simple-select-label-Etnia"
                  >
                    Etnia *
                  </InputLabel>
                  <Select
                    size="small"
                    labelId="demo-simple-select-label-Etnia"
                    id="demo-simple-select-Etnia"
                    value={ethnicitySelected}
                    label="Etnia *"
                    onChange={(e) => {
                      setEthnicitySelected(e.target.value);
                    }}
                    sx={sxToSelect}
                  >
                    {ethnicity?.map((i) => (
                      <MenuItem
                        key={i.id}
                        sx={{ color: colors.main }}
                        value={i.id}
                      >
                        {i.description}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </BigFormContainer>
              <BigFormContainer>
                <FormControl fullWidth>
                  <InputLabel
                    sx={sxToInputLabel}
                    id="demo-simple-select-label-gender"
                  >
                    Sexo *
                  </InputLabel>
                  <Select
                    size="small"
                    labelId="demo-simple-select-label-gender"
                    id="demo-simple-select-gender"
                    value={gender}
                    label="Sexo *"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                    sx={sxToSelect}
                  >
                    <MenuItem sx={{ color: colors.main }} value={"M"}>
                      MASCULINO
                    </MenuItem>
                    <MenuItem sx={{ color: colors.main }} value={"F"}>
                      FEMININO
                    </MenuItem>
                  </Select>
                </FormControl>
              </BigFormContainer>
              <BigFormContainer>
                <AppTextField
                  sx={{ width: "100%" }}
                  value={censo}
                  onChange={(e) => setCenso(e.target.value)}
                  label="ID Censo"
                />
              </BigFormContainer>
            </FormSectionContainer>
            <FormSectionContainer>
              <BigFormContainer>
                <FormControl fullWidth>
                  <InputLabel
                    sx={sxToInputLabel}
                    id="demo-simple-select-label-Escola"
                  >
                    {schoolsLoading ? "Carregando..." : "Escola *"}
                  </InputLabel>
                  <Select
                    size="small"
                    labelId="demo-simple-select-label-Escola"
                    id="demo-simple-select-Escola"
                    value={schoolSelected}
                    label={schoolsLoading ? "Carregando..." : "Escola *"}
                    onChange={(e) => {
                      setSchoolSelected(e.target.value);
                    }}
                    sx={sxToSelect}
                  >
                    {schools?.map((i) => (
                      <MenuItem
                        key={i.id}
                        sx={{ color: colors.main }}
                        value={i.id}
                      >
                        {i.corporate_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </BigFormContainer>
              <BigFormContainer>
                <FormControl fullWidth>
                  <InputLabel
                    sx={sxToInputLabel}
                    id="demo-simple-select-label-Ano/Série"
                  >
                    {schoolClassesLoading ? "Carregando..." : "Turma *"}
                  </InputLabel>
                  <Select
                    size="small"
                    labelId="demo-simple-select-label-Ano/Série"
                    id="demo-simple-select-Ano/Série"
                    value={schoolClassSelected}
                    label={schoolClassesLoading ? "Carregando..." : "Turma *"}
                    onChange={(e) => {
                      setSchoolClassSelected(e.target.value);
                    }}
                    sx={sxToSelect}
                  >
                    {schoolClasses?.map((i) => (
                      <MenuItem
                        key={i.id}
                        sx={{ color: colors.main }}
                        value={i.id}
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
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  label="CPF"
                />
              </BigFormContainer>
              <BigFormContainer>
                <AppTextField
                  sx={{ width: "100%" }}
                  value={rg}
                  onChange={(e) => setRg(e.target.value)}
                  label="RG"
                />
              </BigFormContainer>
              <BigFormContainer>
                <AppTextField
                  sx={{ width: "100%" }}
                  value={natural}
                  onChange={(e) => setNatural(e.target.value)}
                  label="Naturalidade"
                />
              </BigFormContainer>
              <BigFormContainer>
                <AppTextField
                  sx={{ width: "100%" }}
                  value={nis}
                  onChange={(e) => setNis(e.target.value)}
                  label="NIS"
                />
              </BigFormContainer>
              <BigFormContainer>
                <AppTextField
                  sx={{ width: "100%" }}
                  value={sus}
                  onChange={(e) => setSus(e.target.value)}
                  label="SUS"
                />
              </BigFormContainer>
            </FormSectionContainer>
            <FormSectionContainer>
              <BigFormContainer>
                <AppTextField
                  sx={{ width: "100%" }}
                  value={certificate}
                  onChange={(e) => setCertificate(e.target.value)}
                  label="N° Certidão de Nascimento"
                />
              </BigFormContainer>
              <BigFormContainer>
                <AppTextField
                  sx={{ width: "100%" }}
                  value={expired}
                  onChange={(e) => setExpired(e.target.value)}
                  label="Data de Expedição"
                  type="date"
                />
              </BigFormContainer>
              <BigFormContainer>
                <AppTextField
                  sx={{ width: "100%" }}
                  value={office}
                  onChange={(e) => setOffice(e.target.value)}
                  label="Registro do Cartório"
                />
              </BigFormContainer>
              <BigFormContainer>
                <FormControlLabel
                  control={
                    <Switch
                      checked={useTransport}
                      color="primary"
                      name="pcd"
                      onChange={() =>
                        setUseTransport((previousState) => !previousState)
                      }
                    />
                  }
                  label="Utiliza Transporte Escolar?"
                />
              </BigFormContainer>

              <BigFormContainer>
                <FormControlLabel
                  control={
                    <Switch
                      checked={acceptTerms}
                      color="primary"
                      name="pcd"
                      onChange={() =>
                        setAcceptTerms((previousState) => !previousState)
                      }
                    />
                  }
                  label="Autoriza o uso de imagem?"
                />
              </BigFormContainer>
              <BigFormContainer>
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
              </BigFormContainer>
              {pcd ? (
                <BigFormContainer>
                  <AppTextField
                    sx={{ width: "100%" }}
                    value={pcdDescription}
                    onChange={(e) => setPcdDescription(e.target.value)}
                    label="Descreva a deficiência"
                    multiline
                    rows={2}
                  />
                </BigFormContainer>
              ) : null}
            </FormSectionContainer>
          </FormPageContainer>
        ) : step === 2 ? (
          <FormPageContainer>
            <FormSectionContainer>
              <BigFormContainer>
                <FormControl fullWidth>
                  <InputLabel
                    sx={sxToInputLabel}
                    id="demo-simple-select-label-House"
                  >
                    Com quem o aluno mora? *
                  </InputLabel>
                  <Select
                    size="small"
                    labelId="demo-simple-select-label-House"
                    id="demo-simple-select-House"
                    value={responsibleHouse}
                    label="Com quem o aluno mora *"
                    onChange={(e) => {
                      setResponsibleHouse(e.target.value);
                    }}
                    sx={sxToSelect}
                  >
                    {houses.map((i) => (
                      <MenuItem
                        key={i.id}
                        sx={{ color: colors.main }}
                        value={i.id}
                      >
                        {i.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </BigFormContainer>
              <BigFormContainer>
                <AppTextField
                  required
                  sx={{ width: "100%" }}
                  value={responsibleName}
                  onChange={(e) => setResponsibleName(e.target.value)}
                  label="Nome do responsável"
                />
              </BigFormContainer>
              <BigFormContainer>
                <AppTextField
                  required
                  sx={{ width: "100%" }}
                  value={responsibleAddress}
                  onChange={(e) => setResponsibleAddress(e.target.value)}
                  label="Endereço"
                />
              </BigFormContainer>
              <BigFormContainer>
                <AppTextField
                  required
                  sx={{ width: "100%" }}
                  value={responsibleAddressN}
                  onChange={(e) => setResponsibleAddressN(e.target.value)}
                  label="Bairro"
                />
              </BigFormContainer>
              <BigFormContainer>
                <FormControl fullWidth>
                  <InputLabel
                    sx={sxToInputLabel}
                    id="demo-simple-select-label-House"
                  >
                    {statesLoading ? "Carregando..." : "Estado *"}
                  </InputLabel>
                  <Select
                    size="small"
                    labelId="demo-simple-select-label-House"
                    id="demo-simple-select-House"
                    value={responsibleAddressState}
                    label={statesLoading ? "Carregando..." : "Estado *"}
                    onChange={(e) => {
                      setResponsibleAddressState(e.target.value);
                    }}
                    sx={sxToSelect}
                  >
                    {states?.map((i) => (
                      <MenuItem
                        key={i.id}
                        sx={{ color: colors.main }}
                        value={i.id}
                      >
                        {i.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </BigFormContainer>

              <BigFormContainer>
                <FormControl fullWidth>
                  <InputLabel
                    sx={sxToInputLabel}
                    id="demo-simple-select-label-House"
                  >
                    {citiesLoading ? "Carregando..." : "Cidade *"}
                  </InputLabel>
                  <Select
                    size="small"
                    labelId="demo-simple-select-label-House"
                    id="demo-simple-select-House"
                    value={responsibleAddressCity}
                    label={statesLoading ? "Carregando..." : "Cidade *"}
                    onChange={(e) => {
                      setResponsibleAddressCity(e.target.value);
                    }}
                    sx={sxToSelect}
                  >
                    {cities?.map((i) => (
                      <MenuItem
                        key={i.id}
                        sx={{ color: colors.main }}
                        value={"1"}
                      >
                        {i.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </BigFormContainer>

              <BigFormContainer>
                <AppTextField
                  sx={{ width: "100%" }}
                  value={responsiblePhone}
                  onChange={(e) => setResponsiblePhone(e.target.value)}
                  label="Telefone do responsável"
                />
              </BigFormContainer>
            </FormSectionContainer>
            <FormSectionContainer>
              <BigFormContainer>
                <AppTextField
                  sx={{ width: "100%" }}
                  value={responsibleRg}
                  onChange={(e) => setResponsibleRg(e.target.value)}
                  label="RG do responsável"
                />
              </BigFormContainer>
              <BigFormContainer>
                <AppTextField
                  sx={{ width: "100%" }}
                  value={responsibleCpf}
                  onChange={(e) => setResponsibleCpf(e.target.value)}
                  label="CPF do responsável"
                />
              </BigFormContainer>

              <BigFormContainer>
                <AppTextField
                  sx={{ width: "100%" }}
                  value={motherName}
                  onChange={(e) => setMotherName(e.target.value)}
                  label="Nome da mãe"
                />
              </BigFormContainer>
              <BigFormContainer>
                <AppTextField
                  sx={{ width: "100%" }}
                  value={motherPhone}
                  onChange={(e) => setMotherPhone(e.target.value)}
                  label="Telefone da mãe"
                />
              </BigFormContainer>
              <BigFormContainer>
                <AppTextField
                  sx={{ width: "100%" }}
                  value={motherRg}
                  onChange={(e) => setMotherRg(e.target.value)}
                  label="RG da mãe"
                />
              </BigFormContainer>
              <BigFormContainer>
                <AppTextField
                  sx={{ width: "100%" }}
                  value={motherCpf}
                  onChange={(e) => setMotherCpf(e.target.value)}
                  label="CPF da mãe"
                />
              </BigFormContainer>
            </FormSectionContainer>
            <FormSectionContainer>
              <BigFormContainer>
                <AppTextField
                  sx={{ width: "100%" }}
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  label="Nome do pai"
                />
              </BigFormContainer>
              <BigFormContainer>
                <AppTextField
                  sx={{ width: "100%" }}
                  value={fatherPhone}
                  onChange={(e) => setFatherPhone(e.target.value)}
                  label="Telefone do pai"
                />
              </BigFormContainer>
              <BigFormContainer>
                <AppTextField
                  sx={{ width: "100%" }}
                  value={fatherRg}
                  onChange={(e) => setFatherRg(e.target.value)}
                  label="RG do pai"
                />
              </BigFormContainer>
              <BigFormContainer>
                <AppTextField
                  sx={{ width: "100%" }}
                  value={fatherCpf}
                  onChange={(e) => setFatherCpf(e.target.value)}
                  label="CPF do pai"
                />
              </BigFormContainer>
            </FormSectionContainer>
          </FormPageContainer>
        ) : step === 3 ? (
          <FormPageContainer>
            <FormSectionContainer>
              <BigFormContainer>
                <FormControlLabel
                  control={
                    <Switch
                      checked={allergy}
                      color="primary"
                      name="pcd"
                      onChange={() =>
                        setAllergy((previousState) => !previousState)
                      }
                    />
                  }
                  label="Possui alguma alergia?"
                />
              </BigFormContainer>
              {allergy ? (
                <BigFormContainer>
                  <AppTextField
                    sx={{ width: "100%" }}
                    value={allergyDescription}
                    onChange={(e) => setAllergyDescription(e.target.value)}
                    label="Descrição da alergia"
                    multiline={true}
                    rows={2}
                  />
                </BigFormContainer>
              ) : null}
              <BigFormContainer>
                <FormControlLabel
                  control={
                    <Switch
                      checked={hasMedicalFollowUp}
                      color="primary"
                      name="pcd"
                      onChange={() =>
                        setHasMedicalFollowUp((previousState) => !previousState)
                      }
                    />
                  }
                  label="Acompanhamento médico/psicológico?"
                />
              </BigFormContainer>
              {hasMedicalFollowUp ? (
                <BigFormContainer>
                  <AppTextField
                    sx={{ width: "100%" }}
                    value={medicalFollowUpReason}
                    onChange={(e) => setMedicalFollowUpReason(e.target.value)}
                    label="Motivo"
                    multiline={true}
                    rows={2}
                  />
                </BigFormContainer>
              ) : null}
              <BigFormContainer>
                <FormControlLabel
                  control={
                    <Switch
                      checked={hasPhysicalActivityRestriction}
                      color="primary"
                      name="pcd"
                      onChange={() =>
                        setHasPhysicalActivityRestriction(
                          (previousState) => !previousState
                        )
                      }
                    />
                  }
                  label="Restrição a alguma atividade Física?"
                />
              </BigFormContainer>
              {hasPhysicalActivityRestriction ? (
                <BigFormContainer>
                  <AppTextField
                    sx={{ width: "100%" }}
                    value={physicalActivityRestrictionDescription}
                    onChange={(e) =>
                      setPhysicalActivityRestrictionDescription(e.target.value)
                    }
                    label="Motivo"
                    multiline={true}
                    rows={2}
                  />
                </BigFormContainer>
              ) : null}
            </FormSectionContainer>
            <FormSectionContainer>
              {" "}
              <BigFormContainer>
                <FormControlLabel
                  control={
                    <Switch
                      checked={hasDisturbance}
                      color="primary"
                      name="pcd"
                      onChange={() =>
                        setHasDisturbance((previousState) => !previousState)
                      }
                    />
                  }
                  label="Apresenta algum distúrbio?"
                />
              </BigFormContainer>
              {hasDisturbance ? (
                <>
                  <BigFormContainer>
                    <AppTextField
                      sx={{ width: "100%" }}
                      value={disturbanceDescription}
                      onChange={(e) =>
                        setDisturbanceDescription(e.target.value)
                      }
                      label="Distúrbio"
                    />
                  </BigFormContainer>
                  <BigFormContainer>
                    <AppTextField
                      sx={{ width: "100%" }}
                      value={disturbanceInstructions}
                      onChange={(e) =>
                        setDisturbanceInstructions(e.target.value)
                      }
                      label="Instruções"
                      multiline={true}
                      rows={2}
                    />
                  </BigFormContainer>
                </>
              ) : null}
              <BigFormContainer>
                <FormControlLabel
                  control={
                    <Switch
                      checked={usesContinuousMedication}
                      color="primary"
                      name="pcd"
                      onChange={() =>
                        setUsesContinuousMedication(
                          (previousState) => !previousState
                        )
                      }
                    />
                  }
                  label="Medicação de uso contínuo?"
                />
              </BigFormContainer>
              {usesContinuousMedication ? (
                <BigFormContainer>
                  <AppTextField
                    sx={{ width: "100%" }}
                    value={continuousMedicationDescription}
                    onChange={(e) =>
                      setContinuousMedicationDescription(e.target.value)
                    }
                    label="Instruções"
                    multiline={true}
                    rows={2}
                  />
                </BigFormContainer>
              ) : null}
            </FormSectionContainer>
            <FormSectionContainer>
              <BigFormContainer>
                <FormControlLabel
                  control={
                    <Switch
                      checked={hasDietaryRestriction}
                      color="primary"
                      name="pcd"
                      onChange={() =>
                        setHasDietaryRestriction(
                          (previousState) => !previousState
                        )
                      }
                    />
                  }
                  label="Restrição alimentar?"
                />
              </BigFormContainer>
              {hasDietaryRestriction ? (
                <BigFormContainer>
                  <AppTextField
                    sx={{ width: "100%" }}
                    value={dietaryRestrictionDescription}
                    onChange={(e) =>
                      setDietaryRestrictionDescription(e.target.value)
                    }
                    label="Descrição da restrição"
                    multiline={true}
                    rows={2}
                  />
                </BigFormContainer>
              ) : null}
              <BigFormContainer>
                <AppTextField
                  sx={{ width: "100%" }}
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                  label="Observações gerais"
                  multiline={true}
                  rows={4}
                />
              </BigFormContainer>
            </FormSectionContainer>
          </FormPageContainer>
        ) : null}
      </Box>
      <SalveDataPageButtonContainer
        style={{
          justifyContent: "flex-end",
          alignItems: "flex-end",
          flexDirection: "column",
          width: "100%",
          position: "fixed",
          backgroundColor: "#fff",
          zIndex: 999,
          bottom: 0,
          right: 0,
          padding: "0.5rem",
          boxShadow: "0 -4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <BigFormActionContainer>
          <FlexRowCenterBet>
            {step === 1 ? (
              <Disabled style={{ width: "49%" }}>
                <Button
                  onClick={() => setStep(step - 1)}
                  size="small"
                  variant="outlined"
                  sx={{
                    color: colors.main,
                    borderColor: colors.main,
                    padding: "0.5rem",
                    width: "100%",
                  }}
                  startIcon={
                    <Icons.ArrowBackIosNewIcon
                      fontSize="small"
                      color="inherit"
                      sx={{ color: colors.main }}
                    />
                  }
                >
                  Voltar
                </Button>
              </Disabled>
            ) : (
              <Button
                onClick={() => setStep(step - 1)}
                size="small"
                variant="outlined"
                sx={{
                  color: colors.main,
                  borderColor: colors.main,
                  padding: "0.5rem",
                  width: "49%",
                }}
                startIcon={
                  <Icons.ArrowBackIosNewIcon
                    fontSize="small"
                    color="inherit"
                    sx={{ color: colors.main }}
                  />
                }
              >
                Voltar
              </Button>
            )}
            {step === 3 ? (
              <LoadingButton
                loading={loading}
                onClick={() => {
                  createStudent();
                }}
                size="small"
                variant="contained"
                sx={{
                  backgroundColor: colors.main,
                  padding: "0.5rem",
                  width: "49%",
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
            ) : (
              <Button
                onClick={() => {
                  setStep(step + 1);
                }}
                disabled={!nextButtonIsValid()}
                size="small"
                variant="contained"
                sx={{
                  backgroundColor: colors.main,
                  padding: "0.5rem",
                  width: "49%",
                }}
                endIcon={
                  <Icons.ArrowForwardIosIcon
                    fontSize="small"
                    color="inherit"
                    sx={{ color: "#fff" }}
                  />
                }
              >
                Continuar
              </Button>
            )}
          </FlexRowCenterBet>
        </BigFormActionContainer>
      </SalveDataPageButtonContainer>
      <Snackbar
        open={openError}
        onClose={() => setOpenError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenError(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StudentAdd;
