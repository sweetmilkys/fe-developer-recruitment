import React from "react";
import styled from "styled-components";
import { ActiveProps, FilterProps } from "../types/local";

const FilterBtn = styled.button`
  border-radius: 2px;
  border: 1px solid #e1e2e3;
  background: #fff;
  color: ${props => props.theme.blackColor};
  font-size: 13px;
  font-weight: 400;
  padding: 9px 15px;

  :hover {
    background-color: #f9f9f9;
  }

  i {
    margin-right: 5px;
    vertical-align: middle;
    color: ${props => props.theme.mainColor};
  }

  + button {
    margin-left: 10px;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    margin-bottom: 10px;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    margin-bottom: 10px;
  }
  @media (min-width: 1200px) {
    margin-bottom: 10px;
  }
`;

const FilterText1 = styled.span<ActiveProps>`
  margin-right: 5px;
  color: ${props => props.theme.greyColor};
`;

const FilterText2 = styled.span<ActiveProps>`
  font-weight: 600;
  color: ${props =>
    props.isActive ? props.theme.mainColor : props.theme.blackColor};
`;

// props 변경시에만 렌더링 되도록 memo사용
const Filter: React.FC<FilterProps> = React.memo(
  ({ category, display, selected, onClickFilter }) => {
    return (
      <FilterBtn onClick={onClickFilter}>
        {category !== null ? <FilterText1>{category}</FilterText1> : null}
        <FilterText2 isActive={selected}>{display}</FilterText2>
      </FilterBtn>
    );
  }
);

export default Filter;
