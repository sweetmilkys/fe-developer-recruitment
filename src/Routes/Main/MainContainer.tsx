import React, { useEffect, useCallback, useReducer, useState } from "react";
import MainPresenter from "./MainPresenter";
import axios from "axios";
import Loader from "../../Components/Loader";
import Error from "../../Components/Error";

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

export const GET_SUCCESS = "GET_SUCCESS";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const API_FAILURE = "API_FAILURE";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        filters: action.filters,
        jobs: action.jobs,
        nextUrl: action.nextUrl
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        jobs: [...state.jobs, ...action.jobs],
        nextUrl: action.nextUrl
      };
    case API_FAILURE:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};

const MainContainer: React.FC = () => {
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
  const [url, setUrl] = useState();
  const [showModal, setShowModal] = useState(false);

  // 초기 데이터 가져오기
  useEffect(() => {
    const getData = async () => {
      try {
        // api에서 데이터 가져와 세팅
        const { data: filtersData } = await axios.get("/api/v4/filters", {
          headers: {
            "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7"
          }
        });
        const {
          data: {
            data: jobsData,
            links: { next }
          }
        } = await axios.get(
          "/api/v4/jobs?country=kr&job_sort=job.latest_order&years=-1&locations=all",
          {
            headers: {
              "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7"
            }
          }
        );
        // state 상태 업데이트
        dispatch({
          type: "GET_SUCCESS",
          filters: filtersData,
          jobs: jobsData,
          nextUrl: next
        });
      } catch (error) {
        // 에러화면 보이도록 세팅
        dispatch({ type: "API_FAILURE" });
      }
    };
    getData();
  }, []);

  // 추가 데이터 가져오기
  // 현재는 초기데이터, 추가데이터로 useEffect 분리했지만 api별로 분리하는 것 검토팔요
  useEffect(() => {
    if (url) {
      const fetchData = async () => {
        try {
          // api에서 데이터 가져와 세팅
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
          // state 상태 업데이트
          dispatch({
            type: "FETCH_SUCCESS",
            jobs: jobsData,
            nextUrl: next
          });
        } catch (error) {
          // 에러화면 보이도록 세팅
          dispatch({ type: "API_FAILURE" });
        }
      };
      fetchData();
    }
  }, [url]);

  // Infinite Scroll 함수
  const onScroll = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      setUrl(nextUrl);
    }
  }, [nextUrl]);

  // 스크롤 이벤트 분리
  useEffect(() => {
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
      setShowModal(showModal ? false : true);
    },
    [showModal]
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
    />
  );
};

export default MainContainer;
