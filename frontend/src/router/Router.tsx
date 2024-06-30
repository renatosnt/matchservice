// src/adapters/entry/Router.tsx
import { Route, Routes } from "react-router-dom";
import { Login } from "../adapters/ui/Login";
import { ServiceList } from "../adapters/ui/ServiceList";
import Home from "../adapters/ui/Home";
import Register from "../adapters/ui/Register";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/services" element={<ServiceList />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRouter;
