import { useRoutes, Navigate } from "react-router-dom";
import PageNotFound from "../screen/PageNotFound";
import Layout from "../components/Layout";
import DashboardLinks from "../screen/DashboardLinks";
import Login from "../screen/Login";
import ProtectedLayout from "../components/ProtectedLayout";
import { decodeUser } from "./saveUser";
import NotFound from "../components/errors/NotFound";

export const Routing = () => {
  const userData = decodeUser();
  let routing = useRoutes([
    {
      path: "/",
      element: !userData ? (
        <Layout child={<DashboardLinks />} />
      ) : (
        <Navigate to="/dashboard" />
      ),
    },
    {
      path: "/dashboard",
      element: userData ? (
        <ProtectedLayout child={<DashboardLinks />} />
      ) : (
        <Navigate to="/" />
      ),
    },
    {
      path: "/login",
      element: userData ? <Navigate to={"/dashboard"} /> : <Login />,
    },
    {
      path: "*",
      element: userData ? (
        <ProtectedLayout
          child={<NotFound status="404" message="Page not Found" />}
        />
      ) : (
        <Layout child={<NotFound status="404" message="Page not Found" />} />
      ),
    },
  ]);
  return routing;
};
