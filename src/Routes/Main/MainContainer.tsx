import React, { useEffect } from "react";
import MainPresenter from "./MainPresenter";
import axios from "axios";

const MainContainer = () => {
  const getFilters = async () => {
    try {
      // api에서 filters데이터 가져오기
      await axios
        .get("/api/v4/filters")
        .then(filtersData => {
          console.log(filtersData.data);
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error);
      // 에러세팅
    } finally {
      // 데이터세팅
    }
  };

  const getJobs = async () => {
    try {
      // api에서 Jobs데이터 가져오기
      await axios
        .get(
          "/api/v4/jobs?country=kr&job_sort=job.latest_order&years=-1&locations=all"
        )
        .then(JobsData => {
          console.log(JobsData.data);
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error);
      // 에러세팅
    } finally {
      // 데이터세팅
    }
  };

  useEffect(() => {
    getFilters();
    getJobs();
  }, []);

  return <MainPresenter />;
};

export default MainContainer;
