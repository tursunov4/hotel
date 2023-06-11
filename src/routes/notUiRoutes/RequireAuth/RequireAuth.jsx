import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import axiosInstance from "../../../axios";

async function isAuth() {
  try {
    if (localStorage.getItem("token")) {
      const response = await axiosInstance.get("/partner/hotels/", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });

      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
function RequireAuth() {
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = await isAuth();
      setAuthenticated(isAuthenticated);
    };

    checkAuthentication();
  }, []); // Пустой массив зависимостей

  if (authenticated === null) {
    return <div>Loading...</div>;
  }
  if (!authenticated) {
    return <Outlet/>;
  }

  return (
    <Navigate to="/registre-new-object/1" state={{ from: location }} replace />
  );
}

export default RequireAuth;
