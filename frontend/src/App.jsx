import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthProvider';
import { CartProvider } from './context/CartProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import LandingPage from './pages/shop/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import AuthDebug from './pages/auth/AuthDebug';
import VerifyEmail from './pages/auth/VerifyEmail';
import OtpVerificationDesktop1 from './pages/auth/OtpVerificationDesktop1';
import OtpVerificationDesktop2 from './pages/auth/OtpVerificationDesktop2';
import SplashScreen from './pages/common/SplashScreen';
import WelcomeCarousel from './pages/common/WelcomeCarousel';
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
import RatingsReviews from './pages/common/RatingsReviews';
import ReturnRequest from './pages/common/ReturnRequest';
import RefundStatus from './pages/common/RefundStatus';
import SellerInventory from './pages/seller/SellerInventory';
import StorefrontPreview from './pages/seller/StorefrontPreview';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminProductApprovals from './pages/admin/AdminProductApprovals';
import FlashSale from './pages/shop/FlashSale';
import ManageAddresses from './pages/user/ManageAddresses';
import AddAddress from './pages/user/AddAddress';
import OrderSuccess from './pages/shop/OrderSuccess';
import PersonalizedRecommendations from './pages/shop/PersonalizedRecommendations';
import NewListing from './pages/seller/NewListing';
import SellerOrders from './pages/seller/SellerOrders';
import SearchResults from './pages/shop/SearchResults';
import SellerSignup from './pages/seller/SellerSignup';
import WishlistCollection from './pages/shop/WishlistCollection';
import OrderSummary from './pages/shop/OrderSummary';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import TransactionHistory from './pages/common/TransactionHistory';
import ManageVariants from './pages/seller/ManageVariants';
import AdminSuspiciousActivityLog from './pages/admin/AdminSuspiciousActivityLog';
import RouteOptimization from './pages/delivery/RouteOptimization';
import StorefrontCustomizer from './pages/seller/StorefrontCustomizer';
import SubscriptionManagement from './pages/common/SubscriptionManagement';
import BankAccounts from './pages/user/BankAccounts';
import LanguageSettings from './pages/user/LanguageSettings';
import EditProfile from './pages/user/EditProfile';
import NotificationPermission from './pages/user/NotificationPermission';
import SecuritySettings from './pages/user/SecuritySettings';
import CategoryGrid from './pages/shop/CategoryGrid';
import CategoryListing from './pages/shop/CategoryListing';
import Subcategories from './pages/shop/Subcategories';
import BrandListing from './pages/shop/BrandListing';
import TrendingProducts from './pages/shop/TrendingProducts';
import DealsOffers from './pages/shop/DealsOffers';
import SponsoredProducts from './pages/shop/SponsoredProducts';
import RecentlyViewed from './pages/shop/RecentlyViewed';
import PriceDropAlerts from './pages/shop/PriceDropAlerts';
import BackInStockAlerts from './pages/common/BackInStockAlerts';
import SaveForLater from './pages/common/SaveForLater';
import SearchInput from './pages/shop/SearchInput';
import ImageSearch from './pages/shop/ImageSearch';
import VoiceSearch from './pages/shop/VoiceSearch';
import SelectOptions from './pages/shop/SelectOptions';
import FiltersModal from './pages/shop/FiltersModal';
import SortOptionsModal from './pages/shop/SortOptionsModal';
import ProductGallery from './pages/shop/ProductGallery';
import ProductDetailReview from './pages/shop/ProductDetailReview';
import ProductQA from './pages/shop/ProductQA';
import Compare from './pages/shop/Compare';
import ArtisanProfile1 from './pages/user/ArtisanProfile1';
import ArtisanProfile2 from './pages/user/ArtisanProfile2';
import StudioDetails from './pages/seller/StudioDetails';
import AuthenticCraft from './pages/common/AuthenticCraft';
import EmptyCart from './pages/shop/EmptyCart';
import PaymentMethods from './pages/user/PaymentMethods';
import PaymentMethod from './pages/user/PaymentMethod';
import AddressSelection from './pages/user/AddressSelection';
import AddNewAddress from './pages/user/AddNewAddress';
import ShippingDetails from './pages/shop/ShippingDetails';
import DigitalWallet from './pages/user/DigitalWallet';
import OrderDetail from './pages/shop/OrderDetail';
import OrderTimeline from './pages/shop/OrderTimeline';
import CancelOrder from './pages/shop/CancelOrder';
import Reorder from './pages/shop/Reorder';
import ReturnRequests from './pages/common/ReturnRequests';
import AllOrders from './pages/admin/AllOrders';
import WishlistCollections from './pages/shop/WishlistCollections';
import EmptyWishlist from './pages/shop/EmptyWishlist';
import StockLevels from './pages/seller/StockLevels';
import IncomingOrders from './pages/seller/IncomingOrders';
import OrderFulfillmentDetail from './pages/seller/OrderFulfillmentDetail';
import ShippingLabelPreview from './pages/seller/ShippingLabelPreview';
import PackagingQC from './pages/seller/PackagingQC';
import ApprovalPending from './pages/seller/ApprovalPending';
import ArtisanConciergeAI from './pages/seller/ArtisanConciergeAI';
import CreateDiscount from './pages/seller/CreateDiscount';
import ManageCoupons from './pages/seller/ManageCoupons';
import BulkImport from './pages/seller/BulkImport';

