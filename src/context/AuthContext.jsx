// // import {createContext,useState,useContext } from "react";

// // const AuthContext = createContext();

// // export const useAuth = () => useContext(AuthContext);

// // export const AuthProvider = ({ children }) => {
// //   const [role, setRole] = useState(localStorage.getItem("role"));

// //   const login = (token, role) => {
// //     localStorage.setItem("token", token);
// //     localStorage.setItem("role", role);
// //     setRole(role);
// //   };

// //   const logout = () => {
// //     localStorage.clear();
// //     setRole(null);
// //   };

// //   return (
// //     <AuthContext.Provider value={{ role, login, logout }}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };
// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(
//     JSON.parse(localStorage.getItem("user")) || null
//   );

//   const login = (data) => {
//     localStorage.setItem("token", data.token);
//     localStorage.setItem(
//       "user",
//       JSON.stringify({ role: data.role, name: data.name })
//     );
//     setUser({ role: data.role, name: data.name });
//   };

//   const logout = () => {
//     localStorage.clear();
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
  setLoading(false);
}, [token]);


  // ✅ LOGIN
  const login = async (email, password) => {
    const res = await API.post("/api/auth/login", { email, password });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    setToken(res.data.token);
    setUser(res.data.user);

    return res.data.user;
  };

  // ✅ REGISTER
  const register = async (name, email, password, role) => {
    const res = await API.post("/api/auth/register", {
      name,
      email,
      password,
      role,
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    setToken(res.data.token);
    setUser(res.data.user);

    return res.data.user;
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
