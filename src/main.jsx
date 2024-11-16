import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import PlayList from "./pages/PlayList.jsx";
import { Provider } from "react-redux";
import { Store } from "./Redux/Store.js";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/search/:search",
          element: <Search />,
        },
        {
          path: "/playlist",
          element: <PlayList />,
        },
      ],
    },
  ],
  {
    basename: "/Beat-Tunes-MusicPlayer",
    future: {
      v7_partialHydration: true,
    },
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
