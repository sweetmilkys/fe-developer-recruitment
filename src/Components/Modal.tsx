import React, { useRef } from "react";
import styled from "styled-components";
import { ActiveProps, ModalProps } from "../types/local";

const Container = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  overflow: hidden;
  z-index: 1001;
`;

const Contant = styled.div`
  z-index: 5;
  border-radius: 5px;
  background-color: #fff;
  position: absolute;
  overflow: hidden;

  @media (min-width: 768px) and (max-width: 991px) {
    top: 50%;
    left: 50%;
    width: 100%;
    max-width: 500px;
    max-height: calc(100vh - 150px);
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 5;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    top: 50%;
    left: 50%;
    width: 100%;
    max-width: 500px;
    max-height: calc(100vh - 150px);
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 5;
  }
  @media (min-width: 1200px) {
    top: 50%;
    left: 50%;
    width: 100%;
    max-width: 500px;
    max-height: calc(100vh - 150px);
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 5;
    overflow-y: auto;
  }
  @media (max-width: 767px) {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    max-width: none;
    width: 100% !important;
    -webkit-transform: none;
    transform: none;
    border-radius: 0;
    max-height: none;
    overflow: visible;
  }
`;

const Box = styled.div`
  position: relative;
  max-height: calc(100vh - 150px);
`;

const HeaderBox = styled.div`
  height: 54px;
  padding: 16px 20px;
  position: relative;
  border-bottom: 1px solid #eee;
  color: #333;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  word-wrap: break-word;

  @media (max-width: 767px) {
    font-weight: 400;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    font-weight: 400;
  }

  a,
  button {
    position: absolute;
    top: 50%;
    right: 0;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    padding: 15px;
    line-height: 0;
  }

  a i,
  button i {
    color: #bbb;
    line-height: 1;
    font-size: 13px;
  }
`;

const InitBtn = styled.button`
  left: 0;
  right: auto;
  font-size: 15px;
  font-weight: 600;
  color: #999;
  text-align: left;
  i {
    margin-right: 5px;
  }
`;

const FilterBox = styled.div`
  max-height: calc(100vh - 295px);
  overflow-x: hidden;
  overflow-y: scroll;
  @media (max-width: 767px) {
    max-height: 100vh;
  }
`;

const Filters = styled.div`
  padding: 20px;
`;

const Sort = styled.div`
  margin: 10px 0 30px;

  :last-child {
    margin-bottom: 10px;
  }
`;

const Countries = styled.div`
  margin: 10px 0 20px;

  :last-child {
    margin-bottom: 10px;
  }
`;

const CountryBtn = styled.button<ActiveProps>`
  color: ${props =>
    props.isActive ? props.theme.whiteColor : props.theme.blackColor};
  background: ${props => (props.isActive ? props.theme.mainColor : "#f8f8fa")};
  border-color: ${props =>
    props.isActive ? props.theme.mainColor : props.theme.blackColor};
`;

const Locations = styled.div`
  margin: 10px 0 20px;

  :last-child {
    margin-bottom: 10px;
  }
`;

const LocationBtn = styled.button<ActiveProps>`
  color: ${props =>
    props.isActive ? props.theme.whiteColor : props.theme.blackColor};
  background: ${props => (props.isActive ? props.theme.mainColor : "#f8f8fa")};
  border-color: ${props =>
    props.isActive ? props.theme.mainColor : props.theme.blackColor};
`;

const Years = styled.div`
  margin: 10px 0 30px;

  :last-child {
    margin-bottom: 10px;
  }
`;

const SelectH6 = styled.h6`
  font-size: 16px;
  font-weight: 400;
  color: #999;
  margin: 0 0 10px;
`;
const SelectDiv = styled.div`
  position: relative;

  :after {
    content: "";
    top: 50%;
    right: 20px;
    width: 0;
    height: 0;
    position: absolute;
    z-index: 1002;
    border-top: 6px solid #999;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    padding: 9px 20px;
    border: 0;
    border-radius: 3px;
    background-color: #f8f8fa;
    color: #333;
    font-size: 16px;
    font-weight: 600;
    width: 100%;
  }
`;

const BtnH6 = styled.h6`
  font-size: 16px;
  font-weight: 400;
  color: #999;
  margin: 0 0 10px;
`;
const BtnDiv = styled.div`
  button {
    margin-right: 9px;
    margin-bottom: 9px;
    border: 1px solid #e1e2e3;
    padding: 11px 13px;
    font-size: 15px;
    line-height: 1;
    font-weight: 600;
  }
`;

const State = styled.div`
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  color: #333;
  margin-bottom: 10px;

  input {
    margin: 0 8px 0 0;
  }
`;

const BtnBox = styled.div`
  @media (min-width: 768px) and (max-width: 991px) {
    padding: 20px;
    border-top: 1px solid #eee;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    padding: 20px;
    border-top: 1px solid #eee;
  }
  @media (min-width: 1200px) {
    padding: 20px;
    border-top: 1px solid #eee;
  }
  @media (max-width: 767px) {
    margin-top: 50px;
  }

  button {
    color: #fff;
    background: #238ff4;
    font-size: 18px;
    font-weight: 600;
    padding: 12px 20px;
    width: 100%;

    @media (min-width: 768px) and (max-width: 991px) {
      border-radius: 3px;
    }
    @media (min-width: 992px) and (max-width: 1199px) {
      border-radius: 3px;
    }
    @media (min-width: 1200px) {
      border-radius: 3px;
    }
    @media (max-width: 767px) {
      font-size: 17px;
      padding: 13px 20px;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1003;
    }
  }
`;

const Bg = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 4;
  background-color: rgba(0, 0, 0, 0.5);
`;

// 필터 모달창
const Modal: React.FC<ModalProps> = React.memo(
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
    const selecteSort = useRef(sort.key);
    const selecteCountry = useRef(country.display);
    const selecteLocations = useRef(location.display);
    const selecteYear = useRef(year.key);

    console.log("모달창");
    console.log(selecteCountry.current);
    console.log(selecteLocations.current);

    countries.forEach(({ key, locations }) => {
      if (country.key === key) locationsData.current = locations;
    });

    const onChangeJob = (event: React.FormEvent<HTMLSelectElement>) => {
      event.preventDefault();
      selecteSort.current = event.currentTarget.value;
      console.log(selecteSort.current);
    };

    const onClickCountryBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      selecteCountry.current = event.currentTarget.innerText;
      console.log(event.currentTarget.innerText);
    };

    const onClickLocationBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      selecteLocations.current = event.currentTarget.innerText;
      console.log(selecteLocations.current);
    };

    const onChangeYears = (event: React.FormEvent<HTMLSelectElement>) => {
      event.preventDefault();

      selecteYear.current = event.currentTarget.value;
      console.log(selecteYear.current);
    };

    return (
      <Container>
        <Contant>
          <Box>
            <HeaderBox>
              <InitBtn>
                <i className="fas fa-undo-alt" />
                초기화
              </InitBtn>
              <span>필터</span>
              <button onClick={onClickFilter}>
                <i className="fas fa-times" />
              </button>
            </HeaderBox>
            <FilterBox>
              <Filters>
                <Sort>
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
                </Sort>
                <Countries>
                  <BtnH6>국가</BtnH6>
                  <BtnDiv>
                    {countries.map(({ key, display }) => {
                      console.log(country.key === key);
                      console.log(key);
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
