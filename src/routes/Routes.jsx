import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../pages/Layout";
import Home, { loader as homeLoader } from "./Home";
import AdminHome from "./AdminHome";
import Register, { action as registerAction } from "./Register";
import Login, { action as loginAction } from "./Login";
import Logout, { loader as logoutLoader } from "./Logout";

const Routes = () => {
  const publicRoutes = [
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
          loader: homeLoader,
        },
        {
          path: "/admin",
          element: <AdminHome />,
        },
        {
          path: "/register",
          element: <Register />,
          action: registerAction,
        },
        {
          path: "/login",
          element: <Login />,
          action: loginAction,
        },
        {
          path: "/logout",
          element: <Logout />,
          loader: logoutLoader,
        },
      ],
    },
  ];

  const router = createBrowserRouter([...publicRoutes]);

  return <RouterProvider router={router} />;
};

export default Routes;
