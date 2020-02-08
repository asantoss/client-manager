import React from "react";
import { css } from "@emotion/core";
import Navbar from "./Navbar";
import { Grid } from "@material-ui/core";

export default function Layout({ children }) {
  return (
    <div
      css={css`
        color: white;
        height: 100vh;
        main {
          overflow-y: scroll;
          width: 100%;
          height: 100%;
        }
        footer {
          height: 56px;
        }
      `}
    >
      <main>{children}</main>
      <footer>
        <Navbar />
      </footer>
    </div>
  );
}
