import { createBrowserRouter } from "react-router";
import { Home } from "../pages/home";
import { NotFoundPage } from "../pages/not-found-page";
import { RedirectingPage } from "../pages/redirecting-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/:shortenedLink",
    element: <RedirectingPage />,
    loader: async ({ params }) => {
      return params.shortenedLink;
    },
    errorElement: <NotFoundPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);