import React, { useState } from "react";
import { useFormik } from "formik";
import {
  TextField,
  Select,
  IconButton,
  NativeSelect,
  Fab,
  MenuItem
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { css } from "@emotion/core";

export default function ProductPanel({ submit }) {
  const [isFlat, setIsflat] = useState(1);
  const formik = useFormik({
    initialValues: {
      productName: "",
      price: 0,
      quantity: 0
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      submit(values);
    }
  });
  return (
    <form
      css={css`
        width: 600px;
        display: flex;
        align-self: center;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 1em;
        select {
          margin: 1em;
        }
        input {
          margin: 0 1.5em;
          &[name="productName"] {
            width: 100px;
          }
          &[name="price"] {
            width: 50px;
          }
          &[name="quantity"] {
            width: 25px;
          }
          &[name="isFlat"] {
            width: 30px;
          }
        }
      `}
      onSubmit={formik.handleSubmit}
    >
      <TextField
        name="productName"
        type="text"
        label="Name"
        variant="outlined"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.productName}
      />
      <TextField
        select
        variant="outlined"
        name="isFlat"
        onChange={e => {
          console.log(e.target.value);
          setIsflat(Number(e.target.value));
        }}
        defaultValue={isFlat ? "1" : "0"}
      >
        <MenuItem value="1">Flat Rate</MenuItem>
        <MenuItem value="0">Quantity</MenuItem>
      </TextField>
      {!isFlat && (
        <TextField
          name="quantity"
          label="Qty."
          variant="outlined"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.quantity}
        />
      )}
      <TextField
        type="number"
        name="price"
        label="Price"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.price}
        min="0.01"
        step="0.01"
        max="2500"
        variant="outlined"
      />
      <Fab color="primary" type="submit">
        <Add />
      </Fab>
    </form>
  );
}
