import React, { Fragment, Suspense, lazy } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import RouteProgress from 'components/ui-components/RouteProgress';
import DashboardLayout from 'components/layouts/DashboardLayout';
import AuthGuard from 'guards/AuthGuard';
import LoggedGuard from 'guards/LoggedGuard';

import {
  PATH_AUTH,
  PATH_HOME,
  PATH_PERSON,
  PATH_PROFILE,
  PATH_SERVICE
} from './paths';

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
            <Suspense
              fallback={
                route.path === PATH_HOME.root ? null : <RouteProgress />
              }
            >
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
    component: lazy(() => import('pages/authentication/Login'))
  },
  {
    path: PATH_AUTH.forgotPassword,
    guard: LoggedGuard,
    component: lazy(() => import('pages/authentication/ForgotPassword'))
  },
  {
    path: PATH_AUTH.changePassword,
    guard: LoggedGuard,
    component: lazy(() => import('pages/authentication/ResetPassword'))
  },
  // private routes for logged user ------------------------
  {
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      // home
      {
        path: PATH_HOME.root,
        component: lazy(() => import('pages/Dashboard'))
      },
      {
        path: '/',
        component: () => <Navigate to={PATH_HOME.root} />
      },
      // person
      {
        path: PATH_PERSON.users,
        component: lazy(() => import('pages/person/users/UserList'))
      },
      // profile
      {
        path: PATH_PROFILE.root,
        component: lazy(() => import('pages/Profile'))
      },
      // service
      {
        path: PATH_SERVICE.root,
        component: lazy(() => import('pages/Dashboard'))
      },
      {
        path: PATH_SERVICE.new,
        component: lazy(() => import('pages/services/CreateService'))
      }
    ]
  },
  {
    path: '*',
    component: lazy(() => import('pages/error/Page404'))
  }
];
