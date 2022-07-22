import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Image from "../assets/back.jpg";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/UI/LoadingSpinner";
const HomePage = () => {
  const { isLoading } = useSelector((state) => state.registeration);
  const { isLoading: loginLoading } = useSelector((state) => state.login);
  return (
    <Fragment>
      <section className="container" style={{ marginTop: 140 }}>
        <div className="row">
          <div className="col-6 col-lg-6 d-none d-lg-block">
            <div>
              <img src={Image} alt="" />
            </div>
          </div>
          <Outlet />
        </div>
      </section>
      <div className="centered" style={{ marginTop: -320 }}>
        {isLoading && <LoadingSpinner />}
        {loginLoading && <LoadingSpinner />}
      </div>
    </Fragment>
  );
};

export default HomePage;
