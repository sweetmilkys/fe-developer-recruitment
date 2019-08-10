import React from "react";
import styled from "styled-components";

const Filter = styled.button``;

interface ITextProps {
  isActive?: boolean;
}

const FilterText = styled.span<ITextProps>`
  font-weight: 600;
  color: ${props => (props.isActive ? "#2886fa" : "#333")};
`;

interface IProps {
  selected: boolean;
  display: (string | null)[];
  filterOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const FilterBtn: React.FC<IProps> = React.memo(
  ({ selected, display, filterOnClick }) => {
    return (
      <Filter onClick={filterOnClick}>
        <FilterText isActive={selected}>{display}</FilterText>
      </Filter>
    );
  }
);

export default FilterBtn;
