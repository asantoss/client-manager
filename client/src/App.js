import React from "react";
import Layout from "./components/Layouts/Layout";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./components/authentication/SignUp";
import Clients from "./components/Clients";
import SignIn from "./components/authentication/SignIn";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import { Provider } from "react-redux";
import store from "./store";

import InvoiceCreator from "./pages/InvoiceCreator";
import TopBar from "./components/Layouts/TopBar";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "/graphql",
  credentials: "same-origin"
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
        <Provider store={store}>
          <Router>
            <TopBar />
            <Route
              path="/clients"
              render={() => {
                return (
                  <Layout>
                    <Clients />
                  </Layout>
                );
              }}
            />
            <Route
              path="/invoice/creator"
              render={() => {
                return (
                  <Layout>
                    <InvoiceCreator />
                  </Layout>
                );
              }}
            />
            <Route
              path="/invoices"
              render={() => {
                return (
                  <Layout>
                    <InvoiceCreator />
                  </Layout>
                );
              }}
            />
            <Route path="/register" component={SignUp} />
            <Route path="/login" exact component={SignIn} />
          </Router>
        </Provider>
      </ApolloProvider>
    </div>
  );
}

export default App;
