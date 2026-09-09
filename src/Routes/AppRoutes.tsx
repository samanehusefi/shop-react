import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "../components/App/App";
import Login from "../components/Admin/Login/Login";
import Dashboard from "../components/Admin/Dashboard/Dashboard";
import Categories from "../components/Admin/Dashboard/Categories/Categories";
import Slider from "../components/Admin/Dashboard/Slider/Slider";
import Banners from "../components/Admin/Dashboard/Banners/Banners";
import AdminLayout from "../components/Admin/AdminLayout/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/categories" element={<Categories />} />
            <Route path="/dashboard/slider" element={<Slider />} />
            <Route path="/dashboard/banners" element={<Banners />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
