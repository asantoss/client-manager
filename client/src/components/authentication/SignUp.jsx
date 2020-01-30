import React, { useState } from "react";
import { useFormik } from "formik";
import {
  TextField,
  InputLabel,
  Button,
  InputAdornment,
  IconButton,
  OutlinedInput
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import * as Yup from "yup";
import { css } from "emotion";
import { useMutation } from "@apollo/react-hooks";
import { REGISTER } from "../../apollo/constants";

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too long!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid Email")
    .required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
});

export default function SignUp() {
  const [isPasswordShown, setPassShowed] = useState(false);

  const handleShowPassword = () => {
    setPassShowed(!isPasswordShown);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  const [handleRegister, { loading, data }] = useMutation(REGISTER);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      password: "",
      email: ""
    },
    validationSchema: SignUpSchema,
    onSubmit: values => {
      handleRegister({
        variables: { ...values }
      });
    }
  });
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
      <h1>Sign Up</h1>
      <InputLabel />
      <TextField
        name="firstName"
        label="First Name"
        variant="outlined"
        onChange={formik.handleChange}
        value={formik.values.firstName}
        helperText={formik.errors.firstName && formik.errors.firstName}
        error={!!formik.errors.firstName}
      />
      <TextField
        name="lastName"
        label="Last Name"
        variant="outlined"
        onChange={formik.handleChange}
        value={formik.values.lastName}
        helperText={formik.errors.lastName && formik.errors.lastName}
        error={!!formik.errors.lastName}
      />
      <TextField
        type="email"
        name="email"
        variant="outlined"
        label="Email"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={!!formik.errors.email}
        helperText={formik.errors.email && formik.errors.email}
      />
      <TextField
        variant="outlined"
        type={isPasswordShown ? "text" : "password"}
        autoComplete="new-password"
        required
        name="password"
        label="Password"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={!!formik.errors.password}
        helperText={formik.errors.password}
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
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  );
}
