import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./Redux/store.js";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-vl5s6zif0qwkov3t.us.auth0.com"
    clientId="uAITTrLPvxOwr0jyyWyHborRd5yEZCNQ"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "poiuytrewq",
      scope: "read:current_user update:current_user_metadata",
    }}
  >
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </Auth0Provider>
);
