import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <GoogleOAuthProvider clientId="376455865552-4462ieau79kjemsftg0ghdgjljomds06.apps.googleusercontent.com">
      <BrowserRouter>
      <App/>
    </BrowserRouter>
   </GoogleOAuthProvider>
 
);

