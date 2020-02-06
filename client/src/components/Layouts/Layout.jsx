import React from "react";
import { css } from "@emotion/core";
import Navbar from "./Navbar";
import { Grid } from "@material-ui/core";

export default function Layout({ children }) {
  return (
    <div
      css={css`
        margin: auto;
        footer {
          display: flex;
          flex-direction: column;
        }
      `}
    >
      <Navbar />
      <Grid className="main" container>
        {children}
      </Grid>
      <footer></footer>
    </div>
  );
}
