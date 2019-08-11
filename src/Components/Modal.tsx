import React, { useRef } from "react";
import styled from "styled-components";

const Container = styled.div``;

const Contant = styled.div``;

const Box = styled.div``;

const HeaderBox = styled.div``;

const FilterBox = styled.div``;

const Filters = styled.div``;

const Job = styled.div``;

const Countries = styled.div``;

interface IBtnProps {
  isActive?: boolean;
}

const CountryBtn = styled.button<IBtnProps>`
  color: ${props =>
    props.isActive ? props.theme.subColor : props.theme.blackColor};
`;

const Locations = styled.div``;

const LocationBtn = styled.button<IBtnProps>`
  color: ${props =>
    props.isActive ? props.theme.subColor : props.theme.blackColor};
`;

const Years = styled.div``;

const SelectH6 = styled.h6``;
const SelectDiv = styled.div``;

const BtnH6 = styled.h6``;
const BtnDiv = styled.div``;

const State = styled.div``;

const BtnBox = styled.div``;

const Bg = styled.div``;

interface IProps {
  filters: {
    job_sort: [{ selected: boolean; display: string; key: string }];
    employee_count: string[];
    countries: [
      {
        selected: boolean;
        display: string;
        key: string;
        locations: [{ selected: boolean; display: string; key: string }];
      }
    ];
    years: [{ selected: boolean; display: string; key: string }];
  };
  sort: { selected: boolean; display: string; key: string };
  country: { selected: boolean; display: string; key: string };
  location: { selected: boolean; display: string; key: string };
  year: { selected: boolean; display: string; key: string };
  onClickFilter: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickSubmitBtn: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// 필터 모달창
const Modal: React.FC<IProps> = React.memo(
  ({
    filters: { job_sort, countries, years },
    sort,
    country,
    location,
    year,
    onClickFilter,
    onClickSubmitBtn
  }) => {
    const locationsData: any = useRef();

    console.log("모달창");

    countries.forEach(({ key, locations }) => {
      if (country.key === key) locationsData.current = locations;
    });

    const onChangeJob = (event: React.FormEvent<HTMLSelectElement>) => {
      event.preventDefault();
      console.log(event.currentTarget.value);
    };

    const onClickCountryBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      console.log(event.currentTarget.textContent);
    };

    const onClickLocationBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      console.log(event.currentTarget.textContent);
    };

    const onChangeYears = (event: React.FormEvent<HTMLSelectElement>) => {
      event.preventDefault();
      console.log(event.currentTarget.value);
    };

    return (
      <Container>
        <Contant>
          <Box>
            <HeaderBox>
              <button>
                <i />
                초기화
              </button>
              <span>필터</span>
              <button onClick={onClickFilter}>
                <i className="fas fa-times" />
              </button>
            </HeaderBox>
            <FilterBox>
              <Filters>
                <Job>
                  <SelectH6>정렬</SelectH6>
                  <SelectDiv>
                    <select defaultValue={sort.key} onChange={onChangeJob}>
                      {job_sort.map(({ key, display }) => {
                        return (
                          <option key={key} value={key}>
                            {display}
                          </option>
                        );
                      })}
                    </select>
                  </SelectDiv>
                </Job>
                <Countries>
                  <BtnH6>국가</BtnH6>
                  <BtnDiv>
                    {countries.map(({ key, display }) => {
                      return (
                        <CountryBtn
                          key={key}
                          type="button"
                          isActive={country.key === key}
                          onClick={onClickCountryBtn}
                        >
                          {display}
                        </CountryBtn>
                      );
                    })}
                  </BtnDiv>
                </Countries>
                <Locations>
                  <BtnH6>지역</BtnH6>
                  <BtnDiv>
                    {locationsData.current.map(({ display, key }: any) => {
                      return (
                        <LocationBtn
                          key={key}
                          isActive={location.key === key}
                          onClick={onClickLocationBtn}
                        >
                          {display}
                        </LocationBtn>
                      );
                    })}
                  </BtnDiv>
                </Locations>
                <Years>
                  <SelectH6>경력</SelectH6>
                  <SelectDiv>
                    <select defaultValue={year.key} onChange={onChangeYears}>
                      {years.map(({ key, display }) => {
                        return (
                          <option key={key} value={key}>
                            {display}
                          </option>
                        );
                      })}
                    </select>
                  </SelectDiv>
                </Years>
                <State>
                  <input type="checkbox" />
                  적용된 필터를 저장하고 유지합니다.
                </State>
              </Filters>
            </FilterBox>
            <BtnBox>
              <button type="submit" onClick={onClickSubmitBtn}>
                적용
              </button>
            </BtnBox>
          </Box>
        </Contant>
        <Bg />
      </Container>
    );
  }
);

export default Modal;
