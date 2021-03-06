import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Navbar from "../Components/Navbar";
const SignUp = () => {
  const history = useHistory();
  const [signUpInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [displayMessage, setDisplayMessage] = useState({});
  const [isDisplayMessage, setIsDisplayMessage] = useState(false);
  const inputChange = (e) => {
    const userInfo = { ...signUpInfo };
    userInfo[e.target.name] = e.target.value;
    setSignUpInfo(userInfo);
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    fetch("https://mighty-springs-16344.herokuapp.com/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isSignedUp) {
          localStorage.setItem("instragram-jwt", JSON.stringify(data));
          setSignUpInfo({});
          return history.push("/login");
        }

        tiggerMessage(data);
      });
  };

  const tiggerMessage = (data) => {
    setDisplayMessage(data);
    setIsDisplayMessage(!isDisplayMessage);
    setTimeout(() => {
      setIsDisplayMessage(!isDisplayMessage);
    }, 10000);
  };

  return (
    <div>
      <Navbar />
      <div className="card m-auto mt-5" style={{ maxWidth: 500 }}>
        {isDisplayMessage && (
          <div
            className={`m-3 p-4 ${
              displayMessage.isSignedUp ? "bg-success" : "bg-danger"
            }`}
          >
            <p>{displayMessage.message}</p>
          </div>
        )}
        <div className="card-body">
          <form>
            <legend
              className="text-center"
              style={{
                fontFamily: "Grand Hotel, cursive",
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              Buddy-zone
            </legend>
            <div className=" position-relative">
              <label htmlFor="validationTooltip01" className="form-label">
                First name
              </label>
              <input
                type="text"
                name="name"
                onBlur={inputChange}
                className="form-control form-control-sm"
                id="validationTooltip01"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                onBlur={inputChange}
                className="form-control form-control-sm"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                onBlur={inputChange}
                className="form-control form-control-sm"
                id="exampleInputPassword1"
                required
              />
            </div>

            <button
              type="submit"
              onClick={(e) => handleSignUp(e)}
              className="btn btn-primary w-100"
            >
              SignUp
            </button>
          </form>
          <Link to="/login" className="text-center p-2">
            <p>Already have an account? LogIn</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
