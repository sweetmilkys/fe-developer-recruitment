export interface MainCotainerProps {
  location: RouteComponentProps["location"];
  history: RouteComponentProps["history"];
}

export interface MainPresenterProps {
  filters: {
    job_sort: [{ selected: boolean; display: string; key: string }];
    employee_count: string[];
    countries: [
      {
        selected: boolean;
        display: string;
        key: string;
        locations: [{ selected: boolean; display: string; key: string }];
      }
    ];
    years: [{ selected: boolean; display: string; key: string }];
  } | null;
  sort: { selected: boolean; display: string; key: string };
  country: { selected: boolean; display: string; key: string };
  location: { selected: boolean; display: string; key: string };
  year: { selected: boolean; display: string; key: string };
  filterCnt: number;
  jobs: [
    {
      address: { country: string; location: string };
      company: { id: number; name: string; industry_name: string };
      compare_country: boolean;
      due_time: string | null;
      id: number;
      is_bookmark: boolean;
      is_like: boolean;
      like_count: number;
      logo_img: { origin: string; thumb: string };
      position: string;
      reward: {
        formatted_total: string;
        formatted_recommender: string;
        formatted_recommendee: string;
      };
      status: string;
      title_img: { origin: string; thumb: string };
    }
  ];
  showModal: boolean;
  onClickFilter: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface LoaderImgProps {
  logo: string;
}

export interface PosterProps {
  id: number;
  likeCount: number;
  position: string;
  company: string;
  country: string;
  location: string;
  reward: string;
  bgUrl: string;
}

export interface FilterProps {
  category: string | null;
  display: string;
  selected: boolean;
  onClickFilter: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface ModalProps {
  filters: {
    job_sort: [{ selected: boolean; display: string; key: string }];
    employee_count: string[];
    countries: [
      {
        selected: boolean;
        display: string;
        key: string;
        locations: [{ selected: boolean; display: string; key: string }];
      }
    ];
    years: [{ selected: boolean; display: string; key: string }];
  };
  sort: { selected: boolean; display: string; key: string };
  country: { selected: boolean; display: string; key: string };
  locations: { selected: boolean; display: string; key: string };
  year: { selected: boolean; display: string; key: string };
  onClickFilter: (event: React.MouseEvent<HTMLButtonElement>) => void;
  history: RouteComponentProps["history"];
  location: RouteComponentProps["location"];
}

export interface ActiveProps {
  isActive?: boolean;
}

export interface ImgProps {
  bgImg?: string;
  logo?: string;
  bgUrl?: string;
}

export interface IBtnProps {
  isActive?: boolean;
}
