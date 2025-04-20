import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Assure-toi d'importer BrowserRouter
import Page from "./Page";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Page />
  </BrowserRouter>
);
