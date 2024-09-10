import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Layout from "../Layout.jsx";
import Dashboard from "./Dashboard.jsx";
import Logout from "./Logout.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="user/" element={<Layout />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="logout" element={<Logout />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <Auth0Provider
      domain="dev-vl5s6zif0qwkov3t.us.auth0.com"
      clientId="uAITTrLPvxOwr0jyyWyHborRd5yEZCNQ"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
    </Auth0Provider> */}
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>
);
