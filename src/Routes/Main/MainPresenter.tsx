import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
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
  countrie: { selected: boolean; display: string; key: string };
  location: { selected: boolean; display: string; key: string };
  year: { selected: boolean; display: string; key: string };
  jobs: [
    {
      address: { country: string; location: string };
      company: { id: number; name: string; industry_name: string };
      compare_country: boolean;
      due_time: string | null;
      id: number;
      is_bookmark: boolean;
      is_like: boolean;
      like_count: number;
      logo_img: { origin: string; thumb: string };
      position: string;
      reward: {
        formatted_total: string;
        formatted_recommender: string;
        formatted_recommendee: string;
      };
      status: string;
      title_img: { origin: string; thumb: string };
    }
  ];
  filterCnt: number;
  onClickFilter: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const MainContainer: React.FC<IProps> = ({
  sort,
  countrie,
  location,
  year,
  filterCnt,
  jobs,
  onClickFilter
}) => (
  <Container>
    <Helmet>
      <title>채용 | 원티드</title>
    </Helmet>
    <FilterBox>
      <FilterBtns>
        <WebFiltersBtns>
          {[
            { category: null, val: sort },
            { category: "국가", val: countrie },
            { category: "지역", val: location },
            { category: "경력", val: year }
          ].map(({ category, val: { selected, display } }) => (
            <Filter
              key={display}
              category={category}
              display={display}
              selected={selected}
              onClickFilter={onClickFilter}
            />
          ))}
        </WebFiltersBtns>
        <MobileFilter>
          {"적용 중 필터:"}
          <p>{filterCnt}</p>
        </MobileFilter>
        <FilterBtnBox>
          <FilterBtn onClick={onClickFilter}>
            <FilterBtnIcon>
              <i className="fas fa-filter" />
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
      {jobs.map(
        ({
          id,
          like_count,
          position,
          company: { name },
          address: { country, location },
          reward: { formatted_total },
          title_img: { thumb }
        }) => {
          return (
            <Poster
              key={id}
              id={id}
              likeCount={like_count}
              position={position}
              company={name}
              country={country}
              location={location}
              reward={formatted_total}
              bgUrl={thumb}
            />
          );
        }
      )}
    </List>
    <Messeage />
  </Container>
);

export default MainContainer;
