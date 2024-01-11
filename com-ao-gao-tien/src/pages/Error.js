import { HomeIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link, useRouteError } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const Error = () => {
  //   const navigate = useNavigate();
  const error = useRouteError();
  const errorImageStyle = {
    display: "block",
    margin: "auto",
    maxWidth: "60%",
  };

  const goHomeButton = {
    height: "60px",
  };

  return (
    <div className="error">
      <img
        src="https://media.makeameme.org/created/its-a-bug-2365b68cf3.jpg"
        alt="Error"
        style={errorImageStyle}
      ></img>
      <p>{error.message}</p>
      <p>
        Hãy thông báo cho{" "}
        <a
          href="https://www.facebook.com/bdl.khshk/"
          style={{ fontWeight: "bold" }}
        >
          Lương
        </a>{" "}
        để fix bug :)
      </p>
      <Link className="btn btn--dark" style={goHomeButton} to="/">
        <HomeIcon width={20} />
        <span>Go home</span>
      </Link>
    </div>
  );
};

export default Error;
