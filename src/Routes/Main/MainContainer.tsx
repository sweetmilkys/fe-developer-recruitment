import React, { useEffect, useState, useRef, useCallback } from "react";
import MainPresenter from "./MainPresenter";
import axios from "axios";
import Loader from "../../Components/Loader";
import Error from "../../Components/Error";

const MainContainer: React.FC = () => {
  const [loading, setLodaing] = useState(true);
  const [error, setError] = useState(false);
  // useRef를 사용할지 useState를 사용할지 검토필요. 일단은 고정값으로 useRef로 변경
  const filters = useRef();
  const [sort, setSort] = useState({
    selected: true,
    display: "최신순",
    key: "job.latest_order"
  });
  const [countrie, setCountrie] = useState({
    selected: true,
    display: "한국",
    key: "kr"
  });
  const [location, setLocation] = useState({
    selected: false,
    display: "전국",
    key: "all"
  });
  const [year, setYear] = useState({
    selected: false,
    display: "전체",
    key: "-1"
  });
  const [filterCnt, setFilterCnt] = useState(2);
  const [url, setUrl] = useState(
    "/api/v4/jobs?country=kr&job_sort=job.latest_order&years=-1&locations=all"
  );
  const [jobs, setJobs] = useState();
  const links = useRef();

  // 초기 렌더링시 필터 데이터 받아서 고정
  useEffect(() => {
    const getFilter = async () => {
      try {
        // api에서 데이터 가져와 세팅
        const { data: filtersData } = await axios.get("/api/v4/filters", {
          headers: {
            "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7"
          }
        });
        filters.current = filtersData;
      } catch (error) {
        // 에러화면 보이도록 세팅
        setError(true);
      }
    };
    getFilter();
  }, [countrie, sort, year]);

  // 필터 적용 후 재렌더링 하기위해 필터와 분리
  useEffect(() => {
    const getData = async () => {
      setLodaing(true);
      try {
        // api에서 데이터 가져와 세팅
        const {
          data: { data: jobsData, links }
        } = await axios.get(url, {
          headers: {
            "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7"
          }
        });
        setJobs(jobsData);
        links.current = links;
      } catch (error) {
        // 에러화면 보이도록 세팅
        setError(true);
      } finally {
        // 로딩화면에서 전환되도록 세팅
        setLodaing(false);
      }
    };
    getData();
  }, [url]);

  // useCallback 사용하여 함수가 계속 생성되는 것 방지
  const onClickFilter = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {},
    []
  );

  return loading ? (
    <Loader />
  ) : error ? (
    <Error />
  ) : (
    <MainPresenter
      sort={sort}
      countrie={countrie}
      location={location}
      year={year}
      filterCnt={filterCnt}
      jobs={jobs}
      onClickFilter={onClickFilter}
    />
  );
};

export default MainContainer;
