import React, { useState } from "react";
import {
  TextField,
  Select,
  IconButton,
  NativeSelect,
  Fab
} from "@material-ui/core";
import { Add } from "@material-ui/icons";

export default function ProductPanel({ formik }) {
  const [isFlat, setIsflat] = useState(1);
  return (
    <form className="products-panel" onSubmit={formik.handleSubmit}>
      <TextField
        name="productName"
        type="text"
        label="Name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.productName}
      />
      <NativeSelect
        name="isFlat"
        onChange={e => {
          console.log(e.target.value);
          setIsflat(Number(e.target.value));
        }}
        defaultValue={isFlat ? "1" : "0"}
      >
        <option value="1">Flat Rate</option>
        <option value="0">Quantity</option>
      </NativeSelect>
      {!isFlat && (
        <TextField
          name="quantity"
          label="Qty."
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
      />
      <Fab color="primary" type="submit">
        <Add />
      </Fab>
    </form>
  );
}
