import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './services/AuthProvider';
import { CartProvider } from './services/CartProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AuthDebug from './pages/AuthDebug';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OrderTracking from './pages/OrderTracking';
import Profile from './pages/Profile';
import SellerDashboard from './pages/SellerDashboard';
import SellerKYC from './pages/SellerKYC';
import Tracking from './pages/Tracking';
import DeliveryDashboard from './pages/DeliveryDashboard';
import DeliveryKYC from './pages/DeliveryKYC';
import AdminDashboard from './pages/AdminDashboard';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return children;
  }

  return <Navigate to={user?.role === 'SELLER' ? '/seller/dashboard' : '/profile'} replace />;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
            <Route path="/shop" element={<Home />} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/verify-email" element={<PublicRoute><VerifyEmail /></PublicRoute>} />
            <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
            <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />
            <Route path="/auth-debug" element={<AuthDebug />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/track/:orderId" element={<OrderTracking />} />
            <Route path="/tracking/:id" element={<Tracking />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/seller/kyc" element={<SellerKYC />} />
            <Route path="/delivery/dashboard" element={<DeliveryDashboard />} />
            <Route path="/delivery/kyc" element={<DeliveryKYC />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
