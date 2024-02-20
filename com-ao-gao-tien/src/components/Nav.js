import React from "react";
import logoMark from "../assets/logomark.svg";
import { Form, NavLink } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";

const Nav = ({ userName }) => {
  return (
    <nav>
      <NavLink to="/" aria-label="Go to home">
        <img src={logoMark} alt="" height={30} />
        <span>Cơm áo gạo tiền</span>
      </NavLink>
      {
        //might remove the userName condition cause later will add know users
        userName && (
          <Form
            method="post"
            action="/logout"
            onSubmit={(event) => {
              if (!window.confirm("Chắc chưa?")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit" className="btn btn--logout">
              <span><b>Xóa user</b></span>
              <TrashIcon width={20} />
            </button>
          </Form>
        )
      }
    </nav>
  );
};

export default Nav;
