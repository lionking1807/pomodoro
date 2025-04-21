import ReactDOM from "react-dom/client";
import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Page from "./Page";
import "./index.css";
import TimerPage from "./Timer/TimerPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Page />,
  },
  {
    path:'/timer',
    element: <TimerPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
