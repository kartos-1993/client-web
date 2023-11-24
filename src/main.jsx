import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(store);

const queryClient = new QueryClient();

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </PersistGate>
  </Provider>,

  document.getElementById("root")

  // </React.StrictMode>
);
