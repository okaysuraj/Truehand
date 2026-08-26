import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';
import { colors } from '../theme/theme';

// Screens
import SplashScreen from '../screens/common/SplashScreen';
import WelcomeScreen from '../screens/common/WelcomeScreen';
import HomeScreen from '../screens/shop/HomeScreen';
import SearchScreen from '../screens/shop/SearchScreen';
import CartScreen from '../screens/shop/CartScreen';
import ProfileScreen from '../screens/user/ProfileScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CheckoutScreen from '../screens/shop/CheckoutScreen';
import PaymentMethodSelectionScreen from '../screens/common/PaymentMethodSelectionScreen';
import OrderSummaryScreen from '../screens/shop/OrderSummaryScreen';
import TrackingScreen from '../screens/delivery/TrackingScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import OTPVerificationScreen from '../screens/auth/OTPVerificationScreen';
import CategoryGridScreen from '../screens/shop/CategoryGridScreen';
import CategoryListingScreen from '../screens/shop/CategoryListingScreen';
import SubcategoriesScreen from '../screens/shop/SubcategoriesScreen';
import FiltersScreen from '../screens/common/FiltersScreen';
import SortOptionsModal from '../screens/common/SortOptionsModal';
import SearchResultsScreen from '../screens/shop/SearchResultsScreen';
import ImageSearchUploadScreen from '../screens/shop/ImageSearchUploadScreen';
import VoiceSearchScreen from '../screens/shop/VoiceSearchScreen';
import ProductImageGalleryScreen from '../screens/shop/ProductImageGalleryScreen';
import ProductVariantSelectionModal from '../screens/seller/ProductVariantSelectionModal';
import RatingsReviewsScreen from '../screens/common/RatingsReviewsScreen';
import ProductQAScreen from '../screens/shop/ProductQAScreen';
import EditProfileScreen from '../screens/user/EditProfileScreen';
import ManageAddressesScreen from '../screens/user/ManageAddressesScreen';
import PaymentMethodsScreen from '../screens/common/PaymentMethodsScreen';
import WishlistScreen from '../screens/shop/WishlistScreen';
import SettingsScreen from '../screens/user/SettingsScreen';
import LanguageSettingsScreen from '../screens/user/LanguageSettingsScreen';
import SecuritySettingsScreen from '../screens/user/SecuritySettingsScreen';
import OrderDetailScreen from '../screens/shop/OrderDetailScreen';
import OrderSuccessConfirmationScreen from '../screens/shop/OrderSuccessConfirmationScreen';
import ReturnRequestScreen from '../screens/common/ReturnRequestScreen';
import RefundStatusScreen from '../screens/common/RefundStatusScreen';
import DeliveryLoginScreen from '../screens/delivery/DeliveryLoginScreen';
import DeliveryHomeScreen from '../screens/delivery/DeliveryHomeScreen';
import AssignedDeliveriesListScreen from '../screens/delivery/AssignedDeliveriesListScreen';
import DeliveryDetailScreen from '../screens/delivery/DeliveryDetailScreen';
import DeliveryLiveMapScreen from '../screens/delivery/DeliveryLiveMapScreen';
import OTPDeliveryVerificationScreen from '../screens/delivery/OTPDeliveryVerificationScreen';
import ProofOfDeliveryUploadScreen from '../screens/delivery/ProofOfDeliveryUploadScreen';
import DeliverySuccessScreen from '../screens/delivery/DeliverySuccessScreen';

// Phase 4 Screens
import OrderTimelineScreen from '../screens/shop/OrderTimelineScreen';
import CancelOrderScreen from '../screens/shop/CancelOrderScreen';
import ReportIssueScreen from '../screens/user/ReportIssueScreen';
import BackInStockAlertsScreen from '../screens/common/BackInStockAlertsScreen';
import PriceDropAlertsScreen from '../screens/shop/PriceDropAlertsScreen';

// Seller Flow
import SellerDashboardScreen from '../screens/seller/SellerDashboardScreen';
import SellerEarningsPayoutScreen from '../screens/seller/SellerEarningsPayoutScreen';
import InventoryManagementScreen from '../screens/seller/InventoryManagementScreen';
import AddEditProductScreen from '../screens/shop/AddEditProductScreen';
import OrderFulfillmentScreen from '../screens/shop/OrderFulfillmentScreen';

// Phase 1 Onboarding & Permissions
import KYCScreen from '../screens/common/KYCScreen';
import KYCVerificationScreen from '../screens/common/KYCVerificationScreen';
import LocationPermissionScreen from '../screens/common/LocationPermissionScreen';
import NotificationPermissionScreen from '../screens/user/NotificationPermissionScreen';

