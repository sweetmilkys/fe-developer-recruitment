import React, { useState, useRef, memo, useCallback } from "react";
import styled from "styled-components";
import { ModalProps, ActiveProps } from "../types/local";
import { withRouter, RouteComponentProps } from "react-router-dom";
import {} from "../routes/Main/MainContainer";

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
  background-color: #fff;
  border-radius: 5px;
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

const SelectBtnBox = styled.div`
  margin: 10px 0 20px;

  :last-child {
    margin-bottom: 10px;
  }

  button {
    background: #f8f8fa;
  }
`;

const SelectBtn = styled.button<ActiveProps>`
  color: ${props =>
    props.isActive ? props.theme.whiteColor : props.theme.blackColor};
  background: ${props =>
    props.isActive ? props.theme.mainColor : "#f8f8fa"}!important;
  border-color: ${props =>
    props.isActive ? `${props.theme.mainColor} !important` : null};
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
`;

const SubmitBtn = styled.button`
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
const Modal: React.FC<ModalProps & RouteComponentProps> = memo(
  ({
    filters: { job_sort, countries, years },
    sort,
    country,
    locations,
    year,
    onClickFilter,
    setUrl,
    setShowModal,
    setIsFetch,
    history
  }) => {
    const [locationsData, setLocationsData] = useState(country.locations);
    const [selecteCountry, setSelecteCountry] = useState(country.key);
    const [selecteLocation, setSelecteLocation] = useState(
      locations.map(({ key }) => key)
    );
    const sendSort = useRef(sort.key);
    const sendCountry = useRef(country.key);
    const sendLocations = useRef(locations.map(({ key }) => key));
    const sendYear = useRef(year.key);

    // 초기화 button 이벤트
    const onClickInit = (event: React.MouseEvent<HTMLButtonElement>) => {
      setLocationsData(country.locations);
      sendSort.current = sort.key;
      setSelecteCountry(country.display);
      setSelecteLocation(locations.map(({ key }) => key));
      sendYear.current = year.key;
    };

    // 종류 select 이벤트
    const onChangeJob = useCallback(
      (event: React.FormEvent<HTMLSelectElement>) => {
        const selectItem = event.currentTarget.value;
        sendSort.current = selectItem;
      },
      []
    );

    // 국가 button 이벤트
    const onClickCountryBtn = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        const { key, locations: locations2 } = countries[
          countries.findIndex(item => {
            return event.currentTarget.innerText === item.display;
          })
        ];

        setSelecteCountry(key);
        sendCountry.current = key;
        sendLocations.current = locations2[
          locations2.findIndex(({ selected }) => selected === true)
        ]
          ? [
              locations2[
                locations2.findIndex(({ selected }) => selected === true)
              ].key
            ]
          : [];
        setLocationsData(locations2);
      },
      [countries]
    );

    // 지역 button 이벤트
    const onClickLocationBtn = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        const selectItem =
          locationsData[
            locationsData.findIndex(item => {
              return event.currentTarget.innerText === item.display;
            })
          ];
        setSelecteLocation(prev => {
          // 조회한 국가와 선택한 국가가 같을 경우 이전 지역과 같이 저장
          if (country.key === sendCountry.current) {
            sendLocations.current = prev.includes(selectItem.key)
              ? [...prev.filter(location => !location.includes(selectItem.key))]
              : [
                  ...prev.filter(
                    location => !location.includes(selectItem.key)
                  ),
                  selectItem.key
                ];
          } else {
            sendLocations.current = [selectItem.key];
          }

          return sendLocations.current;
        });
      },
      [locationsData]
    );

    // 경력 select 이벤트
    const onChangeYears = useCallback(
      (event: React.FormEvent<HTMLSelectElement>) => {
        const selectItem = event.currentTarget.value;
        sendYear.current = selectItem;
      },
      []
    );

    // 적용버튼 클릭 이벤트
    const onClickSubmitBtn = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        const isSave: any = document.getElementById("save");
        setShowModal(false);
        setIsFetch.current = false;
        // 적용된 필터 저장유지 할 경우 localstorage에 저장
        if (isSave.selected) {
          localStorage.setItem(
            "filter",
            JSON.stringify({
              sort: sendSort.current,
              country: sendCountry.current,
              locations: sendLocations.current,
              year: sendYear.current
            })
          );
        }
        setUrl(
          `/api/v4/jobs?country=${sendCountry.current}&job_sort=${
            sendSort.current
          }&years=${sendYear.current}${sendLocations.current
            .map(item => `&locations=${item}`)
            .join("")}`
        );
        history.push(
          `?country=${sendCountry.current}&job_sort=${sendSort.current}&years=${
            sendYear.current
          }${sendLocations.current.map(item => `&locations=${item}`).join("")}`
        );
      },
      [history, setUrl, setShowModal, setIsFetch]
    );

    return (
      <Container>
        <Contant>
          <Box>
            <HeaderBox>
              <InitBtn onClick={onClickInit}>
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
                <SelectBtnBox>
                  <BtnH6>국가</BtnH6>
                  <BtnDiv>
                    {countries.map(({ key, display }) => {
                      return (
                        <SelectBtn
                          key={key}
                          type="button"
                          isActive={selecteCountry === key}
                          onClick={onClickCountryBtn}
                        >
                          {display}
                        </SelectBtn>
                      );
                    })}
                  </BtnDiv>
                </SelectBtnBox>
                <SelectBtnBox>
                  <BtnH6>지역</BtnH6>
                  <BtnDiv>
                    {locationsData.map(({ key, display }: any) => {
                      return (
                        <SelectBtn
                          key={key + display}
                          type="button"
                          isActive={selecteLocation.includes(key)}
                          onClick={onClickLocationBtn}
                        >
                          {display}
                        </SelectBtn>
                      );
                    })}
                  </BtnDiv>
                </SelectBtnBox>
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
                  <input id="save" type="checkbox" />
                  적용된 필터를 저장하고 유지합니다.
                </State>
              </Filters>
            </FilterBox>
            <BtnBox>
              <SubmitBtn type="submit" onClick={onClickSubmitBtn}>
                적용
              </SubmitBtn>
            </BtnBox>
          </Box>
        </Contant>
        <Bg />
      </Container>
    );
  }
);

export default withRouter(Modal);
