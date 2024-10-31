import { FC } from "react";
import { SectionTitle } from "../../components/style";
import Up from "./Up";
import Pedagogic from "./Pedagogic";
import Analytics from "./Analytics";

const School: FC = () => {
  return (
    <>
      <SectionTitle>Escola</SectionTitle>
      <Up />
      <Pedagogic />
      <Analytics />
    </>
  );
};

export default School;
