import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useReducer
} from "react";
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
  location: [{ selected: false, display: "", key: "" }],
  year: { selected: false, display: "", key: "" },
  filterCnt: 0,
  jobs: null,
  nextUrl: null
};

export const GET_FILTERS = "GET_FILTERS";
export const GET_JOBS = "GET_JOBS";
export const FETCH_JOBS = "FETCH_JOBS";
export const API_FAILURE = "API_FAILURE";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case GET_FILTERS:
      return {
        ...state,
        filters: action.filters
      };
    case GET_JOBS:
      let count = 0;
      if (action.sort.selected) count++;
      if (action.country.selected) count++;
      if (action.locations[0] && action.locations[0].selected) count++;
      if (action.year.selected) count++;
      return {
        ...state,
        isLoading: false,
        sort: action.sort ? action.sort : null,
        country: action.country ? action.country : null,
        locations: action.locations ? action.locations : null,
        year: action.year ? action.year : null,
        filterCnt: count,
        jobs: [...action.jobs],
        nextUrl: action.nextUrl
      };
    case FETCH_JOBS:
      return {
        ...state,
        isLoading: false,
        jobs: [...state.jobs, ...action.jobs],
        nextUrl: action.nextUrl
      };
    case API_FAILURE:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};

const MainContainer: React.FC<MainCotainerProps> = ({
  history,
  location: { search }
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    isLoading,
    isError,
    filters,
    sort,
    country,
    locations,
    year,
    filterCnt,
    jobs,
    nextUrl
  } = state;
  const params = new URLSearchParams(search);
  const [url, setUrl] = useState(
    `/api/v4/jobs?country=${params.get("country")}&job_sort=${params.get(
      "job_sort"
    )}&years=${params.get("years")}${params
      .getAll("locations")
      .map(item => `&locations=${item}`)
      .join("")}`
  );
  const [showModal, setShowModal] = useState(false);
  const isFetch = useRef(false);

  // 필터 데이터 가져오기
  const getFilters = async () => {
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

  useEffect(() => {
    // 잡 데이터 가져오기
    const getJobs = async (
      country: string | null,
      sort: string | null,
      year: string | null,
      locations: string[]
    ) => {
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
        if (next !== null) {
          dispatch({
            type: isFetch.current ? FETCH_JOBS : GET_JOBS,
            sort: isFetch.current
              ? null
              : filters.job_sort.find((item: any) => item.key === sort),
            country: isFetch.current
              ? null
              : filters.countries.find((item: any) => item.key === country),
            locations: isFetch.current
              ? null
              : filters.countries
                  .find((item: any) => item.key === country)
                  ["locations"].filter((item: any) =>
                    locations.includes(item.key)
                  ),
            year: isFetch.current
              ? null
              : filters.years.find((item: any) => item.key === year),
            jobs: jobsData,
            nextUrl: next
          });
        } else {
          // 조건에 해당하는 API데이터가 없을 경우
          //alert("해당 조건을 만족하는 데이터가 없습니다.");
          history.push("/wdlist/518/669");
        }
      } catch (error) {
        dispatch({ type: API_FAILURE });
      }
    };

    // URL에 필터 조건이 없을 경우
    if (!search) {
      const storageFilter = JSON.parse(localStorage.getItem("filter")!);

      // localstorage에 저장된 필터 값이 있을 경우 해당 값 적용 아니면 초기값 적용
      setUrl(
        `/api/v4/jobs?country=${
          storageFilter ? storageFilter.country : "kr"
        }&job_sort=${
          storageFilter ? storageFilter.sort : "job.latest_order"
        }&years=${storageFilter ? storageFilter.year : "-1"}${
          storageFilter
            ? storageFilter.locations
                .map((item: any) => `&locations=${item}`)
                .join("")
            : "&locations=all"
        }`
      );
      history.push(
        `?country=${storageFilter ? storageFilter.country : "kr"}&job_sort=${
          storageFilter ? storageFilter.sort : "job.latest_order"
        }&years=${storageFilter ? storageFilter.year : "-1"}${
          storageFilter
            ? storageFilter.locations
                .map((item: any) => `&locations=${item}`)
                .join("")
            : "&locations=all"
        }`
      );
      // 필터 데이터가 없을 경우
    } else if (!filters) {
      getFilters();
    } else {
      getJobs(
        params.get("country"),
        params.get("job_sort"),
        params.get("years"),
        params.getAll("locations")
      );
    }
  }, [url, filters, search, history]);

  // Infinite Scroll 함수
  const onScroll = useCallback(() => {
    if (
      window.scrollY + document.documentElement.clientHeight >
      document.documentElement.scrollHeight - 300
    ) {
      if (nextUrl !== null) {
        setUrl(nextUrl);
        isFetch.current = true;
      } else {
        alert("마지막 페이지 입니다 :)");
      }
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

  // useCallback 사용하여 함수 반복 생성 방지
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
      locations={locations}
      year={year}
      filterCnt={filterCnt}
      jobs={jobs}
      filters={filters}
      showModal={showModal}
      setShowModal={setShowModal}
      onClickFilter={onClickFilter}
      setUrl={setUrl}
      setIsFetch={isFetch}
    />
  );
};

export default MainContainer;
