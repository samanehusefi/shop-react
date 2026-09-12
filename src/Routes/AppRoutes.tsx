import { Routes, Route } from "react-router-dom";

import App from "../components/App/App";
import SiteLayout from "../components/Layout/SiteLayout/SiteLayout";

import ProductDetails from "../components/Home/Products/ProductDetails/ProductDetails";

import Login from "../components/Admin/Login/Login";
import AdminLayout from "../components/Admin/AdminLayout/AdminLayout";
import Dashboard from "../components/Admin/Dashboard/Dashboard";

import Categories from "../components/Admin/Dashboard/Categories/Categories";
import CategoryForm from "../components/Admin/Dashboard/Categories/CategoryForm/CategoryForm";

import Slider from "../components/Admin/Dashboard/Slider/Slider";
import SliderForm from "../components/Admin/Dashboard/Slider/SliderForm/SliderForm";

import Banners from "../components/Admin/Dashboard/Banners/Banners";
import BannerForm from "../components/Admin/Dashboard/Banners/BannerForm/BannerForm";

import Brands from "../components/Admin/Dashboard/Brands/Brands";
import BrandForm from "../components/Admin/Dashboard/Brands/BrandsForm/BrandsForm";

import CircleBadge from "../components/Admin/Dashboard/CircleBadge/CircleBadge";
import CircleBadgeForm from "../components/Admin/Dashboard/CircleBadge/CircleBadgeForm/CircleBadgeForm";

import Amazing from "../components/Admin/Dashboard/Amazing/Amazing";
import AmazingForm from "../components/Admin/Dashboard/Amazing/AmazingForm/AmazingForm";
import Products from "../components/Admin/Dashboard/Products/Products";
import ProductForm from "../components/Admin/Dashboard/Products/ProductForm/ProductsForm";

import ProtectedRoute from "./ProtectedRoute";
import NotFound from "../components/Error/NotFound";
import FooterMobileMenuCategories from "../components/Layout/Footer/FooterMobileMenuCategories/FooterMobileMenuCategories";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<App />} />

        <Route path="/product/d/:id/:slug" element={<ProductDetails />} />

        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/categories" element={<FooterMobileMenuCategories />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />

        <Route path="categories" element={<Categories />} />
        <Route path="categories/create" element={<CategoryForm />} />
        <Route path="categories/edit/:id" element={<CategoryForm />} />

        <Route path="slider" element={<Slider />} />
        <Route path="slider/create" element={<SliderForm />} />
        <Route path="slider/edit/:id" element={<SliderForm />} />

        <Route path="banners" element={<Banners />} />
        <Route path="banners/create" element={<BannerForm />} />
        <Route path="banners/edit/:id" element={<BannerForm />} />

        <Route path="brands" element={<Brands />} />
        <Route path="brands/create" element={<BrandForm />} />
        <Route path="brands/edit/:id" element={<BrandForm />} />

        <Route path="circle-badge" element={<CircleBadge />} />
        <Route path="circle-badge/create" element={<CircleBadgeForm />} />
        <Route path="circle-badge/edit/:id" element={<CircleBadgeForm />} />

        <Route path="amazing" element={<Amazing />} />
        <Route path="amazing/create" element={<AmazingForm />} />
        <Route path="amazing/edit/:id" element={<AmazingForm />} />

        <Route path="products" element={<Products />} />
        <Route path="products/create" element={<ProductForm />} />
        <Route path="products/edit/:id" element={<ProductForm />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
