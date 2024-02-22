import React, { useState } from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "../assets/dashboard icon.png";
import ExpenseIcon from "../assets/expense icon.png";
import LogoutIcon from "../assets/logout icon.png";

const Sidebar = ({ navBarActive }) => {
  const navigate = useNavigate();

  const handleClick = (key) => {
    navigate(key);
  };

  return (
    <div className={navBarActive ? "Sidebar" : "Sidebar active"}>
      <Menu
        onClick={({ key }) => {
          handleClick(key);
        }}
        items={[
          {
            label: navBarActive ? "" : "Màn hình chính",
            key: "/",
            icon: (
              <img
                src={DashboardIcon}
                className="icon-menu"
                style={{ verticalAlign: "-0.6em" }}
              />
            ),
          },
          {
            label: navBarActive ? "" : "Danh sách chi tiêu",
            key: "/expenses",
            icon: (
              <img
                src={ExpenseIcon}
                className="icon-menu"
                style={{ verticalAlign: "-0.6em" }}
              />
            ),
          },
          {
            label: navBarActive ? "" : "Đăng xuất",
            key: "/",
            icon: (
              <img
                src={LogoutIcon}
                className="icon-menu"
                style={{ verticalAlign: "-0.6em" }}
              />
            ),
            onClick: (event) => {
              if (!window.confirm("Chắc chưa?")) {
                event.preventDefault();
              }
            },
          },
        ]}
        style={{
          fontSize: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Menu>
    </div>
  );
};

export default Sidebar;
