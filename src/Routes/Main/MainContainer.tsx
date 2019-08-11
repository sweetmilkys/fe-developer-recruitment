import React, { useEffect, useRef, useCallback, useReducer } from "react";
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
  next: null
};

export const GET_DATA = "GET_DATA";
export const GET_SUCCESS = "GET_SUCCESS";
export const GET_FAILURE = "GET_FAILURE";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case GET_DATA:
      return { ...state };
    case GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        jobs: action.jobs,
        next: action.next
      };
    case GET_FAILURE:
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
    sort,
    country,
    location,
    year,
    filterCnt,
    jobs,
    next
  } = state;
  // useRef를 사용할지 useState를 사용할지 검토필요. 일단은 고정값으로 useRef로 변경
  const filters = useRef();

  // 초기 렌더링시 필터 데이터 받아서 고정
  useEffect(() => {
    const getData = async () => {
      dispatch({ type: "GET_DATA" });
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
        filters.current = filtersData;
        dispatch({
          type: "GET_SUCCESS",
          jobs: jobsData,
          next: next
        });
      } catch (error) {
        // 에러화면 보이도록 세팅
        dispatch({ type: "GET_FAILURE" });
      }
    };
    getData();
  }, []);

  const onScroll = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      //setUrl(!nextJobs.current ? nextJobs.current : );
    }
  }, []);

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
    (event: React.MouseEvent<HTMLButtonElement>) => {},
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
      onClickFilter={onClickFilter}
    />
  );
};

export default MainContainer;
