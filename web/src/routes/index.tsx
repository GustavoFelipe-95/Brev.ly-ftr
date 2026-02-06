import { createBrowserRouter } from "react-router";
import { Home } from "../pages/home";
import { NotFoundPage } from "../pages/not-found-page";
import { RedirectingPage } from "../pages/redirecting-page";
import { searchOneShortLink } from "../interceptor/short-link-search";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/:shortenedLink",
    element: <RedirectingPage />,
    loader: searchOneShortLink,
    errorElement: <NotFoundPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);