import React, { useState, useEffect, Fragment } from "react";
import { searchUsers } from "../../lib/userApi";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { onLogout } from "../Auth/loginSlice";
import { registerationFail } from "../Auth/userRegisterationSlice";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { acceptRequest } from "../../lib/requestApi";
import { getUserProfile } from "../../lib/userApi";

import styles from "./MainNavigation.module.css";

const MainNavigation = () => {
  const { user } = useSelector((state) => state.login);

  const [searchdata, setSearchData] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchUsersFailed, setSearchUsersFailed] = useState("");
  const [requestSenderName, setRequestSenderName] = useState("");
  const [friendRequests, setFriendRequests] = useState([]);
  const dispatch = useDispatch();

  // logout function
  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessJWT");
    dispatch(onLogout());
    dispatch(registerationFail());
  };

  // search users function
  const changeSearchDataHandler = (event) => {
    setSearchData(
      event.target.value
        .toLowerCase()
        .replace(/(^|\s)\S/g, (L) => L.toUpperCase())
    );
    setSearchUsersFailed("");
  };

  // search side effect handler
  useEffect(() => {
    const identifier = setTimeout(() => {
      onSearchUsers();
    }, 1000);
    return () => {
      clearTimeout(identifier);
    };
  }, [searchdata, searchUsers]);

  //

  const grabRequestSenderName = (event) => {
    console.log(event.target.value);
    setRequestSenderName(event.target.value);
  };

  const acceptFriendRequest = (event) => {
    event.preventDefault();
    acceptRequest(requestSenderName);
  };
  const getUserFriendsRequest = async () => {
    const profile = await getUserProfile(user);

    setFriendRequests(profile.request || []);
  };

  useEffect(() => {
    getUserFriendsRequest(user);
  }, []);

  const onSearchUsers = async () => {
    try {
      const response = await searchUsers(searchdata);
      if (!response || response.length === 0 || response.error) {
        setSearchUsersFailed(response.error);
      } else {
        setSearchedUsers(response);
      }
    } catch (error) {
      // setSearchUsersFailed(error);
      console.log(error.error);
    }
  };

  let searchResult = <div></div>;

  if (!searchdata || searchdata.trim().length === 0) {
    searchResult = <div></div>;
  }

  // render if no search result
  if (searchedUsers && searchedUsers.length > 0) {
    searchResult = searchedUsers.map((user) => (
      <a href={`/user/userprofile/${user.username}`}>
        <img
          className={styles.searchImg}
          src={`http://localhost:3001/${user.profile.profilePicture}`}
        />
        <span className={styles.searchName}>{user.username}</span>
      </a>
    ));
  }

  // render incase of server side error
  if (searchUsersFailed) {
    searchResult = <p className={styles.searchName}>{searchUsersFailed}</p>;
  }

  return (
    <Fragment>
      <Navbar
        expand="md"
        className="navbar navbar-default navbar-trans navbar-expand-lg fixed-top"
      >
        <Container fluid>
          <NavLink to={"/"} className="navbar-brand text-brand">
            {" "}
            Chat <span className="color-b">Connect</span>
          </NavLink>

          <Navbar.Toggle aria-controls="navbarScroll" />

          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            {user && (
              <Nav>
                <LinkContainer to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/rooms">
                  <Nav.Link>Rooms</Nav.Link>
                </LinkContainer>

                <NavDropdown title="Link" id="navbarScrollingDropdown">
                  <LinkContainer to={`/user/userprofile/${user}`}>
                    <Nav.Link>Profile</Nav.Link>
                  </LinkContainer>
                  <NavDropdown.Item to="#action3">
                    Notification
                    <div>
                      {friendRequests.map((request) => {
                        return (
                          <form onSubmit={acceptFriendRequest}>
                            <div>
                              <p>{request.username}</p>
                              <input
                                type="hidden"
                                value={request.username}
                                onChange={grabRequestSenderName}
                              />
                              <button className="btn btn-success">
                                Accept
                              </button>
                              <button className="btn btn-danger">
                                Decline
                              </button>
                            </div>
                          </form>
                        );
                      })}
                    </div>
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <LinkContainer to={"/"}>
                    <Nav.Link onClick={logOut}>Logout</Nav.Link>
                  </LinkContainer>
                </NavDropdown>
              </Nav>
            )}
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search all users..."
                className="me-2"
                aria-label="Search"
                onChange={changeSearchDataHandler}
              />
              <div class={styles.dropdown}>
                <div id="myDropdown" class={styles.dropdownContent}>
                  {searchResult}
                </div>
              </div>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ marginBottom: 100 }}></div>
    </Fragment>
  );
};

export default MainNavigation;
