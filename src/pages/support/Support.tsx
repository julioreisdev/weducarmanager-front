import { FC } from "react";
import { SectionTitle } from "../../components/style";
import { Box, Card } from "@mui/material";
import colors from "../../utils/colors";
import Icons from "../../utils/icons";

const Support: FC = () => {
  return (
    <>
      <SectionTitle>Suporte</SectionTitle>
      <Card
        sx={{
          backgroundColor: "#FAFAFA",
          padding: 0,
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            padding: "0.5rem",
            backgroundColor: colors.main,
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Icons.ForumIcon sx={{ color: "#fff", fontSize: "4rem" }} />
          <Box sx={{ color: "#fff" }}>
            <h4>Precisa de ajuda?</h4>
            <p>Fale com um de nossos atendentes!</p>
          </Box>
        </Box>
        <a href="https://wa.me/558981191501?text=Olá, gostaria de ajuda com o sistema Weducar!">
          <Box sx={{ color: colors.main, padding: "0.5rem" }}>
            <h4>Estamos no WhatsApp</h4>
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <Icons.WhatsAppIcon
                sx={{ color: colors.green, fontSize: "1rem" }}
              />
              <p>(89)9 8105-53-15</p>
            </Box>
          </Box>
        </a>
        <a href="mailto:suporte@weducar.com">
          <Box sx={{ color: colors.main, padding: "0.5rem" }}>
            <h4>Envie um e-mail</h4>
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <Icons.MailOutlineIcon
                sx={{ color: colors.red, fontSize: "1rem" }}
              />
              <p>suporte@weducar.com</p>
            </Box>
          </Box>
        </a>
        <Box sx={{ color: colors.main, padding: "0.5rem" }}>
          <h4>Horário de atendimento</h4>
          <p>Segunda a Sexta das 08h00 às 18h00 | Sábado das 08h00 às 12h00</p>
        </Box>
      </Card>
    </>
  );
};

export default Support;
