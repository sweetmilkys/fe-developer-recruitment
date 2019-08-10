import React, { useEffect, useState, useRef } from "react";
import MainPresenter from "./MainPresenter";
import axios from "axios";
import Loader from "../../Components/Loader";
import Error from "../../Components/Error";

const MainContainer: React.FC = () => {
  const [loading, setLodaing] = useState(true);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState();
  const [sort, setSort] = useState({
    selected: true,
    display: "최신순",
    key: "job.latest_order"
  });
  const [countries, setCountries] = useState({
    selected: true,
    display: "한국",
    key: "kr"
  });
  const [locations, setLocations] = useState({
    selected: false,
    display: "전국",
    key: "all"
  });
  const [years, setYears] = useState({
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

  const filterOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {};

  useEffect(() => {
    const getData = async () => {
      try {
        // api에서 데이터 가져오기
        const { data: filtersData } = await axios.get("/api/v4/filters");
        const {
          data: { data: jobsData, links }
        } = await axios.get(url);
        setFilters(filtersData);
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

  return loading ? (
    <Loader />
  ) : error ? (
    <Error />
  ) : (
    <MainPresenter
      sort={sort}
      countries={countries}
      locations={locations}
      years={years}
      filterCnt={filterCnt}
      jobs={jobs}
      filterOnClick={filterOnClick}
    />
  );
};

export default MainContainer;
