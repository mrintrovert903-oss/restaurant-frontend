import { BrowserRouter, Router,Routes, Route, Navigate } from "react-router-dom";
import { useAuth,AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/Userdashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// const App = () => {
//   const { user } = useAuth();
// const role = user?.role;


//   return (
//     <BrowserRouter>
//       <Routes>
//        <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         <Route
//           path="/user"
//           element={role === "USER" ? <UserDashboard /> : <Navigate to="/" />}
//         />
//         <Route
//           path="/admin"
//           element={role === "ADMIN" ? <AdminDashboard /> : <Navigate to="/" />}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
const PrivateRoute = ({ children, adminOnly }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/customer" />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/customer" 
            element={
              <PrivateRoute>
                <UserDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <PrivateRoute adminOnly={true}>
                <AdminDashboard />
              </PrivateRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;