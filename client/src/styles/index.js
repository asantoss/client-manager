import styled, { createGlobalStyle } from "styled-components";
import { Button as MaterialButton, Grid, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { animated } from "react-spring";
import React from "react-dom";
import theme from "./theme";
export { MainActions } from "./MainActions";

// const backgroundColor = theme.variants("mode", "variant", {
//   default: { light: "gray", dark: "darkgray" },
//   primary: { light: "blue", dark: "darkblue" },
//   success: { light: "green", dark: "darkgreen" },
//   warning: { light: "orange", dark: "darkorange" }
// });

export const GlobalStyle = createGlobalStyle`
*{
  box-sizing: border-box;
}
html{
  background-color: ${props => props.theme.colors.background}
}
body {
  font-size: 12px;
  font-family: 'Hind', sans-serif;
  max-width: 550px;
  margin: 70px auto; 
}



`;

export const Button = styled.button`
  color: #fff;
  padding: 6px 16px;
  min-width: 64px;
  transition: background-color 250ms;
  line-height: 1.75;
  border-radius: 4px;
  text-transform: uppercase;
  margin: 0.5em;
  font-weight: 700;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  letter-spacing: 0.02857em;
  border: 0;
  cursor: pointer;
  background-color: ${props =>
    props.variant
      ? props.theme.colors.variants[props.variant]
      : props.theme.colors.secondary};
  align-self: ${({ align }) => align && `${align}`};
  &:hover {
    opacity: 0.5;
  }
`;

export const ClientStyled = styled.div`
  margin: 1em;
  .client-panel {
    background-color: ${props => props.theme.colors.foreground};
  }
  .client-information {
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    flex-wrap: 1;
    & > .client-actions {
      align-self: flex-start;
      button {
        display: inline-block;
        margin: 1em;
        color: white;
        &.delete-button {
          background-color: red;
        }
      }
    }
  }
`;

export const ProductPanelStyled = styled(animated.div)`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background-color: ${props => props.theme.colors.foreground};
  label {
    padding-left: 1em;
  }
  p {
    margin: 1em;
  }
`;

export const LayoutStyled = styled.div`
  color: white;
  padding: 0.5em;
`;

export const SignInForm = styled.form`
  padding: 1em;
  margin: auto;
  max-width: 550px;
  height: 50vh;
  align-self: center;
  background-color: ${props => props.theme.foreground};
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  & > button {
    align-self: flex-end;
  }
`;

export const ModalStyled = styled.div`
  z-index: 5;
  width: 100vw;
  height: 100vh;

  margin-bottom: 56px;
  position: absolute;
  @media (min-width: 700px) {
    width: 550px;
  }
`;

export const DocStyled = styled(animated.div)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.colors.foreground};
  .viewer {
    width: 80%;
    height: 80%;
  }
`;
