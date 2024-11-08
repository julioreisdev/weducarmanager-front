import { FC, useState } from "react";
import Icons from "../../utils/icons";
import { Box, Button } from "@mui/material";
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
} from "../../components/style";
import AppTextField from "../../components/AppTextField";

interface IProps {
  update: () => void;
  onClose: () => void;
}

const StudentAdd: FC<IProps> = ({ update, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [name, setName] = useState<string>("");

  function createStudent() {}
  return (
    <Box sx={{ marginTop: "1rem" }}>
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
          </FormSectionContainer>
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
          </FormSectionContainer>
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
