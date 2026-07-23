import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthProvider';
import { CartProvider } from './context/CartProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import LandingPage from './pages/shop/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import VerifyEmail from './pages/auth/VerifyEmail';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import AuthDebug from './pages/auth/AuthDebug';
import Home from './pages/shop/Home';
import Products from './pages/shop/Products';
import ProductDetail from './pages/shop/ProductDetail';
import Cart from './pages/shop/Cart';
import Checkout from './pages/shop/Checkout';
import Orders from './pages/shop/Orders';
import OrderTracking from './pages/delivery/OrderTracking';
import Profile from './pages/user/Profile';
import SellerDashboard from './pages/seller/SellerDashboard';
import SellerKYC from './pages/seller/SellerKYC';
import Tracking from './pages/delivery/Tracking';
import DeliveryDashboard from './pages/delivery/DeliveryDashboard';
import DeliveryKYC from './pages/delivery/DeliveryKYC';
import AdminDashboard from './pages/admin/AdminDashboard';
import Wishlist from './pages/shop/Wishlist';
import Compare from './pages/shop/Compare';
import PriceDropAlerts from './pages/shop/PriceDropAlerts';
import BackInStockAlerts from './pages/common/BackInStockAlerts';
import ProductQA from './pages/shop/ProductQA';
import RatingsReviews from './pages/common/RatingsReviews';
import HelpCenter from './pages/user/HelpCenter';
import FAQ from './pages/user/FAQ';
import ReportIssue from './pages/user/ReportIssue';
import DigitalWallet from './pages/user/DigitalWallet';
import BankAccounts from './pages/user/BankAccounts';
import OrderDetail from './pages/shop/OrderDetail';
import ReturnRequest from './pages/common/ReturnRequest';
import RefundStatus from './pages/common/RefundStatus';
import CancelOrder from './pages/shop/CancelOrder';
import ReorderScreen from './pages/shop/ReorderScreen';
import SupportRequests from './pages/user/SupportRequests';
import SellerEarnings from './pages/seller/SellerEarnings';
import SellerInventory from './pages/seller/SellerInventory';
import ManageCoupons from './pages/seller/ManageCoupons';
import StorefrontPreview from './pages/seller/StorefrontPreview';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminReports from './pages/admin/AdminReports';
import AdminProductApprovals from './pages/admin/AdminProductApprovals';
import FlashSale from './pages/shop/FlashSale';
import DealsOffers from './pages/shop/DealsOffers';
import RecentlyViewed from './pages/shop/RecentlyViewed';
import SaveForLater from './pages/common/SaveForLater';
import EditProfile from './pages/user/EditProfile';
import SecuritySettings from './pages/user/SecuritySettings';
import ManageAddresses from './pages/user/ManageAddresses';
import AddAddress from './pages/user/AddAddress';
import NotificationsList from './pages/user/NotificationsList';
import OrderSuccess from './pages/shop/OrderSuccess';
import CategoryGrid from './pages/shop/CategoryGrid';
import Settings from './pages/user/Settings';
import { NoInternet, ServerError } from './pages/common/ErrorPages';
import PersonalizedRecommendations from './pages/shop/PersonalizedRecommendations';
import AssignedDeliveries from './pages/delivery/AssignedDeliveries';
import DeliveryDetails from './pages/delivery/DeliveryDetails';
import DeliverySuccess from './pages/delivery/DeliverySuccess';
import ProofOfDelivery from './pages/delivery/ProofOfDelivery';
import DeliveryEarnings from './pages/seller/DeliveryEarnings';
import NewListing from './pages/common/NewListing';
import SellerOrders from './pages/seller/SellerOrders';
import SearchResults from './pages/shop/SearchResults';
import SellerSignup from './pages/seller/SellerSignup';
import SupportRequestDetail from './pages/user/SupportRequestDetail';
import AdminReturnRequests from './pages/admin/AdminReturnRequests';
import TrackOrder from './pages/delivery/TrackOrder';
import WishlistCollection from './pages/shop/WishlistCollection';
import OrderSummary from './pages/shop/OrderSummary';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SplashScreen from './pages/common/SplashScreen';
import TransactionHistory from './pages/common/TransactionHistory';
import ManageVariants from './pages/seller/ManageVariants';
import AdminSuspiciousActivityLog from './pages/admin/AdminSuspiciousActivityLog';
import OTPDeliveryVerification from './pages/delivery/OTPDeliveryVerification';
import RouteOptimization from './pages/delivery/RouteOptimization';
import MaintenanceMode from './pages/common/MaintenanceMode';
import StorefrontCustomizer from './pages/seller/StorefrontCustomizer';
import SubscriptionManagement from './pages/common/SubscriptionManagement';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_placeholder');

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
            <Route path="/checkout" element={<Elements stripe={stripePromise}><Checkout /></Elements>} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/price-drop-alerts" element={<PriceDropAlerts />} />
            <Route path="/back-in-stock-alerts" element={<BackInStockAlerts />} />
            <Route path="/product/:id/qa" element={<ProductQA />} />
            <Route path="/product/:id/reviews" element={<RatingsReviews />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/report-issue" element={<ReportIssue />} />
            <Route path="/wallet" element={<DigitalWallet />} />
            <Route path="/bank-accounts" element={<BankAccounts />} />
            <Route path="/order/:orderId" element={<OrderDetail />} />
            <Route path="/return-request/:orderId" element={<ReturnRequest />} />
            <Route path="/refund-status/:orderId" element={<RefundStatus />} />
            <Route path="/cancel-order/:orderId" element={<CancelOrder />} />
            <Route path="/reorder/:orderId" element={<ReorderScreen />} />
            <Route path="/support-requests" element={<SupportRequests />} />
            <Route path="/track/:orderId" element={<OrderTracking />} />
            <Route path="/tracking/:id" element={<Tracking />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/seller/kyc" element={<SellerKYC />} />
            <Route path="/seller/earnings" element={<SellerEarnings />} />
            <Route path="/seller/inventory" element={<SellerInventory />} />
            <Route path="/seller/coupons" element={<ManageCoupons />} />
            <Route path="/seller/storefront" element={<StorefrontPreview />} />
            <Route path="/storefront/:id" element={<StorefrontPreview />} />
            <Route path="/delivery/dashboard" element={<DeliveryDashboard />} />
            <Route path="/delivery/kyc" element={<DeliveryKYC />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/customers" element={<AdminCustomers />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/product-approvals" element={<AdminProductApprovals />} />
            <Route path="/flash-sale" element={<FlashSale />} />
            <Route path="/deals" element={<DealsOffers />} />
            <Route path="/recently-viewed" element={<RecentlyViewed />} />
            <Route path="/saved-for-later" element={<SaveForLater />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/security-settings" element={<SecuritySettings />} />
            <Route path="/addresses" element={<ManageAddresses />} />
            <Route path="/add-address" element={<AddAddress />} />
            <Route path="/notifications" element={<NotificationsList />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/categories" element={<CategoryGrid />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/recommendations" element={<PersonalizedRecommendations />} />
            <Route path="/delivery/assigned" element={<AssignedDeliveries />} />
            <Route path="/delivery/details/:deliveryId" element={<DeliveryDetails />} />
            <Route path="/delivery/success" element={<DeliverySuccess />} />
            <Route path="/delivery/proof-upload" element={<ProofOfDelivery />} />
            <Route path="/delivery/earnings" element={<DeliveryEarnings />} />
            <Route path="/seller/new-listing" element={<NewListing />} />
            <Route path="/seller/orders" element={<SellerOrders />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/seller/signup" element={<SellerSignup />} />
            <Route path="/support-requests/:ticketId" element={<SupportRequestDetail />} />
            <Route path="/admin/returns" element={<AdminReturnRequests />} />
            <Route path="/track/:orderId" element={<TrackOrder />} />
            <Route path="/wishlist/:listId" element={<WishlistCollection />} />
            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="/no-internet" element={<NoInternet />} />
            <Route path="/server-error" element={<ServerError />} />
            <Route path="/maintenance" element={<MaintenanceMode />} />
                  <Route path="/splash" element={<SplashScreen />} />
        <Route path="/transactionhistory" element={<TransactionHistory />} />
        <Route path="/managevariants" element={<ManageVariants />} />
        <Route path="/adminsuspiciousactivitylog" element={<AdminSuspiciousActivityLog />} />
        <Route path="/otpdeliveryverification" element={<OTPDeliveryVerification />} />
        <Route path="/routeoptimization" element={<RouteOptimization />} />
      </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
