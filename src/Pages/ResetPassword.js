import React, { useState } from "react";
import { useParams } from "react-router";
import Navbar from "../Components/Navbar";
import { handleAuthInfo } from "./LoginMethods/LoginMethods";

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetRequest = (e) => {
    e.preventDefault();

    handleAuthInfo(
      "https://mighty-springs-16344.herokuapp.com/change-password",
      "POST",
      { email }
    ).then((data) => {
      setMessage(data.message);
    });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    handleAuthInfo(
      "https://mighty-springs-16344.herokuapp.com/update-password",
      "PUT",
      {
        newPassword: password,
        resetToken,
      }
    ).then((data) => {
      setMessage(data.message);
    });
  };

  return (
    <div>
      <Navbar />
      <div className="card m-auto mt-5" style={{ maxWidth: 500 }}>
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
            <div className="mb-3">
              <label htmlFor="exampleInput" className="form-label">
                {resetToken ? "Password" : " Email address "}
              </label>
              <input
                type={resetToken ? "password" : "email"}
                className="form-control form-control-sm"
                id="exampleInput"
                aria-describedby="emailHelp"
                onBlur={
                  resetToken
                    ? (e) => {
                        setPassword(e.target.value);
                      }
                    : (e) => {
                        setEmail(e.target.value);
                      }
                }
              />
            </div>

            <button
              type="submit"
              onClick={
                resetToken
                  ? (e) => handleResetPassword(e)
                  : (e) => handleResetRequest(e)
              }
              className="btn btn-primary w-100"
            >
              {resetToken ? "Change Password" : " Request for reset password"}
            </button>
          </form>
          {message && (
            <div className="p-3 text-center mt-3 mb-3 bg-info">{message}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
