import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { PrimeReactProvider } from "primereact/api";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <PrimeReactProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <ToastContainer />
      </Provider>
    </BrowserRouter>
  </PrimeReactProvider>,
);
