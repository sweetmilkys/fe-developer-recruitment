import React from "react";
import styled from "styled-components";
import Poster from "../../Components/Poster";
import Messeage from "../../Components/Messeage";
import Modal from "../../Components/Modal";
import Filter from "../../Components/FilterBtn";

const Container = styled.div``;

const FilterBox = styled.div``;

const FilterBtns = styled.div``;

const WebFiltersBtns = styled.div``;

const MobileFilter = styled.div``;

const FilterBtnBox = styled.div``;

const FilterBtn = styled.button``;

const FilterBtnIcon = styled.span``;

const FilterBtnText = styled.span``;

const H3Text = styled.h3``;

const CompanyContainer = styled.div``;

const CompanyHeader = styled.div``;

const CompanyFooter = styled.div``;

const List = styled.ul``;

interface IProps {
  sort: { selected: boolean; display: string; key: string };
  countries: { selected: boolean; display: string; key: string };
  locations: { selected: boolean; display: string; key: string };
  years: { selected: boolean; display: string; key: string };
  jobs: Array<string>;
  filterCnt: number;
  filterOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const MainContainer: React.FC<IProps> = ({
  sort,
  countries,
  locations,
  years,
  filterCnt,
  jobs,
  filterOnClick
}) => (
  <Container>
    <FilterBox>
      <FilterBtns>
        <WebFiltersBtns>
          <Filter
            selected={sort.selected}
            display={[null, sort.display]}
            filterOnClick={filterOnClick}
          />
          <Filter
            selected={countries.selected}
            display={["국가", countries.display]}
            filterOnClick={filterOnClick}
          />
          <Filter
            selected={locations.selected}
            display={["지역", locations.display]}
            filterOnClick={filterOnClick}
          />
          <Filter
            selected={years.selected}
            display={["경력", years.display]}
            filterOnClick={filterOnClick}
          />
        </WebFiltersBtns>
        <MobileFilter>
          {"적용 중 필터:"}
          <p>{filterCnt}</p>
        </MobileFilter>
        <FilterBtnBox>
          <FilterBtn onClick={filterOnClick}>
            <FilterBtnIcon>
              <i />
            </FilterBtnIcon>
            <FilterBtnText>필터</FilterBtnText>
          </FilterBtn>
        </FilterBtnBox>
      </FilterBtns>
    </FilterBox>
    <Modal />
    <H3Text>적극 채용중인 회사</H3Text>
    <CompanyContainer>
      <ul>
        {[
          {
            name: "원티드랩",
            position: 11,
            url: "company/79"
          },
          {
            name: "클래스101",
            position: 8,
            url: "company/3257"
          },
          {
            name: "29CM(에이플러스비)",
            position: 8,
            url: "company/1719"
          },
          {
            name: "아프리카TV",
            position: 9,
            url: "company/5936"
          },
          {
            name: "이지비랩",
            position: 5,
            url: "company/6047"
          }
        ].map(company => (
          <a
            key={company.name}
            href={`https://www.wanted.co.kr/${company.url}`}
            target="_blank"
          >
            <li>
              <header>
                <CompanyHeader />
              </header>
              <footer>
                <CompanyFooter />
                <h4>{company.name}</h4>
                <h5>{`${company.position}개 포지션`}</h5>
              </footer>
            </li>
          </a>
        ))}
      </ul>
    </CompanyContainer>
    <CompanyContainer />
    <List>
      {[
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20
      ].map(item => (
        <Poster key={item} />
      ))}
    </List>
    <Messeage />
  </Container>
);

export default MainContainer;
