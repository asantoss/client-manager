import React from "react";
import Layout from "./components/Layouts/Layout";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./components/authentication/SignUp";
import Search from "./components/Clients";
import SignIn from "./components/authentication/SignIn";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:5000/graphql"
});

const client = new ApolloClient({
  cache,
  link,
  name: "React Front End Client",
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network"
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all"
    },
    mutate: {
      errorPolicy: "all"
    }
  }
});
function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <Layout>
            <Route path="/" exact />
            <Route path="/clients" component={Search} />
            <Route path="/register" component={SignUp} />
            <Route path="/login" exact component={SignIn} />
          </Layout>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
