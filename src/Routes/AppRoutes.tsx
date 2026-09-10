import { Routes, Route } from "react-router-dom";

import App from "../components/App/App";
import Login from "../components/Admin/Login/Login";
import Dashboard from "../components/Admin/Dashboard/Dashboard";
import Categories from "../components/Admin/Dashboard/Categories/Categories";
import Slider from "../components/Admin/Dashboard/Slider/Slider";
import Banners from "../components/Admin/Dashboard/Banners/Banners";
import CircleBadge from "../components/Admin/Dashboard/CircleBadge/CircleBadge";
import AdminLayout from "../components/Admin/AdminLayout/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

import CategoryForm from "../components/Admin/Dashboard/Categories/CategoryForm/CategoryForm";
import SliderForm from "../components/Admin/Dashboard/Slider/SliderForm/SliderForm";
import BannerForm from "../components/Admin/Dashboard/Banners/BannerForm/BannerForm";
import CircleBadgeForm from "../components/Admin/Dashboard/CircleBadge/CircleBadgeForm/CircleBadgeForm";

import Amazing from "../components/Admin/Dashboard/Amazing/Amazing";
import AmazingForm from "../components/Admin/Dashboard/Amazing/AmazingForm/AmazingForm";
import Brands from "../components/Admin/Dashboard/Brands/Brands";
import BrandForm from "../components/Admin/Dashboard/Brands/BrandsForm/BrandsForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />

      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/dashboard/categories" element={<Categories />} />
          <Route
            path="/dashboard/categories/create"
            element={<CategoryForm />}
          />
          <Route
            path="/dashboard/categories/edit/:id"
            element={<CategoryForm />}
          />

          <Route path="/dashboard/slider" element={<Slider />} />
          <Route path="/dashboard/slider/create" element={<SliderForm />} />
          <Route path="/dashboard/slider/edit/:id" element={<SliderForm />} />

          <Route path="/dashboard/banners" element={<Banners />} />
          <Route path="/dashboard/banners/create" element={<BannerForm />} />
          <Route path="/dashboard/banners/edit/:id" element={<BannerForm />} />
          <Route path="/dashboard/brands" element={<Brands />} />

          <Route path="/dashboard/brands/create" element={<BrandForm />} />

          <Route path="/dashboard/brands/edit/:id" element={<BrandForm />} />
          <Route path="/dashboard/circle-badge" element={<CircleBadge />} />
          <Route
            path="/dashboard/circle-badge/create"
            element={<CircleBadgeForm />}
          />
          <Route
            path="/dashboard/circle-badge/edit/:id"
            element={<CircleBadgeForm />}
          />

          <Route path="/dashboard/amazing" element={<Amazing />} />
          <Route path="/dashboard/amazing/create" element={<AmazingForm />} />
          <Route path="/dashboard/amazing/edit/:id" element={<AmazingForm />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
