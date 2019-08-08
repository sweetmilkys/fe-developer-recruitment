import React from "react";
import styled from "styled-components";
import Poster from "../../Components/Poster";
import Messeage from "../../Components/Messeage";
import Modal from "../../Components/Modal";

const Container = styled.div``;

const FilterBox = styled.div``;

const FilterBtns = styled.div``;

const WebJobBtns = styled.div``;

const MobileJob = styled.div``;

const FilterBtn = styled.div``;

const List = styled.ul``;

const MainContainer = () => {
  return (
    <>
      <Container>
        <FilterBox>
          <FilterBtns>
            <WebJobBtns />
            <MobileJob />
            <FilterBtn />
          </FilterBtns>
        </FilterBox>
        <Modal />
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
    </>
  );
};

export default MainContainer;
