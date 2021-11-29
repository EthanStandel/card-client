import React, { Suspense, lazy } from "react";

import { useRoutes } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

import Loading from "./components/Loading";
import PageContainer from "./components/PageContainer";

const lazyPage = (page: () => Promise<{ default: React.ComponentType }>) => {
  const Page = lazy(page);
  return (
    <Suspense fallback={<Loading />}>
      <Page />
    </Suspense>
  );
};

const routes: Array<RouteObject> = [
  {
    path: "/",
    element: <PageContainer />,
    children: [
      {
        path: "/",
        element: lazyPage(() => import("./pages/LoginPage")),
      },
    ],
  },
];

const Routes = () => {
  const element = useRoutes(routes);
  return element;
};

export default Routes;
