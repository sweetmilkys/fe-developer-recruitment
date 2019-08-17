import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Poster from "../../components/Poster";
import Modal from "../../components/Modal";
import Filter from "../../components/Filter";
import { ImgProps, MainPresenterProps } from "../../types/local";

const Container = styled.div`
  background: ${props => props.theme.whiteColor};
`;

const Box = styled.div`
  position: relative;
  max-width: 1060px;

  @media (min-width: 768px) and (max-width: 991px) {
    width: 90%;
    margin: 0 auto;
    padding: 20px 0 80px;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    width: 90%;
    margin: 0 auto;
    padding: 20px 0 80px;
  }
  @media (min-width: 1200px) {
    width: 87.72%;
    margin: 0 auto;
    padding: 20px 0 80px;
  }
  @media (max-width: 767px) {
    padding-bottom: 20px;
  }

  :after {
    display: block;
    content: "";
    clear: both;
  }
`;

const Contant = styled.div`
  @media (max-width: 767px) {
    margin: 20px;
  }
`;

const FilterBox = styled.div`
  top: 50px;
  margin-bottom: 10px;

  @media (max-width: 767px) {
    margin-bottom: 20px;
  }

  :before {
    content: " ";
    display: table;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  :after {
    clear: both;
    content: " ";
    display: table;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
`;

const FilterBtns = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const WebFiltersBtns = styled.div`
  float: left;
  max-width: 80%;

  @media (max-width: 767px) {
    display: none !important;
  }
`;

const MobileFilter = styled.div`
  color: ${props => props.theme.greyColor};
  font-size: 13px;
  font-weight: 600;
  padding: 9px 0;
  float: left;
  max-width: 80%;
  display: none !important;

  @media (max-width: 767px) {
    display: block !important;
  }

  p {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin: 0 0 0 8px;
    text-align: center;
    font-size: 13px;
    font-weight: 600;
    line-height: 20px;
    color: ${props => props.theme.whiteColor};
    background-color: ${props => props.theme.mainColor};
    border-radius: 999px;
  }
`;

const FilterBtnBox = styled.div`
  float: right;

  button {
    color: ${props => props.theme.mainColor};
  }
`;

const FilterBtn = styled.button`
  border-radius: 2px;
  border: 1px solid ${props => props.theme.lightGreyColor};
  background: ${props => props.theme.whiteColor};
  color: ${props => props.theme.blackColor};
  font-size: 13px;
  font-weight: 400;
  padding: 9px 15px;

  @media (min-width: 768px) and (max-width: 991px) {
    margin-bottom: 10px;
  }
  @media (min-width: 992px) and (max-width: 1199px) {
    .rcqdYh7jQOna89KEkhNjv {
      margin-bottom: 10px;
    }
  }
  @media (min-width: 1200px) {
    .rcqdYh7jQOna89KEkhNjv {
      margin-bottom: 10px;
    }
  }

  :hover {
    background-color: #f9f9f9;
  }

  + button {
    margin-left: 10px;
  }

  i {
    margin-right: 5px;
    vertical-align: middle;
    color: ${props => props.theme.mainColor};
  }
`;

const FilterBtnIcon = styled.span`
  margin-right: 5px;
  color: ${props => props.theme.greyColor};
`;

const Icon = styled.i`
  content: "\ea0c";
  color: ${props => props.theme.mainColor};
`;

const FilterBtnText = styled.span`
  font-weight: 600;
  color: ${props => props.theme.blackColor};

  span {
    color: ${props => props.theme.mainColor};
  }
`;

const H3Text = styled.h3`
  font-size: 22px;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.3px;
  color: ${props => props.theme.blackColor};
  margin: 30px 0 14px;

  @media (max-width: 767px) {
    font-size: 18px;
    margin: 0 0 10px;
  }
`;

const CompanyBox = styled.div`
  margin: 0 -10px 60px;

  @media (max-width: 767px) {
    margin: 0 -20px 20px;
    padding-bottom: 20px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
`;

