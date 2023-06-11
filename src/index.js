import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <GoogleOAuthProvider clientId="742616139312-etc31svvhrng616ag7gddlb227k5ash2.apps.googleusercontent.com">
      <BrowserRouter>
      <App/>
    </BrowserRouter>
   </GoogleOAuthProvider>
 
);

