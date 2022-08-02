import React, { Fragment, Suspense, lazy } from 'react';
// router
import { Routes, Route } from 'react-router-dom';
// components
import { RouteProgress } from '../components';
// layout
import DashboardLayout from '../layouts/dashboard';
// guards
import AuthGuard from '../guards/AuthGuard';
import LoggedGuard from '../guards/LoggedGuard';
// paths
import { PATH_AUTH, PATH_HOME } from './paths';

export const renderRoutesList = (routes = []) =>
  routes.map((route, index) => {
    const Component = route.component || Fragment;
    const Guard = route.guard || Fragment;
    const Layout = route.layout || Fragment;
    if (!route.routes) {
      return (
        <Route
          key={index}
          path={route.path}
          element={
            <Suspense fallback={<RouteProgress />}>
              <Guard>
                <Layout>
                  <Component />
                </Layout>
              </Guard>
            </Suspense>
          }
        />
      );
    }
    return (
      <Route
        key={index}
        element={
          <Guard>
            <Layout />
          </Guard>
        }
      >
        {renderRoutesList(route.routes)}
      </Route>
    );
  });

export const renderRoutes = (routes = []) => (
  <Routes>{renderRoutesList(routes)}</Routes>
);

export const routes = [
  {
    path: PATH_AUTH.login,
    guard: LoggedGuard,
    component: lazy(() => import('../pages/authentication/Login'))
  },
  {
    path: PATH_AUTH.forgotPassword,
    guard: LoggedGuard,
    component: lazy(() => import('../pages/authentication/ForgotPassword'))
  },
  {
    path: PATH_AUTH.changePassword,
    guard: LoggedGuard,
    component: lazy(() => import('../pages/authentication/ResetPassword'))
  },
  // private routes for logged user ------------------------
  {
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      // home
      {
        path: PATH_HOME.root,
        component: lazy(() => import('../pages/dashboard/Home'))
      },
      {
        path: '/',
        component: lazy(() => import('../pages/dashboard/Home'))
      },
      {
        path: '/home/profile',
        component: lazy(() => import('../pages/dashboard/Home'))
      },
      {
        path: '/home/cards',
        component: lazy(() => import('../pages/dashboard/Home'))
      },
      {
        path: '/home/list',
        component: lazy(() => import('../pages/dashboard/Home'))
      },
      {
        path: '/user',
        component: lazy(() => import('../pages/dashboard/Home'))
      },
      {
        path: '/user/account',
        component: lazy(() => import('../pages/dashboard/Home'))
      }
    ]
  },
  {
    path: '*',
    component: lazy(() => import('../pages/Page404'))
  }
];
