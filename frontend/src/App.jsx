import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyOrders from "./pages/MyOrders";

import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminProductsList from "./pages/AdminProductsList";

import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminOrders from "./pages/AdminOrders";
import Profile from "./pages/Profile";
import AdminUsers from "./pages/AdminUsers";

import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import AdminCoupons from "./pages/AdminCoupons";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Chatbot from "./components/Chatbot";



function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/admin/coupons" element={<AdminCoupons />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        
        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedAdminRoute>
              <AdminProducts />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/products-list"
          element={
            <ProtectedAdminRoute>
              <AdminProductsList />
            </ProtectedAdminRoute>
          }
        />
        <Route
    path="/admin/orders"
    element={
      <ProtectedAdminRoute>
        <AdminOrders />
      </ProtectedAdminRoute>
    }
  />
  <Route
    path="/admin/users"
    element={
      <ProtectedAdminRoute>
        <AdminUsers />
      </ProtectedAdminRoute>
    }
  />
      </Routes>
      <Chatbot />
    </>
  );
}

export default App;