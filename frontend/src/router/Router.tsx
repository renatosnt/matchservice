// src/adapters/entry/Router.tsx
import { Route, Routes } from "react-router-dom";
import { Login } from "../adapters/ui/Login";
import { ServiceList } from "../adapters/ui/ServiceList";
import Home from "../adapters/ui/Home";
import { Register } from "../adapters/ui/Register";
import Profile from "../adapters/ui/Profile";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/services" element={<ServiceList />} />
      <Route path="/register" element={<Register />} />
      <Route path="/account" element={<Profile />} />
    </Routes>
  );
};

export default AppRouter;
