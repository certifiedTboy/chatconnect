import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
// import Image from "../assets/back.jpg";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/UI/LoadingSpinner";
const HomePage = () => {
  const { isLoading } = useSelector((state) => state.registeration);
  const { isLoading: loginLoading } = useSelector((state) => state.login);
  return (
    <Fragment>
      <section className="container" style={{ marginTop: 140 }}>
        <div className="row">
          <div className="col-1 col-lg-4 col-md-3"></div>
          <Outlet />
          <div className="col-1 col-lg-4 col-md-3"></div>
        </div>
        <div className="centered" style={{ marginTop: -300 }}>
          {isLoading && <LoadingSpinner />}
          {loginLoading && <LoadingSpinner />}
        </div>
      </section>
    </Fragment>
  );
};

export default HomePage;
