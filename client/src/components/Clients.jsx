import React from "react";
import { GET_CLIENTS } from "../apollo/constants";
import { useQuery } from "@apollo/react-hooks";

export default function Clients() {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  if (loading) return <p>loading....</p>;
  if (error) return <p>Had some trouble making this request</p>;
  if (data && data.getMe) {
    return <pre>{JSON.stringify(data.getMe, null, 2)}</pre>;
  }
}
