import React, { useEffect, useCallback, useReducer, useState } from "react";
import MainPresenter from "./MainPresenter";
import axios from "axios";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import { MainCotainerProps } from "../../types/local";

const initialState = {
  isLoading: true,
  isError: false,
  filter: [],
  sort: { selected: false, display: "", key: "" },
  country: { selected: false, display: "", key: "" },
  location: { selected: false, display: "", key: "" },
  year: { selected: false, display: "", key: "" },
  filterCnt: 0,
  jobs: null,
  nextUrl: null
};

export const GET_FILTERS = "GET_FILTERS";
export const GET_JOBS = "GET_JOBS";
export const API_FAILURE = "API_FAILURE";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case GET_FILTERS:
      let count = 0;

      if (action.sort.selected) count++;
      if (action.country.selected) count++;
      if (action.location.selected) count++;
      if (action.year.selected) count++;

      return {
        ...state,
        filters: action.filters,
        sort: action.sort,
        country: action.country,
        location: action.location,
        year: action.year,
        filterCnt: count
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

const MainContainer: React.FC<MainCotainerProps> = props => {
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
  const params = new URLSearchParams(props.location.search);
  const [url, setUrl] = useState(
    `/api/v4/jobs?country=${params.get("country")}&job_sort=${params.get(
      "job_sort"
    )}&years=${params.get("years")}&locations=${params.get("locations")}`
  );
  const [showModal, setShowModal] = useState(false);

  // 필터 데이터 가져오기
  const getFilters = async (
    country: string | null,
    sort: string | null,
    year: string | null,
    location: string | null
  ) => {
    try {
      const { data: filtersData } = await axios.get("/api/v4/filters", {
        headers: {
          "accept-language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7"
        }
      });

      dispatch({
        type: GET_FILTERS,
        filters: filtersData,
        sort: filtersData.job_sort.find((item: any) => item.key === sort),
        country: filtersData.countries.find(
          (item: any) => item.key === country
        ),
        location: filtersData.countries
          .find((item: any) => item.key === country)
          ["locations"].find((item: any) => item.key === location),
        year: filtersData.years.find((item: any) => item.key === year)
      });
    } catch (error) {
      dispatch({ type: API_FAILURE });
    }
  };

  // 잡 데이터 가져오기
  const getJobs = async () => {
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

  useEffect(() => {
    // URL에 필터 조건이 없을 경우
    if (!props.location.search) {
      setUrl(
        `/api/v4/jobs?country=kr&job_sort=job.latest_order&years=-1&locations=all`
      );
      props.history.push(
        `?country=kr&job_sort=job.latest_order&years=-1&locations=all`
      );
      // 필터 데이터가 없을 경우
    } else if (!state.filters) {
      getFilters(
        params.get("country"),
        params.get("job_sort"),
        params.get("years"),
        params.get("locations")
      );
    } else {
      getJobs();
    }
  }, [url, props.location.search, state.filters]);

  // Infinite Scroll 함수
  const onScroll = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      setUrl(nextUrl);
    }
  }, [nextUrl]);

  // 스크롤 이벤트
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
