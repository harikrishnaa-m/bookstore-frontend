import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SearchContextShare from "./context/SearchContextShare.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="700608713885-gqi9f8g2egco3ne61gq42albffve2koi.apps.googleusercontent.com">
        <SearchContextShare>
          <App />
        </SearchContextShare>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
);
