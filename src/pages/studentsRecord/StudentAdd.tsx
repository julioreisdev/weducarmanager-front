import { FC, useEffect, useState } from "react";
import Icons from "../../utils/icons";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
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
import { UseShools } from "../../hooks/useSchools";
import { UseShoolYears } from "../../hooks/UseSchoolYears";
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";

interface IProps {
  update: () => void;
  onClose: () => void;
}

const StudentAdd: FC<IProps> = ({ update, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [name, setName] = useState<string>("");
  const [photo, setPhoto] = useState<File | Blob | null>();
  const [ethnicitySelected, setEthnicitySelected] = useState("");
  const [schoolSelected, setSchoolSelected] = useState("");
  const [schoolYearSelected, setSchoolYearSelected] = useState("");
  const { ethnicity } = UseEthnicity();
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState(" ");
  const { schools, schoolsLoading } = UseShools();
  const { schoolYears } = UseShoolYears();
  const [censo, setCenso] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState(" ");
  const [natural, setNatural] = useState("");
  const [nis, setNis] = useState("");
  const [sus, setSus] = useState("");
  const [certificate, setCertificate] = useState("");
  const [expired, setExpired] = useState("");
  const [office, setOffice] = useState("");
  const [useTransport, setUseTransport] = useState(false);
  const [pcd, setPcd] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  useEffect(() => {
    if (schools?.length === 1) {
      setSchoolSelected(schools[0].id.toString());
    }
  }, [schoolsLoading]);

  function createStudent() {}
  function nextButtonIsValid() {
    if (step === 1) {
      return (
        name &&
        birthday &&
        birthday !== " " &&
        ethnicity &&
        gender &&
        schoolSelected &&
        schoolYearSelected
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
          paddingBottom: "60px",
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
                    Escola *
                  </InputLabel>
                  <Select
                    size="small"
                    labelId="demo-simple-select-label-Escola"
                    id="demo-simple-select-Escola"
                    value={schoolSelected}
                    label="Escola *"
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
                    Ano/Série *
                  </InputLabel>
                  <Select
                    size="small"
                    labelId="demo-simple-select-label-Ano/Série"
                    id="demo-simple-select-Ano/Série"
                    value={schoolYearSelected}
                    label="Ano/Série *"
                    onChange={(e) => {
                      setSchoolYearSelected(e.target.value);
                    }}
                    sx={sxToSelect}
                  >
                    {schoolYears
                      ?.filter((i) => i.school === Number(schoolSelected))
                      ?.map((i) => (
                        <MenuItem
                          key={i.id}
                          sx={{ color: colors.main }}
                          value={i.id}
                        >
                          {i.series}
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
                      checked={pcd}
                      color="primary"
                      name="pcd"
                      onChange={() => setPcd((previousState) => !previousState)}
                    />
                  }
                  label="Pessoa Com Deficiência?"
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
            </FormSectionContainer>
          </FormPageContainer>
        ) : (
          <>Outra coisa</>
        )}
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
    </Box>
  );
};

export default StudentAdd;
