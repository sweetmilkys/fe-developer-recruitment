import React from "react";
import styled from "styled-components";

const Container = styled.li``;

interface IImgProps {
  bgUrl: string;
}

const Header = styled.header<IImgProps>`
  background-image: url(${props => props.bgUrl});
`;

const LikeBtn = styled.button``;

const Icon = styled.i`
  color: hsla(0, 0%, 100%, 0.3);
`;

const Content = styled.div``;

const AddressDot = styled.span``;

const Reward = styled.div``;

interface IProps {
  id: number;
  likeCount: number;
  position: string;
  company: string;
  country: string;
  location: string;
  reward: string;
  bgUrl: string;
}

// props 변경시에만 렌더링 되도록 memo사용(인피티니 스크롤 시 기존 컴포넌트 재렌더링 방지)
const Poster: React.FC<IProps> = React.memo(
  ({ id, likeCount, position, company, country, location, reward, bgUrl }) => {
    return (
      <Container>
        <a href={`https://www.wanted.co.kr/wd/${id}`}>
          <Header bgUrl={bgUrl}>
            <LikeBtn>
              <Icon className="fas fa-heart" />
              {likeCount}
            </LikeBtn>
          </Header>
          <Content>
            <dl>
              <dt>{position}</dt>
              <dd>
                {company}
                <br />
                <span>{country}</span>
                <AddressDot>.</AddressDot>
                <span>{location}</span>
              </dd>
            </dl>
            <Reward>{`채용보상금 ${reward}`}</Reward>
          </Content>
        </a>
      </Container>
    );
  }
);

export default Poster;
