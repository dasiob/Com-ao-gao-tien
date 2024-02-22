import React, { useState } from "react";
import { fetchData } from "../helper";
import { Outlet, ScrollRestoration, useLoaderData } from "react-router-dom";
import wave from "../assets/wave.svg";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";

// loader
export function mainLoader() {
  const userName = fetchData("userName");
  return { userName };
}

const Main = () => {
  const { userName } = useLoaderData();

  const [menuActive, setMenuActive] = useState(true);

  const menuButtonClicked = () => {
    setMenuActive(!menuActive);
    return menuActive;
  };

  return (
    <div className="layout">
      <Nav userName={userName} menuClicked={menuButtonClicked} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingBottom: "150px",
        }}
      >
        <Sidebar navBarActive={menuActive} />
        <div className={menuActive ? "content" : "content active"}>
          <main>
            <Outlet />
            <ScrollRestoration />
          </main>
        </div>
      </div>
      <img
        src={wave}
        alt=""
        style={{ zIndex: 2, bottom: 0, position: "absolute" }}
      />
    </div>
  );
};

export default Main;
