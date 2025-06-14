import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import Body1 from "./components/Body1";



createRoot(document.getElementById("root")).render(
  <StrictMode>
     <Body1 />
  </StrictMode>
);
