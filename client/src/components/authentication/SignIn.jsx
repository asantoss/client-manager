import React, { useState } from "react";
import { useFormik } from "formik";
import {
  TextField,
  InputLabel,
  Button,
  Typography,
  IconButton,
  InputAdornment
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { css } from "emotion";
import { useLazyQuery } from "@apollo/react-hooks";

import { LOGIN } from "../../apollo/constants";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [isPasswordShown, setPassShowed] = useState(false);
  const [handleLogin, { loading, data }] = useLazyQuery(LOGIN);
  const formik = useFormik({
    initialValues: {
      password: "",
      email: ""
    },
    onSubmit: values => {
      handleLogin({ variables: { ...values } });
    }
  });
  const handleShowPassword = () => {
    setPassShowed(!isPasswordShown);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  if (loading) return <p>Loading....</p>;
  if (data) {
    alert(JSON.stringify(data, null, 2));
  }
  return (
    <form
      className={css`
        height: 500px;
        width: 600px;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        & > button {
          align-self: flex-end;
          width: 100px;
        }
      `}
      onSubmit={formik.handleSubmit}
    >
      <Typography variant="h2">Sign In</Typography>
      <InputLabel />
      <TextField
        variant="outlined"
        type="email"
        name="email"
        label="Email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <TextField
        variant="outlined"
        type={isPasswordShown ? "text" : "password"}
        name="password"
        label="Password"
        onChange={formik.handleChange}
        value={formik.values.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {isPasswordShown ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Link to="/register">Don't have an account?</Link>
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}
