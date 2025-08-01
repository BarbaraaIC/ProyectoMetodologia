"use strict";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from '@pages/Root'
import Home from '@pages/Home'
import Login from '@pages/Login'
import Register from '@pages/Register'
import Error404 from '@pages/Error404'
import Users from '@pages/Users'
import Profile from '@pages/Profile'
import ProtectedRoute from '@components/ProtectedRoute'
import Participants from '@pages/Participants'
import Votation from '@pages/Votation'
import Listvotation from "./pages/ListVotation";
import Event from '@pages/Event'
import Attendance from '@pages/Attendance.jsx';
import ViewEvent from "@pages/ViewEvent";
import Movimientos from "@pages/Movimientos";
import Archivo from '@pages/Archivo';
import ViewMovimientos from "./pages/ViewMovimientos";
import ViewArchivo from '@pages/ViewArchivo';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error404 />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },

      {
        path: "/users",
        element: (
          <ProtectedRoute allowedRoles={["administrador", "secretario", "presidente", "tesorero"]}>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Participants",
        element: <Participants />
      },
      {
        path: "/event",
        element: (
          <ProtectedRoute allowedRoles={["administrador", "secretario", "presidente", "tesorero"]}>
            <Event />
          </ProtectedRoute>
        ),
      },

      {
        path: "/attendance",
        element: (
          <ProtectedRoute allowedRoles={["administrador", "secretario", "presidente", "tesorero"]}>
            <Attendance />
          </ProtectedRoute>
        ),
      },
      {
        path: "/view-event",
        element: (
          <ProtectedRoute allowedRoles={["user", "usuario"]}>
            <ViewEvent />
          </ProtectedRoute>
        ),
      },
      {
        path: "/view-movimientos",
        element: (
          <ProtectedRoute allowedRoles={["user", "usuario", "presidente"]}>
            <ViewMovimientos />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: <Profile />,
      },

      {
        path: "/votation",
        element: <Votation/>
      },
      {
        path: "/Movimientos",
        element: <Movimientos />
      },
      {
        path: "/Varchivo",
        element: <ViewArchivo/>
      },
      {
      path: "/Archivo",
      element: <Archivo />
      },
      {
        path: "/listvotation",
        element: <Listvotation/>
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