// Phase 2 Screens
import DealsOffersScreen from '../screens/shop/DealsOffersScreen';
import FlashSaleScreen from '../screens/shop/FlashSaleScreen';
import TrendingProductsScreen from '../screens/shop/TrendingProductsScreen';
import RecentlyViewedScreen from '../screens/shop/RecentlyViewedScreen';
import PersonalizedRecommendationsScreen from '../screens/shop/PersonalizedRecommendationsScreen';
import BrandListingScreen from '../screens/shop/BrandListingScreen';
import AuthenticCraftScreen from '../screens/auth/AuthenticCraftScreen';

// Phase 3 Screens
import CouponSelectionScreen from '../screens/seller/CouponSelectionScreen';
import AddNewAddressScreen from '../screens/user/AddNewAddressScreen';
import AddressSelectionScreen from '../screens/user/AddressSelectionScreen';
import BankAccountsScreen from '../screens/user/BankAccountsScreen';
import WalletScreen from '../screens/user/WalletScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
import SupportRequestDetailScreen from '../screens/user/SupportRequestDetailScreen';
import HelpCenterScreen from '../screens/user/HelpCenterScreen';
import MySupportRequestsScreen from '../screens/user/MySupportRequestsScreen';
import SalesAnalyticsScreen from '../screens/common/SalesAnalyticsScreen';
import TransactionHistoryScreen from '../screens/common/TransactionHistoryScreen';
import PackagingQCScreen from '../screens/common/PackagingQCScreen';
import ShippingLabelPreviewScreen from '../screens/common/ShippingLabelPreviewScreen';
import RouteOptimizationScreen from '../screens/delivery/RouteOptimizationScreen';
import TaxReportsScreen from '../screens/user/TaxReportsScreen';
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import AdminProductApprovalsScreen from '../screens/admin/AdminProductApprovalsScreen';
import AdminOrdersScreen from '../screens/admin/AdminOrdersScreen';
import AdminCustomersScreen from '../screens/admin/AdminCustomersScreen';
import AdminReturnRequestsScreen from '../screens/admin/AdminReturnRequestsScreen';
import AdminArtisanManagementScreen from '../screens/admin/AdminArtisanManagementScreen';
import AdminCategoryManagementScreen from '../screens/admin/AdminCategoryManagementScreen';
import AdminDeliveryAgentManagementScreen from '../screens/admin/AdminDeliveryAgentManagementScreen';
import AdminBannerManagementScreen from '../screens/admin/AdminBannerManagementScreen';
import AdminCommissionSettingsScreen from '../screens/admin/AdminCommissionSettingsScreen';
import AdminPayoutManagementScreen from '../screens/admin/AdminPayoutManagementScreen';
import AdminEmailCampaignsScreen from '../screens/admin/AdminEmailCampaignsScreen';
import AdminFraudDetectionScreen from '../screens/admin/AdminFraudDetectionScreen';
import AdminDisputeResolutionScreen from '../screens/admin/AdminDisputeResolutionScreen';
import AdminModerationScreen from '../screens/admin/AdminModerationScreen';
import AdminLiveFleetScreen from '../screens/admin/AdminLiveFleetScreen';
import AdminPlatformRevenueScreen from '../screens/admin/AdminPlatformRevenueScreen';
import AdminSuspiciousActivityScreen from '../screens/admin/AdminSuspiciousActivityScreen';
import AdminAnalyticsScreen from '../screens/admin/AdminAnalyticsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Search') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'Cart') iconName = focused ? 'cart' : 'cart-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors['forest-green'],
        tabBarInactiveTintColor: colors.outline,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{ tabBarBadge: cartCount > 0 ? cartCount : null }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Welcome" component={WelcomeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
    <Stack.Screen name="DeliveryLogin" component={DeliveryLoginScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loading = useAuthStore((state) => state.loading);

  return (
    <NavigationContainer>
      {isAuthenticated && !loading ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen name="CategoryGrid" component={CategoryGridScreen} />
          <Stack.Screen name="CategoryListing" component={CategoryListingScreen} />
          <Stack.Screen name="Subcategories" component={SubcategoriesScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="PaymentMethodSelection" component={PaymentMethodSelectionScreen} />
          <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
          <Stack.Screen name="Tracking" component={TrackingScreen} />
          <Stack.Screen name="Orders" component={OrdersScreen} />
          <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
          <Stack.Screen name="ImageSearchUpload" component={ImageSearchUploadScreen} />
          <Stack.Screen name="VoiceSearch" component={VoiceSearchScreen} options={{ presentation: 'transparentModal' }} />
          <Stack.Screen name="ProductImageGallery" component={ProductImageGalleryScreen} options={{ presentation: 'transparentModal', headerShown: false }} />
          <Stack.Screen name="ProductVariantSelection" component={ProductVariantSelectionModal} options={{ presentation: 'transparentModal', headerShown: false }} />
          <Stack.Screen name="RatingsReviews" component={RatingsReviewsScreen} />
          <Stack.Screen name="ProductQA" component={ProductQAScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="ManageAddresses" component={ManageAddressesScreen} />
          <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
          <Stack.Screen name="Wishlist" component={WishlistScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="LanguageSettings" component={LanguageSettingsScreen} />
          <Stack.Screen name="SecuritySettings" component={SecuritySettingsScreen} />
          <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
          <Stack.Screen name="OrderSuccessConfirmation" component={OrderSuccessConfirmationScreen} />
          
          {/* Permissions & KYC */}
          <Stack.Screen name="LocationPermission" component={LocationPermissionScreen} options={{ presentation: 'modal' }} />
          <Stack.Screen name="NotificationPermission" component={NotificationPermissionScreen} options={{ presentation: 'modal' }} />
          <Stack.Screen name="KYC" component={KYCScreen} />
          <Stack.Screen name="KYCVerification" component={KYCVerificationScreen} />
          <Stack.Screen name="ReturnRequest" component={ReturnRequestScreen} />
          <Stack.Screen name="RefundStatus" component={RefundStatusScreen} />
          <Stack.Screen name="Filters" component={FiltersScreen} options={{ presentation: 'modal' }} />
          <Stack.Screen name="SortOptions" component={SortOptionsModal} options={{ presentation: 'modal' }} />
          
          {/* Phase 2 Screens */}
          <Stack.Screen name="DealsOffers" component={DealsOffersScreen} />
          <Stack.Screen name="FlashSale" component={FlashSaleScreen} />
          <Stack.Screen name="TrendingProducts" component={TrendingProductsScreen} />
          <Stack.Screen name="RecentlyViewed" component={RecentlyViewedScreen} />
          <Stack.Screen name="PersonalizedRecommendations" component={PersonalizedRecommendationsScreen} />
          <Stack.Screen name="BrandListing" component={BrandListingScreen} />
          <Stack.Screen name="AuthenticCraft" component={AuthenticCraftScreen} />

          {/* Phase 3 Screens */}
          <Stack.Screen name="CouponSelection" component={CouponSelectionScreen} options={{ presentation: 'modal' }} />
          <Stack.Screen name="AddNewAddress" component={AddNewAddressScreen} />
          <Stack.Screen name="AddressSelection" component={AddressSelectionScreen} />
          <Stack.Screen name="BankAccounts" component={BankAccountsScreen} />
          <Stack.Screen name="Wallet" component={WalletScreen} />

          {/* Phase 4 Screens */}
          <Stack.Screen name="OrderTimeline" component={OrderTimelineScreen} />
          <Stack.Screen name="CancelOrder" component={CancelOrderScreen} />
          <Stack.Screen name="ReportIssue" component={ReportIssueScreen} />
          <Stack.Screen name="BackInStockAlerts" component={BackInStockAlertsScreen} />
          <Stack.Screen name="PriceDropAlerts" component={PriceDropAlertsScreen} />
          <Stack.Screen name="HelpCenterScreen" component={HelpCenterScreen} />
          <Stack.Screen name="MySupportRequestsScreen" component={MySupportRequestsScreen} />

          {/* Delivery Agent Flow */}
          <Stack.Screen name="DeliveryHome" component={DeliveryHomeScreen} />
          <Stack.Screen name="AssignedDeliveriesList" component={AssignedDeliveriesListScreen} />
          <Stack.Screen name="DeliveryDetail" component={DeliveryDetailScreen} />
          <Stack.Screen name="DeliveryLiveMap" component={DeliveryLiveMapScreen} />
          <Stack.Screen name="OTPDeliveryVerification" component={OTPDeliveryVerificationScreen} />
          <Stack.Screen name="ProofOfDeliveryUpload" component={ProofOfDeliveryUploadScreen} />
          <Stack.Screen name="DeliverySuccess" component={DeliverySuccessScreen} />

          {/* Seller Flow */}
          <Stack.Screen name="SellerDashboard" component={SellerDashboardScreen} />
          <Stack.Screen name="SellerEarningsPayout" component={SellerEarningsPayoutScreen} />
          <Stack.Screen name="InventoryManagement" component={InventoryManagementScreen} />
          <Stack.Screen name="AddEditProduct" component={AddEditProductScreen} />
          <Stack.Screen name="OrderFulfillment" component={OrderFulfillmentScreen} />
              <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ title: 'ForgotPassword' }} />
      <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={{ title: 'ResetPassword' }} />
      <Stack.Screen name="SupportRequestDetailScreen" component={SupportRequestDetailScreen} options={{ title: 'SupportRequestDetail' }} />
      <Stack.Screen name="SalesAnalyticsScreen" component={SalesAnalyticsScreen} options={{ title: 'SalesAnalytics' }} />
      <Stack.Screen name="TransactionHistoryScreen" component={TransactionHistoryScreen} options={{ title: 'TransactionHistory' }} />
      <Stack.Screen name="PackagingQCScreen" component={PackagingQCScreen} options={{ title: 'PackagingQC' }} />
      <Stack.Screen name="ShippingLabelPreviewScreen" component={ShippingLabelPreviewScreen} options={{ title: 'ShippingLabelPreview' }} />
      <Stack.Screen name="RouteOptimizationScreen" component={RouteOptimizationScreen} options={{ title: 'RouteOptimization' }} />
      <Stack.Screen name="TaxReportsScreen" component={TaxReportsScreen} options={{ title: 'TaxReports' }} />
      <Stack.Screen name="AdminDashboardScreen" component={AdminDashboardScreen} options={{ title: 'AdminDashboard' }} />
      <Stack.Screen name="AdminProductApprovalsScreen" component={AdminProductApprovalsScreen} options={{ title: 'AdminProductApprovals' }} />
      <Stack.Screen name="AdminOrdersScreen" component={AdminOrdersScreen} options={{ title: 'AdminOrders' }} />
      <Stack.Screen name="AdminCustomersScreen" component={AdminCustomersScreen} options={{ title: 'AdminCustomers' }} />
      <Stack.Screen name="AdminReturnRequestsScreen" component={AdminReturnRequestsScreen} options={{ title: 'AdminReturnRequests' }} />
      <Stack.Screen name="AdminArtisanManagementScreen" component={AdminArtisanManagementScreen} options={{ title: 'AdminArtisanManagement' }} />
      <Stack.Screen name="AdminCategoryManagementScreen" component={AdminCategoryManagementScreen} options={{ title: 'AdminCategoryManagement' }} />
      <Stack.Screen name="AdminDeliveryAgentManagementScreen" component={AdminDeliveryAgentManagementScreen} options={{ title: 'AdminDeliveryAgentManagement' }} />
      <Stack.Screen name="AdminBannerManagementScreen" component={AdminBannerManagementScreen} options={{ title: 'AdminBannerManagement' }} />
      <Stack.Screen name="AdminCommissionSettingsScreen" component={AdminCommissionSettingsScreen} options={{ title: 'AdminCommissionSettings' }} />
      <Stack.Screen name="AdminPayoutManagementScreen" component={AdminPayoutManagementScreen} options={{ title: 'AdminPayoutManagement' }} />
      <Stack.Screen name="AdminEmailCampaignsScreen" component={AdminEmailCampaignsScreen} options={{ title: 'AdminEmailCampaigns' }} />
      <Stack.Screen name="AdminFraudDetectionScreen" component={AdminFraudDetectionScreen} options={{ title: 'AdminFraudDetection' }} />
      <Stack.Screen name="AdminDisputeResolutionScreen" component={AdminDisputeResolutionScreen} options={{ title: 'AdminDisputeResolution' }} />
      <Stack.Screen name="AdminModerationScreen" component={AdminModerationScreen} options={{ title: 'AdminModeration' }} />
      <Stack.Screen name="AdminLiveFleetScreen" component={AdminLiveFleetScreen} options={{ title: 'AdminLiveFleet' }} />
      <Stack.Screen name="AdminPlatformRevenueScreen" component={AdminPlatformRevenueScreen} options={{ title: 'AdminPlatformRevenue' }} />
      <Stack.Screen name="AdminSuspiciousActivityScreen" component={AdminSuspiciousActivityScreen} options={{ title: 'AdminSuspiciousActivity' }} />
      <Stack.Screen name="AdminAnalyticsScreen" component={AdminAnalyticsScreen} options={{ title: 'AdminAnalytics' }} />
    </Stack.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
