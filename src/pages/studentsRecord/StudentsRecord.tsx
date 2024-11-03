import { FC } from "react";
import { FlexRowCenterWrap, SectionTitle } from "../../components/style";
import { UseStudents } from "../../hooks/useStudents";

const StudentsRecord: FC = () => {
  const { students } = UseStudents({
    id_instancia: Number(localStorage.getItem("id_instancia")),
    order: "A-Z",
    id_ano_letivo: 1,
    initial_row: 0,
    final_row: 100,
  });
  return (
    <>
      <SectionTitle>Alunos - Ficha de Matrícula</SectionTitle>
      <FlexRowCenterWrap style={{ gap: "1rem" }}></FlexRowCenterWrap>
    </>
  );
};

export default StudentsRecord;
