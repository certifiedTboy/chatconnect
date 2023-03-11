import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newUserRegisteration } from "./userRegActions";
import { Alert, Form } from "react-bootstrap";

const RegForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tnc, setTnc] = useState("");
  const [error, setError] = useState({});

  const { isLoading, status, errorMessage } = useSelector(
    (state) => state.registeration
  );

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const nameHandler = (event) => {
    setName(event.target.value);
  };
  const phoneNumberHandler = (event) => {
    setPhoneNumber(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const confirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
  };
  const tncHandler = (event) => {
    if (tnc === "tnc") {
      setTnc("");
    } else {
      setTnc(event.target.value);
    }
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    // username and name validity and error
    if (username.trim().length === 0 || name.trim().length === 0) {
      setError({ nameError: "All input fields are required" });
      return;
    }
    //email valditiy and error
    if (email.trim().length === 0) {
      setError({ emailError: "Email field can't be empty" });
      return;
    }
    if (!email.trim().includes("@")) {
      return { emailError: `Invalid email address. must include "@"` };
    }
    //phone number validity error
    if (phoneNumber.trim().length === 0) {
      setError({ phoneError: "phone field is empty" });
    }
    // terms and conditions validity checking
    if (tnc === "") {
      setError({
        tncError:
          "Agree to our terms and conditions by clicking the check box below",
      });
      return;
    }
    //password validity and error check
    const valid = {
      hasUpper: /[A-Z]/,
      hasLower: /[a-z]/,
      hasNumber: /[0-9]/,
      hasSpclChr: /[@,#,$,%,&]/,
    };

    if (password.trim().length === 0) {
      setError({ passwordError: "Password field is empty" });
      return;
    }
    if (password.trim().length <= 7) {
      setError({
        passwordError: "Password is too short, it must be 8 characters long",
      });
      return;
    }
    if (!password.match(valid.hasUpper)) {
      setError({
        passwordError: "password must contain at least one upper case",
      });
      return;
    }
    if (!password.match(valid.hasLower)) {
      setError({
        passwordError: "password must contain at least one lower case",
      });
      return;
    }
    if (!password.match(valid.hasNumber)) {
      setError({ passwordError: "password must contain at least a number" });
      return;
    }
    if (!password.match(valid.hasSpclChr)) {
      setError({
        passwordError:
          "password must contain multiple symbols of either @, #, $, %, &,(, )",
      });
      return;
    }
    if (password.trim() !== confirmPassword.trim()) {
      setError({
        passwordMatchError: "invalid password, password does not match",
      });
      return;
    }
    //password validity

    const data = {
      username,
      name,
      email,
      phoneNumber,
      password,
      confirmPassword,
    };
    dispatch(newUserRegisteration(data));
  };
  if (status === "Success") {
    //temporarily navigate to login page to be changed to user profile soon
    navigate("/profile-picture");
  }

  const phoneClasses = error.phoneError
    ? "form-control invalid "
    : "form-control topmag gg";
  const emailClasses = error.emailError
    ? "form-control invalid "
    : "form-control topmag gg";
  const nameFieldClasses = error.nameError
    ? "form-control invalid"
    : "form-control topmag gg";
  const passwordClass = error.passwordError
    ? "form-control invalid"
    : "form-control topmag gg";
  const passwordMatchClass = error.passwordMatchError
    ? "form-control invalid"
    : "form-control topmag gg";
  return (
    <div className="col-12 col-lg-6">
      <div className="container">
        <div className="row">
          <div>
            <h4>Sign Up Here</h4>
            <p>Register to chat with other Users</p>

            {/* Output Error Messages */}

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {error.passwordError && (
              <Alert variant="danger">{error.passwordError}</Alert>
            )}
            {error.nameError && (
              <Alert variant="danger">{error.nameError}</Alert>
            )}
            {error.phoneError && (
              <Alert variant="danger">{error.phoneError}</Alert>
            )}
            {error.emailError && (
              <Alert variant="danger">{error.emailError}</Alert>
            )}
            {error.passwordMatchError && (
              <Alert variant="danger">{error.passwordMatchError}</Alert>
            )}
            {error.tncError && <Alert variant="danger">{error.tncError}</Alert>}
            {/* Output Error Messages */}

            <form onSubmit={formSubmitHandler}>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter Username"
                  className={nameFieldClasses}
                  onChange={usernameHandler}
                  value={username}
                  style={{
                    marginBottom: 10,
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="email"
                  className={emailClasses}
                  placeholder="Email Address"
                  value={email}
                  onChange={emailHandler}
                  style={{
                    marginBottom: 10,
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="name"
                  onChange={nameHandler}
                  className={nameFieldClasses}
                  placeholder="Enter Full Name"
                  value={name}
                  style={{
                    marginBottom: 10,
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="phoneNumer"
                  onChange={phoneNumberHandler}
                  className={phoneClasses}
                  placeholder="Phone Number"
                  value={phoneNumber}
                  style={{
                    marginBottom: 10,
                  }}
                />
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={passwordHandler}
                  className={passwordClass}
                  placeholder="Password"
                  style={{
                    marginBottom: 10,
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={confirmPasswordHandler}
                  className={passwordMatchClass}
                  placeholder="Confirm Password"
                  style={{
                    marginBottom: 10,
                  }}
                />
              </Form.Group>

              <div>
                <label htmlFor="tnc">
                  <p>
                    <input value="tnc" type="checkbox" onChange={tncHandler} />I
                    have read and agree to the terms and conditions guiding the
                    usage of our services <a href="#">Terms & Conditions</a>
                  </p>
                </label>
              </div>
              <div className="form-group">
                <button
                  style={{ display: "inline" }}
                  className="btn btn-success"
                >
                  Register
                </button>
                <p
                  style={{
                    display: "inline",
                    marginLeft: 11,
                    fontSize: "15px",
                  }}
                >
                  Already Have an Account ?{" "}
                  <NavLink to={"/login"}>Sign In</NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegForm;
