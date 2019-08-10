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

interface IImgProps {
  bgImg?: string;
  logo?: string;
}

const CompanyImg = styled.div<IImgProps>`
  background-image: url(${props => props.bgImg});
`;

const CompanyLogo = styled.div<IImgProps>`
  background-image: url(${props => props.logo});
`;

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
          {[
            { category: null, val: sort },
            { category: "국가", val: countries },
            { category: "지역", val: locations },
            { category: "경력", val: years }
          ].map(({ category, val: { selected, display } }) => (
            <Filter
              key={display}
              category={category}
              display={display}
              selected={selected}
              filterOnClick={filterOnClick}
            />
          ))}
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
            url: "company/79",
            position: 11,
            bgImg: "4qrmtohvtuusxbj6__1080_790.jpg",
            logo: "0_4.f4c95760.png"
          },
          {
            name: "클래스101",
            url: "company/3257",
            position: 8,
            bgImg: "qpja7torlddo7ymw__1080_790.jpg",
            logo: "0_5.2d093183.jpg"
          },
          {
            name: "펫프렌즈",
            url: "company/2756",
            position: 3,
            bgImg: "ishd31cajhqb4f8w__1080_790.jpg",
            logo: "0_5.1df96eac.jpg"
          },
          {
            name: "아프리카TV",
            url: "company/5936",
            position: 9,
            bgImg: "ftu1mpsatoohubhp__1080_790.jpg",
            logo: "0_5.29e8d158.jpg"
          },
          {
            name: "넥슨코리아(NEXON)",
            url: "company/886",
            position: 36,
            bgImg: "bx7zxeirqqeboq0q__1080_790.jpg",
            logo: "0_5.4b4c1752.jpg"
          }
        ].map(({ name, url, position, bgImg, logo }) => (
          <a
            key={name}
            href={`https://www.wanted.co.kr/${url}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <li>
              <header>
                <CompanyImg bgImg={require(`../../images/${bgImg}`)} />
              </header>
              <footer>
                <CompanyLogo logo={require(`../../images/${logo}`)} />
                <h4>{name}</h4>
                <h5>{`${position}개 포지션`}</h5>
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
