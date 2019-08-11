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
  onClickFilter: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// props 변경시에만 렌더링 되도록 memo사용
const FilterBtn: React.FC<IProps> = React.memo(
  ({ category, display, selected, onClickFilter }) => {
    return (
      <Filter onClick={onClickFilter}>
        {category !== null ? <FilterText>{category}</FilterText> : null}
        <FilterText isActive={selected}>{display}</FilterText>
      </Filter>
    );
  }
);

export default FilterBtn;
