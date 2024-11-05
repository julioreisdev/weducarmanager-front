import styled from "styled-components";
import colors from "../utils/colors";

export const sxToInputLabel = {
  color: colors.main,
  "&.Mui-focused": {
    color: colors.main,
  },
  "&.MuiFormLabel-asterisk": {
    color: colors.main,
  },
};

export const sxToSelect = {
  color: colors.main,
  "& .MuiSelect-icon": {
    color: colors.main,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: colors.main,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: colors.main,
  },
};

export const menuProps = {
  PaperProps: {
    sx: {},
  },
};

export const FlexRowCenterBet = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FlexRowCenterWrap = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const FlexColCenter = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const SectionTitle = styled.h4`
  border-left: 4px solid #682ee3;
  padding-left: 0.5rem;
  margin-bottom: 1rem;
`;

export const TableItemTitle = styled.h5`
  border-left: 2px solid #682ee3;
  padding-left: 0.5rem;
  margin-bottom: 1rem;
  font-weight: 500;
`;

export const TableItemTitleSub = styled.h5`
  border-left: 2px solid #ffcc80;
  padding-left: 0.5rem;
  margin-bottom: 1rem;
  font-weight: 500;
`;

export const SectionSubTitle = styled.p`
  border-left: 2px solid #ffcc80;
  padding-left: 0.5rem;
  margin-bottom: 1rem;
  font-weight: 500;
`;

export const Disabled = styled.div`
  opacity: 0.3;
  pointer-events: none;
`;

export const CardAdminContainer = styled.div`
  width: 15vw;
  height: 180px;

  @media (max-width: 520px) {
    width: 100%;
  }
`;

export const CardFavoriteContainer = styled.div`
  width: 10vw;
  height: 120px;

  @media (max-width: 720px) {
    width: 120px;
  }
`;

export const CardDashContainer = styled.div`
  width: 19vw;
  height: 120px;

  @media (max-width: 1200px) {
    width: 280pc;
  }
`;

export const ActionsTableContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 720px) {
    width: 100%;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const BigTableActionContainer = styled.div`
  width: 200px;

  @media (max-width: 720px) {
    width: 100%;
  }
`;

export const SmallTableActionContainer = styled.div`
  width: 120px;

  @media (max-width: 720px) {
    width: 100%;
  }
`;

export const HeaderActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;

  @media (max-width: 720px) {
    width: 100%;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const HeaderActionsContainerItem = styled.div`
  @media (max-width: 720px) {
    width: 100%;
  }
`;
