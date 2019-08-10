import React from "react";
import styled from "styled-components";

const Filter = styled.button``;

interface ITextProps {
  isActive?: boolean;
}

const FilterText = styled.span<ITextProps>`
  font-weight: 600;
  color: ${props => (props.isActive ? props.theme.mainColor : "#333")};
`;

interface IProps {
  category: string | null;
  display: string;
  selected: boolean;
  filterOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const FilterBtn: React.FC<IProps> = React.memo(
  ({ category, display, selected, filterOnClick }) => {
    return (
      <Filter onClick={filterOnClick}>
        {category !== null ? <FilterText>{category}</FilterText> : null}
        <FilterText isActive={selected}>{display}</FilterText>
      </Filter>
    );
  }
);

export default FilterBtn;
