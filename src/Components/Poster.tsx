import React from "react";
import styled from "styled-components";
import { ImgProps, PosterProps } from "../types/local";

const Container = styled.div`
  a {
    text-decoration: none;
  }
`;

const Header = styled.header<ImgProps>`
  background-image: url(${props => props.bgUrl});
  padding-bottom: 75%;
  position: relative;
  background-size: cover;
  background-position: 50%;
  border-radius: 4px;
  background-repeat: no-repeat;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
`;

const LikeBtn = styled.button`
  width: 60px;
  height: 30px;
  border-radius: 3px;
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  justify-content: center;
  align-items: center;
  display: flex;
  right: 10px;
  top: 10px;
  flex-direction: row;

  @media (max-width: 767px) {
    width: 52px;
    height: 25px;
    top: 5px;
    right: 5px;
  }

  :hover {
    i {
      color: ${props => props.theme.mainColor};
    }
  }
`;

const Icon = styled.i`
  margin-right: 5px;
  color: hsla(0, 0%, 100%, 0.3);
`;

const Content = styled.div`
  padding: 14px 10px;
  height: 12.5em;

  dl dd {
    margin-top: 8px;
    color: ${props => props.theme.greyColor};
    font-size: 14px;
    font-weight: 400;
    line-height: 1.6;

    @media (max-width: 767px) {
      font-size: 13px;
      line-height: 1.5;
    }
  }
`;

const ContentDl = styled.dl`
  margin: 0;
`;

const ContentDt = styled.dt`
  text-align: left;
  word-break: break-word;
  overflow: hidden;
  position: relative;
  color: #333;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  max-height: 2.8em;

  @media (max-width: 767px) {
    font-size: 15px;
    line-height: 1.5;
    max-height: 3em;
  }
  @supports (-webkit-line-clamp: 2) and (-webkit-box-orient: vertical) {
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  :after {
    position: absolute;
    content: "";
    margin-top: 1.4em;
    text-align: right;
    top: 0;
    right: 0;
    width: 20%;
    height: 1.4em;
    background: linear-gradient(90deg, hsla(0, 0%, 100%, 0), #fff 80%);

    @media (max-width: 767px) {
      height: 1.5em;
      margin-top: 1.5em;
    }
    @supports (-webkit-line-clamp: 2) and (-webkit-box-orient: vertical) {
      display: none;
    }
  }
`;

const ContentDd = styled.dd`
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  word-break: break-word;
  overflow: hidden;

  @media (max-width: 767px) {
    font-size: 15px;
    line-height: 1.5;
    max-height: 3em;
  }
  @supports (-webkit-line-clamp: 2) and (-webkit-box-orient: vertical) {
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  :after {
    position: absolute;
    content: "";
    margin-top: 1.4em;
    text-align: right;
    top: 0;
    right: 0;
    width: 20%;
    height: 1.4em;
    background: linear-gradient(90deg, hsla(0, 0%, 100%, 0), #fff 80%);

    @media (max-width: 767px) {
      height: 1.5em;
      margin-top: 1.5em;
    }
    @supports (-webkit-line-clamp: 2) and (-webkit-box-orient: vertical) {
      display: none;
    }
  }
`;

const AddressDot = styled.span`
  margin: 0 3px;
  top: -4px;
  position: relative;
`;

const Reward = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  word-break: break-word;
  overflow: hidden;
  margin-top: 10px;
  color: #666;
  font-size: 13px;
  font-weight: 400;
`;

// props 변경시에만 렌더링 되도록 memo사용(인피티니 스크롤 시 기존 컴포넌트 재렌더링 방지)
const Poster: React.FC<PosterProps> = React.memo(
  ({ id, likeCount, position, company, country, location, reward, bgUrl }) => (
    <li>
      <Container>
        <a href={`https://www.wanted.co.kr/wd/${id}`} target="_self">
          <Header bgUrl={bgUrl}>
            <LikeBtn>
              <Icon className="fas fa-heart" />
              {likeCount}
            </LikeBtn>
          </Header>
          <Content>
            <ContentDl>
              <ContentDt>{position}</ContentDt>
              <ContentDd>
                {company}
                <br />
                <span>{country}</span>
                <AddressDot>.</AddressDot>
                <span>{location}</span>
              </ContentDd>
            </ContentDl>
            <Reward>{`채용보상금 ${reward}`}</Reward>
          </Content>
        </a>
      </Container>
    </li>
  )
);

export default Poster;
