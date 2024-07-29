import { Navigate, Outlet } from "react-router-dom";
import React from "react";

export default function SafeRoutes({
  roles,
  children,
}: {
  roles: string[];
  children?: JSX.Element;
}) {
  const isLogged = sessionStorage.getItem("isLogged");
  const userRole = sessionStorage.getItem("userRole") || "";

  if (!isLogged) {
    return <Navigate to="/" replace state={{ alertMessage: "עליך להתחבר כדי להמשיך" }} />;
  }

  if (roles.length > 0 && !roles.includes(userRole)) {
    return <Navigate to="/" replace state={{ alertMessage: "אין לך הרשאה לגשת לדף זה" }} />;
  }

  return children || <Outlet />;
}
