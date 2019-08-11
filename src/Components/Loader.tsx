import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import { LoaderImgProps } from "../types/local";

const Container = styled.div<LoaderImgProps>`
  display: flex;
  height: 300px;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${props => props.logo});
`;

const Loader = () => (
  <Container logo={require(`../images/0_4.f4c95760.png`)}>
    <Helmet>
      <title>Loading | 원티드</title>
    </Helmet>
  </Container>
);

export default Loader;