// Phase 9 Admin Additions
import ArtisanManagement from './pages/admin/ArtisanManagement';
import CategoryManagement from './pages/admin/CategoryManagement';
import DisputeResolution from './pages/admin/DisputeResolution';
import OrderDetailAdmin from './pages/admin/OrderDetailAdmin';
import ModerationRestrictions from './pages/admin/ModerationRestrictions';
import ReportsFlagsQueue from './pages/admin/ReportsFlagsQueue';
import RefundApproval from './pages/admin/RefundApproval';
import SalesAnalytics from './pages/admin/SalesAnalytics';
import BannerManagement from './pages/admin/BannerManagement';
import FraudDetection from './pages/admin/FraudDetection';
import DeliveryAgentManagement from './pages/admin/DeliveryAgentManagement';

// Phase 10 Delivery & Fleet Additions
import DeliveryLogin from './pages/delivery/DeliveryLogin';
import AgentOnboarding from './pages/delivery/AgentOnboarding';
import AssignedDeliveries from './pages/delivery/AssignedDeliveries';
import DeliveryDetails from './pages/delivery/DeliveryDetails';
import LiveNavigation from './pages/delivery/LiveNavigation';
import LiveMapTracking from './pages/delivery/LiveMapTracking';
import LiveFleetTracking from './pages/delivery/LiveFleetTracking';
import DeliveryAssignmentDashboard from './pages/delivery/DeliveryAssignmentDashboard';
import AgentLiveMap from './pages/delivery/AgentLiveMap';
import ProofOfDelivery from './pages/delivery/ProofOfDelivery';
import HandoverVerification from './pages/delivery/HandoverVerification';
import DeliveryStatusTimeline from './pages/delivery/DeliveryStatusTimeline';
import DeliverySuccess from './pages/delivery/DeliverySuccess';
import ExceptionReport from './pages/delivery/ExceptionReport';
import DeliveryAgentInfo from './pages/delivery/DeliveryAgentInfo';
import AgentProfile from './pages/delivery/AgentProfile';
import AgentAvailability from './pages/delivery/AgentAvailability';
import AvailabilitySettings from './pages/delivery/AvailabilitySettings';
import ContactDeliveryAgent from './pages/delivery/ContactDeliveryAgent';
import DeliveryPerformance from './pages/delivery/DeliveryPerformance';
import LocationPermission from './pages/delivery/LocationPermission';
import RouteOptimizationView from './pages/delivery/RouteOptimizationView';
import DeliveryEarnings from './pages/delivery/DeliveryEarnings';

