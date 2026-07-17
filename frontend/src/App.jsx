import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthProvider';
import { CartProvider } from './context/CartProvider';
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
import Wishlist from './pages/Wishlist';
import Compare from './pages/Compare';
import PriceDropAlerts from './pages/PriceDropAlerts';
import BackInStockAlerts from './pages/BackInStockAlerts';
import ProductQA from './pages/ProductQA';
import RatingsReviews from './pages/RatingsReviews';
import HelpCenter from './pages/HelpCenter';
import FAQ from './pages/FAQ';
import ReportIssue from './pages/ReportIssue';
import DigitalWallet from './pages/DigitalWallet';
import BankAccounts from './pages/BankAccounts';
import OrderDetail from './pages/OrderDetail';
import ReturnRequest from './pages/ReturnRequest';
import RefundStatus from './pages/RefundStatus';
import CancelOrder from './pages/CancelOrder';
import ReorderScreen from './pages/ReorderScreen';
import SupportRequests from './pages/SupportRequests';
import SellerEarnings from './pages/SellerEarnings';
import SellerInventory from './pages/SellerInventory';
import ManageCoupons from './pages/ManageCoupons';
import StorefrontPreview from './pages/StorefrontPreview';
import AdminOrders from './pages/AdminOrders';
import AdminCustomers from './pages/AdminCustomers';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminReports from './pages/AdminReports';
import AdminProductApprovals from './pages/AdminProductApprovals';
import FlashSale from './pages/FlashSale';
import DealsOffers from './pages/DealsOffers';
import RecentlyViewed from './pages/RecentlyViewed';
import SaveForLater from './pages/SaveForLater';
import EditProfile from './pages/EditProfile';
import SecuritySettings from './pages/SecuritySettings';
import ManageAddresses from './pages/ManageAddresses';
import AddAddress from './pages/AddAddress';
import NotificationsList from './pages/NotificationsList';
import OrderSuccess from './pages/OrderSuccess';
import CategoryGrid from './pages/CategoryGrid';
import Settings from './pages/Settings';
import { NoInternet, ServerError } from './pages/ErrorPages';
import PersonalizedRecommendations from './pages/PersonalizedRecommendations';
import AssignedDeliveries from './pages/AssignedDeliveries';
import DeliveryDetails from './pages/DeliveryDetails';
import DeliverySuccess from './pages/DeliverySuccess';
import ProofOfDelivery from './pages/ProofOfDelivery';
import DeliveryEarnings from './pages/DeliveryEarnings';
import NewListing from './pages/NewListing';
import SellerOrders from './pages/SellerOrders';
import SearchResults from './pages/SearchResults';
import SellerSignup from './pages/SellerSignup';
import SupportRequestDetail from './pages/SupportRequestDetail';
import AdminReturnRequests from './pages/AdminReturnRequests';
import TrackOrder from './pages/TrackOrder';
import WishlistCollection from './pages/WishlistCollection';
import OrderSummary from './pages/OrderSummary';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SplashScreen from './pages/SplashScreen';
import TransactionHistory from './pages/TransactionHistory';
import ManageVariants from './pages/ManageVariants';
import AdminSuspiciousActivityLog from './pages/AdminSuspiciousActivityLog';
import OTPDeliveryVerification from './pages/OTPDeliveryVerification';
import RouteOptimization from './pages/RouteOptimization';
import MaintenanceMode from './pages/MaintenanceMode';
import StorefrontCustomizer from './pages/StorefrontCustomizer';
import SubscriptionManagement from './pages/SubscriptionManagement';

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
