import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import classes from "./NotFoundPage.module.css";

const NotFoundPage = () => {
    return (
        <Container className={`${classes.overlay}`} fluid>
            <Row>
                <Col className="mt-5">
                    <div className="text-center">
                        <h1 className={classes.errorText}>Oops!</h1>
                        <p className={classes.errorCode}>404 - Page not found</p>
                    </div>

                    <div className="text-center mt-3">
                        <p className={classes.errorDescription}>
                            The page you are looking for might have been removed <br /> had
                            its name changed or is temporary unavailable
                        </p>

                        <NavLink to={`/`} className="btn btn-secondary">
                            Go Back
                        </NavLink>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFoundPage;
