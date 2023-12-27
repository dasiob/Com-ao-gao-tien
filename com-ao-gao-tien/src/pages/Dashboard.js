import React from "react";
import { fetchData } from "../helper";
import { useLoaderData } from "react-router-dom";
import Intro from "../components/Intro";
import { toast } from "react-toastify";

// loader
export function dashBoardLoader() {
  const userName = fetchData("userName");
  return { userName };
}

export async function dashBoardAction({ request }) {
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  try {
    localStorage.setItem("userName", JSON.stringify(formData.userName));
    return toast.success(`Welcome ${formData.userName}`);
  } catch (e) {
    throw new Error("There's an error in loging in");
  }
}
const Dashboard = () => {
  const { userName } = useLoaderData();
  return <>{userName ? <p>{userName}</p> : <Intro />}</>;
};

export default Dashboard;

