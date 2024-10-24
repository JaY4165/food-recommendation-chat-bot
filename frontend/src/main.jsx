import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CssVarsProvider } from "@mui/joy";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CssVarsProvider defaultMode="dark" defaultColorScheme={"dark"}>
      <App />
    </CssVarsProvider>
  </StrictMode>
);