const CompanyUl = styled.ul`
  list-style: none;

  :after {
    content: "";
    display: block;
    clear: both;
  }

  @media (max-width: 767px) {
    width: 210%;
    padding: 0 15px;
  }

  a {
    text-decoration: inherit;
    cursor: pointer;

    :active,
    :hover,
    :visited {
      color: inherit;
    }

    li {
      width: calc(20% - 20px);
      float: left;
      margin: 0 10px;
      position: relative;

      @media (max-width: 767px) {
        width: calc(20% - 10px);
        margin: 0 5px;
      }

      header {
        height: 147px;
        z-index: 1;
        border-radius: 3px 3px 0 0;
        overflow: hidden;

        div {
          height: calc(100% + 1px);
          border-radius: 3px 3px 0 0;
          background-position: 50%;
          background-size: cover;
          background-color: #f2f2f2;
          background-repeat: no-repeat;
          transition: all 0.5s ease-in-out;
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);

          :hover {
            -webkit-transform: scale(1.06);
            transform: scale(1.06);
          }

          @media (max-width: 767px) {
            height: 0;
            padding-bottom: 75%;
          }
        }

        @media (max-width: 767px) {
          height: 0;
          padding-bottom: 75%;
        }
      }

      footer {
        padding: 34px 16px 0;
        height: 124px;
        border: 1px solid ${props => props.theme.lightGreyColor};
        border-top: none;
        border-radius: 0 0 3px 3px;
        position: relative;

        div {
          position: absolute;
          top: -25px;
          left: 16px;
          width: 50px;
          height: 50px;
          background-color: #f2f2f2;
          background-position: 50%;
          background-size: cover;
          background-repeat: no-repeat;
          z-index: 0;
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);

          @media (max-width: 767px) {
            top: -18px;
            left: 15px;
            width: 36px;
            height: 36px;
          }
        }

        h4 {
          position: relative;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: -0.3px;
          color: ${props => props.theme.blackColor};
          line-height: 1.2;
          margin: 4px 0;
          overflow: hidden;
          max-height: 58px;

          :hover {
            color: ${props => props.theme.mainColor};
          }
          :after {
            position: absolute;
            content: "";
            text-align: right;
            bottom: 0;
            right: 0;
            width: 20%;
            height: 30px;
            background: linear-gradient(90deg, hsla(0, 0%, 100%, 0), #fff 80%);

            @media (max-width: 767px) {
              height: 15px;
              margin-top: 15px;
            }
            @supports (-webkit-line-clamp: 2) and (-webkit-box-orient: vertical) {
              display: none;
            }
          }
          @media (max-width: 767px) {
            font-size: 15px;
            max-height: 42px;
          }
          @supports (-webkit-line-clamp: 2) and (-webkit-box-orient: vertical) {
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }

        h5 {
          font-size: 14px;
          font-weight: 400;
          letter-spacing: -0.2px;
          color: ${props => props.theme.greyColor};
          margin-top: 6px;

          @media (max-width: 767px) {
            font-size: 13px;
            margin-top: 8px;
          }
        }

        @media (max-width: 767px) {
          padding: 30px 15px;
          position: relative;
          height: 110px;
        }
      }
    }
  }
`;

const CompanyImg = styled.div<ImgProps>`
  background-image: url(${props => props.bgImg});
`;

const CompanyLogo = styled.div<ImgProps>`
  background-image: url(${props => props.logo});
`;

const List = styled.ul`
  margin: -10px;
  padding: 0;

  :before {
    content: " ";
    display: table;
    box-sizing: border-box;
  }
  :after {
    clear: both;
    content: " ";
    display: table;
    box-sizing: border-box;
  }

  li {
    width: 25%;
    padding: 10px;
    list-style: none;
    display: inline-block;
    vertical-align: top;

    @media (max-width: 767px) {
      width: 50%;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      width: 50%;
    }
  }
`;

const MainPresenter: React.FC<MainPresenterProps> = ({
  filters,
  sort,
  country,
  locations,
  year,
  filterCnt,
  jobs,
  showModal,
  setShowModal,
  onClickFilter,
  setUrl,
  setIsFetch
}) => (
  <Container>
    <Helmet>
      <title>채용 | 원티드</title>
    </Helmet>
    <Box>
      <Contant>
        <FilterBox>
          <FilterBtns>
            <WebFiltersBtns>
              {[
                { category: null, val: sort },
                { category: "국가", val: country },
                { category: "지역", val: locations[0] },
                { category: "경력", val: year }
              ].map(({ category, val }) =>
                val ? (
                  <Filter
                    key={category + val.display}
                    category={category}
                    display={val.display}
                    selected={val.selected}
                    onClickFilter={onClickFilter}
                  />
                ) : null
              )}
            </WebFiltersBtns>
            <MobileFilter>
              {"적용 중 필터:"}
              <p>{filterCnt}</p>
            </MobileFilter>
            <FilterBtnBox>
              <FilterBtn onClick={onClickFilter}>
                <FilterBtnIcon>
                  <Icon className="fas fa-filter" />
                </FilterBtnIcon>
                <FilterBtnText>
                  <span>필터</span>
                </FilterBtnText>
              </FilterBtn>
            </FilterBtnBox>
          </FilterBtns>
        </FilterBox>
        {showModal && filters ? (
          <Modal
            filters={filters}
            sort={sort}
            country={country}
            locations={locations}
            year={year}
            onClickFilter={onClickFilter}
            setUrl={setUrl}
            setShowModal={setShowModal}
            setIsFetch={setIsFetch}
          />
        ) : null}
        <H3Text>적극 채용중인 회사</H3Text>
        <CompanyBox>
          <CompanyUl>
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
          </CompanyUl>
        </CompanyBox>
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
      </Contant>
    </Box>
  </Container>
);

export default MainPresenter;
