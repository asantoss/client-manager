import React from "react";
import { Grid } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { css } from "@emotion/core";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div
      css={css`
        width: 90vw;
        max-width: 768px;
        margin: auto;
        footer {
          display: flex;
          flex-direction: column;
        }
        main {
          display: flex;
          min-height: 90vh;
          width: 100%;
        }
      `}
    >
      <Navbar />
      <main>{children}</main>
      <footer>
        <a href="">Home</a>
        <a href="">Clients</a>
        <a href="">Reviews</a>
        <a href="">About</a>
      </footer>
    </div>
  );
}
