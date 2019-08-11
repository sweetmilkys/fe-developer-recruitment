import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Main from "../routes/Main";

// 디폴트 페이지 '/wdlist/518/669'가 되도록 설정
// 추후 디테일 페이지 등 다른페이지 구현시 라우터 기능 사용하도록 구현
const Router = () => (
  <BrowserRouter>
    <Route path="/wdlist/518/669" component={Main} />
    <Redirect from="*" to="/wdlist/518/669" />
  </BrowserRouter>
);

export default Router;
