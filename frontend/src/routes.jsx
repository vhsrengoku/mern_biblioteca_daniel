import { createBrowserRouter } from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Homepage from "./pages/Homepage";
import NotFoundPage from "./pages/NotFoundPage";
import CreateBookPage from "./pages/CreateBookPage";

const routes = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/create-book",
        element: <CreateBookPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default routes;