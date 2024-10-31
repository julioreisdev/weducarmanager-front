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
    name: "Ficha de matrícula",
    bgColor: colors.blue,
    url: "/matriz.png",
    disabled: false,
  },
  {
    name: "Ocorrências",
    bgColor: colors.blue,
    url: "/ocorrencias.png",
    disabled: true,
  },
  {
    name: "Mensagens",
    bgColor: colors.blue,
    url: "/mensagens.png",
    disabled: true,
  },
  {
    name: "Declarações",
    bgColor: colors.blue,
    url: "/declaracoes.png",
    disabled: true,
  },
  {
    name: "Informar Chegada",
    bgColor: colors.blue,
    url: "/chegada.png",
    disabled: true,
  },
  {
    name: "Justificar Faltas",
    bgColor: colors.blue,
    url: "/justificar_faltas.png",
    disabled: true,
  },
  {
    name: "Avaliações",
    bgColor: colors.blue,
    url: "/prova.png",
    disabled: true,
  },
  {
    name: "Frequência Escolar",
    bgColor: colors.blue,
    url: "/frequencia.png",
    disabled: true,
  },
  {
    name: "Boletim Escolar",
    bgColor: colors.blue,
    url: "/avaliacoes_admin.png",
    disabled: true,
  },
  {
    name: "Histórico Escolar",
    bgColor: colors.blue,
    url: "/historico_aluno.png",
    disabled: true,
  },
  {
    name: "Ficha Avaliação Individual",
    bgColor: colors.blue,
    url: "/ficha_indiv.png",
    disabled: true,
  },
  {
    name: "Relatórios Educação Infantil",
    bgColor: colors.blue,
    url: "/relat.png",
    disabled: true,
  },
];

const Students: FC = () => {
  return (
    <>
      <SectionTitle>Alunos</SectionTitle>
      <FlexRowCenterWrap style={{ gap: "1rem" }}>
        {items.map((i) => (
          <CardAdminContainer key={i.name}>
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
