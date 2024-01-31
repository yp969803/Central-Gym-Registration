import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Toaster } from "react-hot-toast";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import AdminState from "./context/admin/adminState";
import UserState from "./context/user/userState";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminState>
        <UserState>
          <Toaster />
          <App />
        </UserState>
      </AdminState>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