// Phase 11 Finance & Revenue Additions
import SellerEarnings from './pages/seller/SellerEarnings';
import DailyWeeklyEarnings from './pages/seller/DailyWeeklyEarnings';
import RequestPayout from './pages/seller/RequestPayout';
import WithdrawalRequest from './pages/seller/WithdrawalRequest';
import PayoutManagement from './pages/admin/PayoutManagement';
import PlatformRevenue from './pages/admin/PlatformRevenue';
import RevenueOverview from './pages/admin/RevenueOverview';
import CommissionSettings from './pages/admin/CommissionSettings';
import TaxReports from './pages/seller/TaxReports';
import GSTReports from './pages/admin/GSTReports';
import AvailableRewards from './pages/user/AvailableRewards';

// Phase 12 Marketing & Support Additions
import HelpCenter from './pages/user/HelpCenter';
import FAQ from './pages/user/FAQ';
import MySupportRequests from './pages/user/MySupportRequests';
import SupportRequestDetail from './pages/user/SupportRequestDetail';
import ReportIssue from './pages/user/ReportIssue';
import CreateCampaign from './pages/marketing/CreateCampaign';
import EmailCampaigns from './pages/marketing/EmailCampaigns';
import PushNotificationCampaigns from './pages/marketing/PushNotificationCampaigns';
import NotificationsList from './pages/user/NotificationsList';
import NotificationDetail from './pages/user/NotificationDetail';
import UserProfileDetail from './pages/admin/UserProfileDetail';
import InventoryAlerts from './pages/seller/InventoryAlerts';

