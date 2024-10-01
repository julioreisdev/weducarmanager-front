import { FC } from "react";
import { TInstructorIndicatores } from "../../interfaces/instructor.interface";

const data: TInstructorIndicatores = [
  {
    id: 1,
    name: "Júlio Cezar dos Reis Pais",
    disciplines: [],
  },
];

const InstructorIndicatores: FC = () => {
  return (
    <>
      {data.map((item) => (
        <h6 key={item.id}>{item.name}</h6>
      ))}
    </>
  );
};

export default InstructorIndicatores;
