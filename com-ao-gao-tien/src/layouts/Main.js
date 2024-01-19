import React from "react";
import { fetchData } from "../helper";
import { Outlet, useLoaderData } from "react-router-dom";
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
  return (
    <div className="layout">
      <Nav userName={userName} />
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
        <Sidebar />
        <div style={{ paddingLeft: "20px", width: `calc(100% - 250px)`, marginTop: "95px"}}>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
      <img src={wave} alt="" style={{ zIndex: 2 }}/>
    </div>
  );
};

export default Main;