// Phase 13 System & Error Additions
import ServerError from './pages/common/ServerError';
import NoInternet from './pages/common/NoInternet';
import MaintenanceMode from './pages/common/MaintenanceMode';
import LoadingSkeleton from './pages/common/LoadingSkeleton';
import Settings from './pages/user/Settings';
import BankDetails from './pages/user/BankDetails';

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
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/shop" element={<Home />} />
            <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
            <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/verify-otp" element={<OtpVerificationDesktop1 />} />
            <Route path="/delivery/verify-otp" element={<OtpVerificationDesktop2 />} />
            <Route path="/splash" element={<SplashScreen />} />
            <Route path="/welcome" element={<WelcomeCarousel />} />
            <Route path="/auth-debug" element={<AuthDebug />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Elements stripe={stripePromise}><Checkout /></Elements>} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/product/:id/reviews" element={<RatingsReviews />} />
            <Route path="/return-request/:orderId" element={<ReturnRequest />} />
            <Route path="/refund-status/:orderId" element={<RefundStatus />} />
            <Route path="/track/:orderId" element={<OrderTracking />} />
            <Route path="/tracking/:id" element={<Tracking />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Seller Management Routes */}
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/seller/kyc" element={<SellerKYC />} />
            <Route path="/seller/earnings" element={<SellerEarnings />} />
            <Route path="/seller/inventory" element={<SellerInventory />} />
            <Route path="/seller/stock-levels" element={<StockLevels />} />
            <Route path="/stock-levels" element={<StockLevels />} />
            <Route path="/seller/storefront" element={<StorefrontPreview />} />
            <Route path="/storefront-preview" element={<StorefrontPreview />} />
            <Route path="/storefront/:id" element={<StorefrontPreview />} />
            <Route path="/seller/new-listing" element={<NewListing />} />
            <Route path="/new-listing" element={<NewListing />} />
            <Route path="/seller/orders" element={<SellerOrders />} />
            <Route path="/incoming-orders" element={<IncomingOrders />} />
            <Route path="/order-fulfillment-detail" element={<OrderFulfillmentDetail />} />
            <Route path="/order-fulfillment/:id" element={<OrderFulfillmentDetail />} />
            <Route path="/shipping-label-preview" element={<ShippingLabelPreview />} />
            <Route path="/shipping-label/:id" element={<ShippingLabelPreview />} />
            <Route path="/packaging-qc" element={<PackagingQC />} />
            <Route path="/packaging-qc/:id" element={<PackagingQC />} />
            <Route path="/seller/signup" element={<SellerSignup />} />
            <Route path="/seller/approval-pending" element={<ApprovalPending />} />
            <Route path="/approval-pending" element={<ApprovalPending />} />
            <Route path="/artisan-concierge" element={<ArtisanConciergeAI />} />
            <Route path="/concierge" element={<ArtisanConciergeAI />} />
            <Route path="/create-discount" element={<CreateDiscount />} />
            <Route path="/manage-coupons" element={<ManageCoupons />} />
            <Route path="/bulk-import" element={<BulkImport />} />
            <Route path="/seller/bulk-import" element={<BulkImport />} />
            <Route path="/managevariants" element={<ManageVariants />} />
            <Route path="/seller/variants" element={<ManageVariants />} />
            
            {/* Delivery & Fleet Routes */}
            <Route path="/delivery/login" element={<DeliveryLogin />} />
            <Route path="/delivery/onboarding" element={<AgentOnboarding />} />
            <Route path="/delivery/dashboard" element={<DeliveryDashboard />} />
            <Route path="/delivery/assigned" element={<AssignedDeliveries />} />
            <Route path="/delivery/details/:id" element={<DeliveryDetails />} />
            <Route path="/delivery/order/:id" element={<DeliveryDetails />} />
            <Route path="/delivery/navigation" element={<LiveNavigation />} />
            <Route path="/delivery/live-map" element={<LiveMapTracking />} />
            <Route path="/delivery/map" element={<LiveMapTracking />} />
            <Route path="/delivery/agent-map" element={<AgentLiveMap />} />
            <Route path="/delivery/proof-of-delivery" element={<ProofOfDelivery />} />
            <Route path="/delivery/pod/:id" element={<ProofOfDelivery />} />
            <Route path="/delivery/handover/:id" element={<HandoverVerification />} />
            <Route path="/delivery/status-timeline/:id" element={<DeliveryStatusTimeline />} />
            <Route path="/delivery/status-timeline" element={<DeliveryStatusTimeline />} />
            <Route path="/delivery/success" element={<DeliverySuccess />} />
            <Route path="/delivery/exception/:id" element={<ExceptionReport />} />
            <Route path="/delivery/exception" element={<ExceptionReport />} />
            <Route path="/delivery/agent-info/:id" element={<DeliveryAgentInfo />} />
            <Route path="/delivery/agent-info" element={<DeliveryAgentInfo />} />
            <Route path="/delivery/profile" element={<AgentProfile />} />
            <Route path="/delivery/availability" element={<AgentAvailability />} />
            <Route path="/delivery/availability-settings" element={<AvailabilitySettings />} />
            <Route path="/delivery/contact/:id" element={<ContactDeliveryAgent />} />
            <Route path="/delivery/contact" element={<ContactDeliveryAgent />} />
            <Route path="/delivery/performance" element={<DeliveryPerformance />} />
            <Route path="/location-permission" element={<LocationPermission />} />
            <Route path="/delivery/location-permission" element={<LocationPermission />} />
            <Route path="/admin/fleet-live" element={<LiveFleetTracking />} />
            <Route path="/admin/delivery-assignment" element={<DeliveryAssignmentDashboard />} />
            <Route path="/admin/delivery-performance" element={<DeliveryPerformance />} />
            <Route path="/delivery/kyc" element={<DeliveryKYC />} />
            <Route path="/delivery/earnings" element={<DeliveryEarnings />} />
            <Route path="/routeoptimization" element={<RouteOptimization />} />
            <Route path="/route-optimization" element={<RouteOptimizationView />} />
            
            {/* Phase 11 Finance & Revenue Routes */}
            <Route path="/seller/earnings" element={<SellerEarnings />} />
            <Route path="/seller/daily-weekly-earnings" element={<DailyWeeklyEarnings />} />
            <Route path="/seller/request-payout" element={<RequestPayout />} />
            <Route path="/seller/withdraw" element={<WithdrawalRequest />} />
            <Route path="/seller/tax-reports" element={<TaxReports />} />
            <Route path="/seller/inventory-alerts" element={<InventoryAlerts />} />
            <Route path="/admin/payouts" element={<PayoutManagement />} />
            <Route path="/admin/platform-revenue" element={<PlatformRevenue />} />
            <Route path="/admin/revenue-overview" element={<RevenueOverview />} />
            <Route path="/admin/commission-settings" element={<CommissionSettings />} />
            <Route path="/admin/gst-reports" element={<GSTReports />} />
            <Route path="/available-rewards" element={<AvailableRewards />} />
            <Route path="/rewards" element={<AvailableRewards />} />

            {/* Phase 12 Marketing & Campaigns Routes */}
            <Route path="/admin/campaigns/create" element={<CreateCampaign />} />
            <Route path="/admin/campaigns/email" element={<EmailCampaigns />} />
            <Route path="/admin/campaigns/push" element={<PushNotificationCampaigns />} />
            <Route path="/admin/user/:id" element={<UserProfileDetail />} />
            <Route path="/admin/artisan-detail/:id" element={<UserProfileDetail />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/all-orders" element={<AllOrders />} />
            <Route path="/admin/customers" element={<AdminCustomers />} />
            <Route path="/admin/artisans" element={<ArtisanManagement />} />
            <Route path="/artisan-management" element={<ArtisanManagement />} />
            <Route path="/admin/categories" element={<CategoryManagement />} />
            <Route path="/category-management" element={<CategoryManagement />} />
            <Route path="/admin/disputes" element={<DisputeResolution />} />
            <Route path="/admin/dispute/:id" element={<DisputeResolution />} />
            <Route path="/dispute-resolution" element={<DisputeResolution />} />
            <Route path="/admin/order/:id" element={<OrderDetailAdmin />} />
            <Route path="/admin/order-detail/:id" element={<OrderDetailAdmin />} />
            <Route path="/admin/moderation" element={<ModerationRestrictions />} />
            <Route path="/moderation-restrictions" element={<ModerationRestrictions />} />
            <Route path="/admin/reports" element={<ReportsFlagsQueue />} />
            <Route path="/reports-queue" element={<ReportsFlagsQueue />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/sales-analytics" element={<SalesAnalytics />} />
            <Route path="/seller/analytics" element={<SalesAnalytics />} />
            <Route path="/admin/banners" element={<BannerManagement />} />
            <Route path="/banner-management" element={<BannerManagement />} />
            <Route path="/admin/fraud" element={<FraudDetection />} />
            <Route path="/admin/fraud-detection" element={<FraudDetection />} />
            <Route path="/admin/refund-approvals" element={<RefundApproval />} />
            <Route path="/refund-approval" element={<RefundApproval />} />
            <Route path="/admin/delivery-agents" element={<DeliveryAgentManagement />} />
            <Route path="/delivery-agent-management" element={<DeliveryAgentManagement />} />
            <Route path="/admin/product-approvals" element={<AdminProductApprovals />} />
            <Route path="/adminsuspiciousactivitylog" element={<AdminSuspiciousActivityLog />} />
            
            {/* Discovery & Shop Routes */}
            <Route path="/flash-sale" element={<FlashSale />} />
            <Route path="/addresses" element={<ManageAddresses />} />
            <Route path="/add-address" element={<AddAddress />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/recommendations" element={<PersonalizedRecommendations />} />
            <Route path="/for-you" element={<PersonalizedRecommendations />} />
            <Route path="/categories" element={<CategoryGrid />} />
            <Route path="/category-listing" element={<CategoryListing />} />
            <Route path="/subcategories" element={<Subcategories />} />
            <Route path="/brands" element={<BrandListing />} />
            <Route path="/trending" element={<TrendingProducts />} />
            <Route path="/deals" element={<DealsOffers />} />
            <Route path="/offers" element={<DealsOffers />} />
            <Route path="/sponsored-products" element={<SponsoredProducts />} />
            <Route path="/recently-viewed" element={<RecentlyViewed />} />
            <Route path="/price-drops" element={<PriceDropAlerts />} />
            <Route path="/back-in-stock" element={<BackInStockAlerts />} />
            <Route path="/save-for-later" element={<SaveForLater />} />
            <Route path="/saved-for-later" element={<SaveForLater />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/search-input" element={<SearchInput />} />
            <Route path="/image-search" element={<ImageSearch />} />
            <Route path="/voice-search" element={<VoiceSearch />} />
            <Route path="/select-options" element={<SelectOptions />} />
            <Route path="/filters" element={<FiltersModal />} />
            <Route path="/sort-options" element={<SortOptionsModal />} />
            <Route path="/product-gallery" element={<ProductGallery />} />
            <Route path="/product/:id/gallery" element={<ProductGallery />} />
            <Route path="/product-review/:id" element={<ProductDetailReview />} />
            <Route path="/product-detail-review" element={<ProductDetailReview />} />
            <Route path="/product-qa" element={<ProductQA />} />
            <Route path="/product/:id/qa" element={<ProductQA />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/compare-products" element={<Compare />} />
            <Route path="/reviews" element={<RatingsReviews />} />
            <Route path="/ratings-reviews" element={<RatingsReviews />} />
            <Route path="/artisan/:id" element={<ArtisanProfile1 />} />
            <Route path="/artisan-profile-1" element={<ArtisanProfile1 />} />
            <Route path="/artisan-profile-2" element={<ArtisanProfile2 />} />
            <Route path="/studio-details" element={<StudioDetails />} />
            <Route path="/seller/studio-details" element={<StudioDetails />} />
            <Route path="/admin/studio-details" element={<StudioDetails />} />
            <Route path="/authentic-craft" element={<AuthenticCraft />} />
            <Route path="/authenticity" element={<AuthenticCraft />} />
            <Route path="/wishlist/:listId" element={<WishlistCollection />} />
            <Route path="/wishlist-collections" element={<WishlistCollections />} />
            <Route path="/empty-wishlist" element={<EmptyWishlist />} />
            <Route path="/empty-cart" element={<EmptyCart />} />
            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="/payment-methods" element={<PaymentMethods />} />
            <Route path="/payment-method" element={<PaymentMethod />} />
            <Route path="/address-selection" element={<AddressSelection />} />
            <Route path="/add-new-address" element={<AddNewAddress />} />
            <Route path="/shipping-details" element={<ShippingDetails />} />
            <Route path="/wallet" element={<DigitalWallet />} />
            <Route path="/digital-wallet" element={<DigitalWallet />} />
            <Route path="/the-vault" element={<DigitalWallet />} />
            <Route path="/order/:id" element={<OrderDetail />} />
            <Route path="/order-detail/:id" element={<OrderDetail />} />
            <Route path="/order-timeline/:id" element={<OrderTimeline />} />
            <Route path="/order-timeline" element={<OrderTimeline />} />
            <Route path="/order-journey/:id" element={<OrderTimeline />} />
            <Route path="/track-order" element={<OrderTracking />} />
            <Route path="/return-requests" element={<ReturnRequests />} />
            <Route path="/cancel-order/:id" element={<CancelOrder />} />
            <Route path="/cancel-order" element={<CancelOrder />} />
            <Route path="/reorder/:id" element={<Reorder />} />
            <Route path="/reorder" element={<Reorder />} />
            <Route path="/transactionhistory" element={<TransactionHistory />} />
            <Route path="/transaction-history" element={<TransactionHistory />} />
            <Route path="/bank-accounts" element={<BankAccounts />} />
            <Route path="/bank-details" element={<BankDetails />} />
            <Route path="/settings/language" element={<LanguageSettings />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/notifications/settings" element={<NotificationPermission />} />
            <Route path="/notifications" element={<NotificationsList />} />
            <Route path="/notifications/:id" element={<NotificationDetail />} />
            <Route path="/notification-detail" element={<NotificationDetail />} />
            <Route path="/security-settings" element={<SecuritySettings />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/support/requests" element={<MySupportRequests />} />
            <Route path="/support-requests" element={<MySupportRequests />} />
            <Route path="/report-issue" element={<ReportIssue />} />
            <Route path="/report-an-issue" element={<ReportIssue />} />
            <Route path="/support-request/:ticketId" element={<SupportRequestDetail />} />
            <Route path="/support-detail" element={<SupportRequestDetail />} />

            {/* Phase 13 System & Error Pages */}
            <Route path="/500" element={<ServerError />} />
            <Route path="/server-error" element={<ServerError />} />
            <Route path="/offline" element={<NoInternet />} />
            <Route path="/no-internet" element={<NoInternet />} />
            <Route path="/maintenance" element={<MaintenanceMode />} />
            <Route path="/skeleton" element={<LoadingSkeleton />} />
            <Route path="/loading-skeleton" element={<LoadingSkeleton />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
