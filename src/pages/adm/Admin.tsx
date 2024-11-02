import { FC } from "react";
import {
  CardAdminContainer,
  Disabled,
  FlexRowCenterWrap,
  SectionTitle,
} from "../../components/style";
import AdminCard from "../../components/AdminCard";
import colors from "../../utils/colors";

const items = [
  {
    name: "Cargos",
    bgColor: colors.blue,
    url: "/cargos.png",
    disabled: true,
  },
  {
    name: "Funcionários",
    bgColor: colors.blue,
    url: "/admin_func.png",
    disabled: true,
  },
  {
    name: "Anos Letivos",
    bgColor: colors.blue,
    url: "/anos.png",
    disabled: true,
  },
  {
    name: "Matriz Curricular",
    bgColor: colors.blue,
    url: "/matriz.png",
    disabled: true,
  },
  {
    name: "Livro de Ponto",
    bgColor: colors.blue,
    url: "/livro.png",
    disabled: true,
  },
  {
    name: "Avaliações",
    bgColor: colors.blue,
    url: "/avaliacoes_admin.png",
    disabled: true,
  },

  {
    name: "Indicadores da Rede",
    bgColor: colors.blue,
    url: "/indicadores.png",
    disabled: true,
  },

  {
    name: "Transporte Escolar",
    bgColor: colors.blue,
    url: "/transporte.png",
    disabled: true,
  },

  {
    name: "Cadastro de Escola",
    bgColor: colors.blue,
    url: "/cadastro.png",
    disabled: true,
  },
];

const Admin: FC = () => {
  return (
    <>
      <SectionTitle>Administrativo</SectionTitle>
      <FlexRowCenterWrap style={{ gap: "1rem" }}>
        {items.map((i) => (
          <CardAdminContainer key={i.name}>
            {i.disabled ? (
              <Disabled>
                {" "}
                <AdminCard title={i.name} bgColor={i.bgColor} url={i.url} />
              </Disabled>
            ) : (
              <AdminCard title={i.name} bgColor={i.bgColor} url={i.url} />
            )}
          </CardAdminContainer>
        ))}
      </FlexRowCenterWrap>
    </>
  );
};

export default Admin;
