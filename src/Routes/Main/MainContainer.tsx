import React, { useEffect, useCallback, useReducer, useState } from "react";
import MainPresenter from "./MainPresenter";
import axios from "axios";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

const initialState = {
  isLoading: true,
  isError: false,
  sort: {
    selected: true,
    display: "최신순",
    key: "job.latest_order"
  },
  country: {
    selected: true,
    display: "한국",
    key: "kr"
  },
  location: {
    selected: false,
    display: "전국",
    key: "all"
  },
  year: {
    selected: false,
    display: "전체",
    key: "-1"
  },
  filterCnt: 2,
  jobs: null,
  nextUrl: null
};

export const GET_FILTERS = "GET_FILTERS";
export const GET_JOBS = "GET_JOBS";
export const API_FAILURE = "API_FAILURE";

const reducer = (state: any, action: any) => {
  console.log("리듀서");
  switch (action.type) {
    case GET_FILTERS:
      return {
        ...state,
        filters: action.filters
      };
    case GET_JOBS:
      return {
        ...state,
        isLoading: false,
        jobs: state.jobs ? [...state.jobs, ...action.jobs] : [...action.jobs],
        nextUrl: action.nextUrl
      };
    case API_FAILURE:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};

const MainContainer: React.FC = () => {
  console.log("메인");
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    isLoading,
    isError,
    filters,
    sort,
    country,
    location,
    year,
    filterCnt,
    jobs,
    nextUrl
  } = state;
  const [url, setUrl] = useState(
    "/api/v4/jobs?country=kr&job_sort=job.latest_order&years=-1&locations=all"
  );
  const [showModal, setShowModal] = useState(false);

  // 필터 데이터 가져오기
  useEffect(() => {
    console.log("필터데이터");
    const getData = async () => {
      try {
        const { data: filtersData } = await axios.get("/api/v4/filters", {
          headers: {
            "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7"
          }
        });
        dispatch({
          type: GET_FILTERS,
          filters: filtersData
        });
      } catch (error) {
        dispatch({ type: API_FAILURE });
      }
    };
    getData();
  }, []);

  // 잡 데이터 가져오기
  useEffect(() => {
    console.log("데이터");
    if (url) {
      const fetchData = async () => {
        try {
          const {
            data: {
              data: jobsData,
              links: { next }
            }
          } = await axios.get(url, {
            headers: {
              "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7"
            }
          });
          dispatch({
            type: GET_JOBS,
            jobs: jobsData,
            nextUrl: next
          });
        } catch (error) {
          dispatch({ type: API_FAILURE });
        }
      };
      fetchData();
    }
  }, [url]);

  // Infinite Scroll 함수
  const onScroll = useCallback(() => {
    console.log("스크롤함수");
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      setUrl(nextUrl);
    }
  }, [nextUrl]);

  // 스크롤 이벤트
  useEffect(() => {
    console.log("스크롤이벤트");
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  // useCallback 사용하여 함수가 계속 생성되는 것 방지
  const onClickFilter = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      console.log("클릭이벤트");
      setShowModal(showModal ? false : true);
    },
    [showModal]
  );

  const onClickSubmitBtn = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      console.log("클릭");
    },
    []
  );

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Error />
  ) : (
    <MainPresenter
      sort={sort}
      country={country}
      location={location}
      year={year}
      filterCnt={filterCnt}
      jobs={jobs}
      filters={filters}
      showModal={showModal}
      onClickFilter={onClickFilter}
      onClickSubmitBtn={onClickSubmitBtn}
    />
  );
};

export default MainContainer;
