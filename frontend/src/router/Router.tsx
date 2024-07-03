// src/adapters/entry/Router.tsx
import { Route, Routes } from "react-router-dom";
import { Login } from "../adapters/ui/Login";
import { ServiceList } from "../adapters/ui/ServiceList";
import Home from "../adapters/ui/Home";
import { Register } from "../adapters/ui/Register";
import Profile from "../adapters/ui/Profile";
import ProtectedRoute from "./ProtectedRoute";
import CustomerProfile from "../adapters/ui/CustomerProfile";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/services"
        element={
          <ProtectedRoute>
            <ServiceList />
          </ProtectedRoute>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <CustomerProfile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
