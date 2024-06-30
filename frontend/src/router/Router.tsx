// src/adapters/entry/Router.tsx
import { Route, Routes } from "react-router-dom";
import { Login } from "../adapters/ui/Login";
import { ServiceList } from "../adapters/ui/ServiceList";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/services" element={<ServiceList />} />
    </Routes>
  );
};

export default AppRouter;
