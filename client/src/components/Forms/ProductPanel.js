import React, { useState } from "react";
import { useFormik } from "formik";
import {
  TextField,
  Select,
  IconButton,
  NativeSelect,
  Fab,
  MenuItem,
  Button
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
      submit(s => ({ ...s, products: [...s.products, values] }));
      formik.resetForm();
    }
  });
  return (
    <form
      css={css`
        display: flex;
        align-self: center;
        align-items: flex-end;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-bottom: 1em;
        [name="price"] {
          width: 80px;
        }
      `}
      onSubmit={formik.handleSubmit}
    >
      <TextField
        name="productName"
        type="text"
        label="Name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.productName}
        required
      />
      <TextField
        select
        name="isFlat"
        onChange={e => {
          console.log(e.target.value);
          setIsflat(Number(e.target.value));
        }}
        defaultValue={"1"}
      >
        <MenuItem value="1">Flat Rate</MenuItem>
        <MenuItem value="0">Quantity</MenuItem>
      </TextField>
      {!isFlat && (
        <TextField
          name="quantity"
          label="Qty."
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.quantity}
          required
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
        required
      />
      <Button
        type="submit"
        variant="contained"
        style={{ color: "white", marginTop: "0.5em" }}
        color="primary"
      >
        Save
      </Button>
    </form>
  );
}
