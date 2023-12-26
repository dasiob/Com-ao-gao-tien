import React from "react";
import logoMark from "../assets/logomark.svg";
import { Form, NavLink, parsePath } from "react-router-dom";
import { TrashIcon } from '@heroicons/react/24/solid';

const Nav = ({ userName }) => {
  return (
    <nav>
      <NavLink to="/" aria-label="Go to home">
        <img src={logoMark} alt="" height={30}/>
        <span>Cơm áo gạo tiền</span>
      </NavLink>
      {
        //might remove the userName condition cause later will add know users
        userName && (
          <Form method="post" action="/logout" onSubmit={(event) => {
            if (!window.confirm("U sure?")) {
              event.preventDefault()
            }
          }}>
            <button type="submit" className="btn btn--warning">
              <span>Delete User</span>
              <TrashIcon width={20}/>
            </button>
          </Form>
        )
      }
    </nav>
  );
};

export default Nav;
