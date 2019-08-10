import React, { useEffect, useState, useRef } from "react";
import MainPresenter from "./MainPresenter";
import axios from "axios";
import Loader from "../../Components/Loader";

const MainContainer: React.FC = () => {
  const [loading, setLodaing] = useState(true);
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
        console.log(error);
        // 에러세팅
      } finally {
        // 로딩화면에서 전환
        setLodaing(false);
      }
    };
    getData();
  }, [url]);

  return loading ? (
    <Loader />
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
