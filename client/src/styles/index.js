import styled from "styled-components";
import { Button as MaterialButton, Grid } from "@material-ui/core";
import { animated } from "react-spring";

export const Button = styled(MaterialButton)`
  color: #1c1c1b;
  margin: 0.5em;
  font-weight: 500;
  background-color: #f7a705;
  align-self: ${({ align }) => align && `${align}`};
  &:hover {
    opacity: 0.5;
    background-color: #f7a705;
  }
`;

export const ClientStyled = styled(Grid)`
  margin: 0.5em;
  .client-panel {
    background-color: #bfbfba;
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
  margin-bottom: 56px;
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 5;
  background-color: #212120;
  width: 100%;
  height: cacl(100%-56px);
  overflow-x: hidden;
  padding-bottom: 1em;
  .main-actions {
    color: #f7a705;
    display: flex;
    justify-content: space-between;
    padding: 1em;
  }
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
