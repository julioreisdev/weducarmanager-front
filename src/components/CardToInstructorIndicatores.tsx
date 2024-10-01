import { FC } from "react";
import styled from "styled-components";
import { FlexRowCenterBet } from "./style";

interface IProps {
  awaiting: number;
  confirmed: number;
  invalid: number;
  color: string;
}

const CardToInstructorIndicatores: FC<IProps> = ({
  awaiting,
  confirmed,
  invalid,
  color,
}) => {
  return (
    <FlexRowCenterBet style={{ width: "50%" }}>
      <Item>
        <h6 style={{ color }}>Confirmadas</h6>
        <h6>{confirmed}</h6>
      </Item>
      <Item>
        <h6 style={{ color }}>Aguardando</h6>
        <h6>{awaiting}</h6>
      </Item>
      <Item>
        <h6 style={{ color }}>Inválidas</h6>
        <h6>{invalid}</h6>
      </Item>
      <Item>
        <h6 style={{ color }}>Total</h6>
        <h6>{confirmed + awaiting + invalid}</h6>
      </Item>
    </FlexRowCenterBet>
  );
};

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default CardToInstructorIndicatores;
