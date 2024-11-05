import { FC } from "react";
import {
  CardAdminContainer,
  Disabled,
  FlexRowCenterWrap,
  SectionTitle,
} from "../../components/style";
import AdminCard from "../../components/AdminCard";
import colors from "../../utils/colors";
import { useNavigate } from "react-router-dom";

const items = [
  {
    name: "Matrícula",
    bgColor: colors.blue,
    url: "/matriz.png",
    disabled: false,
    route: "matricula",
  },
  {
    name: "Rematrícula",
    bgColor: colors.blue,
    url: "/matriz.png",
    disabled: false,
    route: "rematricula",
  },
  {
    name: "Ocorrências",
    bgColor: colors.blue,
    url: "/ocorrencias.png",
    disabled: true,
    route: "",
  },
  {
    name: "Mensagens",
    bgColor: colors.blue,
    url: "/mensagens.png",
    disabled: true,
    route: "",
  },
  {
    name: "Declarações",
    bgColor: colors.blue,
    url: "/declaracoes.png",
    disabled: true,
    route: "",
  },
  {
    name: "Informar Chegada",
    bgColor: colors.blue,
    url: "/chegada.png",
    disabled: true,
    route: "",
  },
  {
    name: "Justificar Faltas",
    bgColor: colors.blue,
    url: "/justificar_faltas.png",
    disabled: true,
    route: "",
  },
  {
    name: "Avaliações",
    bgColor: colors.blue,
    url: "/prova.png",
    disabled: true,
    route: "",
  },
  {
    name: "Frequência Escolar",
    bgColor: colors.blue,
    url: "/frequencia.png",
    disabled: true,
    route: "",
  },
  {
    name: "Boletim Escolar",
    bgColor: colors.blue,
    url: "/avaliacoes_admin.png",
    disabled: true,
    route: "",
  },
  {
    name: "Histórico Escolar",
    bgColor: colors.blue,
    url: "/historico_aluno.png",
    disabled: true,
    route: "",
  },
  {
    name: "Ficha Avaliação Individual",
    bgColor: colors.blue,
    url: "/ficha_indiv.png",
    disabled: true,
    route: "",
  },
  {
    name: "Relatórios Educação Infantil",
    bgColor: colors.blue,
    url: "/relat.png",
    disabled: true,
    route: "",
  },
];

const Students: FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <SectionTitle>Alunos</SectionTitle>
      <FlexRowCenterWrap style={{ gap: "1rem" }}>
        {items.map((i) => (
          <CardAdminContainer
            onClick={() => {
              navigate(`${i.route}`);
            }}
            key={i.name}
          >
            {i.disabled ? (
              <Disabled>
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

export default Students;
