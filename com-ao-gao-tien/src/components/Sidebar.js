import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "../assets/dashboard icon.png";
import ExpenseIcon from "../assets/expense icon.png";
import LogoutIcon from "../assets/logout icon.png";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="Sidebar">
      <Menu
        onClick={({ key }) => {
          navigate(key);
        }}
        items={[
          {
            label: "Màn hình chính",
            key: "/",
            icon: (
              <img
                src={DashboardIcon}
                className="icon-menu"
                style={{ verticalAlign: "-0.6em"}}
              />
            ),
          },
          {
            label: "Danh sách chi tiêu",
            key: "/expenses",
            icon: (
              <img
                src={ExpenseIcon}
                className="icon-menu"
                style={{ verticalAlign: "-0.6em"}}
              />
            ),
          },
          {
            label: "Đăng xuất",
            key: "/",
            icon: (
              <img
                src={LogoutIcon}
                className="icon-menu"
                style={{ verticalAlign: "-0.6em"}}
              />
            ),
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
