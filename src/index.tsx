import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { router } from "./Router";
import { RouterProvider } from "react-router-dom";
// import {init_leancloud} from '@/Init';

// init_leancloud();
import { API_SERVER, APP_ID, APP_KEY, REGION, init_leancloud } from "@/Init";
import * as adapters from "@leancloud/platform-adapters-browser";
import * as AV from "leancloud-storage";
import { ThemeProvider } from "@emotion/react";
import theme from "./Theme";
import { CssBaseline } from "@mui/material";

AV.setAdapters(adapters);
AV.init({
  appId: APP_ID,
  appKey: APP_KEY,
  region: REGION,
  serverURL: API_SERVER,
});
localStorage.setItem("debug", "leancloud*");
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
