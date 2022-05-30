import ReactDOM from "react-dom/client";

// hooks
import { BrowserRouter } from "react-router-dom"

// components
import App from "./App";


const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <BrowserRouter >
    <App />
  </BrowserRouter>,
);