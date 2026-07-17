import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';
import { colors } from '../theme/theme';

// Screens
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import PaymentMethodSelectionScreen from '../screens/PaymentMethodSelectionScreen';
import OrderSummaryScreen from '../screens/OrderSummaryScreen';
import TrackingScreen from '../screens/TrackingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import OrdersScreen from '../screens/OrdersScreen';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';
import CategoryGridScreen from '../screens/CategoryGridScreen';
import CategoryListingScreen from '../screens/CategoryListingScreen';
import SubcategoriesScreen from '../screens/SubcategoriesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import SortOptionsModal from '../screens/SortOptionsModal';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import ImageSearchUploadScreen from '../screens/ImageSearchUploadScreen';
import VoiceSearchScreen from '../screens/VoiceSearchScreen';
import ProductImageGalleryScreen from '../screens/ProductImageGalleryScreen';
import ProductVariantSelectionModal from '../screens/ProductVariantSelectionModal';
import RatingsReviewsScreen from '../screens/RatingsReviewsScreen';
import ProductQAScreen from '../screens/ProductQAScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ManageAddressesScreen from '../screens/ManageAddressesScreen';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen';
import WishlistScreen from '../screens/WishlistScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LanguageSettingsScreen from '../screens/LanguageSettingsScreen';
import SecuritySettingsScreen from '../screens/SecuritySettingsScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import OrderSuccessConfirmationScreen from '../screens/OrderSuccessConfirmationScreen';
import ReturnRequestScreen from '../screens/ReturnRequestScreen';
import RefundStatusScreen from '../screens/RefundStatusScreen';
import DeliveryLoginScreen from '../screens/DeliveryLoginScreen';
import DeliveryHomeScreen from '../screens/DeliveryHomeScreen';
import AssignedDeliveriesListScreen from '../screens/AssignedDeliveriesListScreen';
import DeliveryDetailScreen from '../screens/DeliveryDetailScreen';
import DeliveryLiveMapScreen from '../screens/DeliveryLiveMapScreen';
import OTPDeliveryVerificationScreen from '../screens/OTPDeliveryVerificationScreen';
import ProofOfDeliveryUploadScreen from '../screens/ProofOfDeliveryUploadScreen';
import DeliverySuccessScreen from '../screens/DeliverySuccessScreen';

// Phase 4 Screens
import OrderTimelineScreen from '../screens/OrderTimelineScreen';
import CancelOrderScreen from '../screens/CancelOrderScreen';
import ReportIssueScreen from '../screens/ReportIssueScreen';
import BackInStockAlertsScreen from '../screens/BackInStockAlertsScreen';
import PriceDropAlertsScreen from '../screens/PriceDropAlertsScreen';

// Seller Flow
import SellerDashboardScreen from '../screens/SellerDashboardScreen';
import SellerEarningsPayoutScreen from '../screens/SellerEarningsPayoutScreen';
import InventoryManagementScreen from '../screens/InventoryManagementScreen';
import AddEditProductScreen from '../screens/AddEditProductScreen';
import OrderFulfillmentScreen from '../screens/OrderFulfillmentScreen';

// Phase 1 Onboarding & Permissions
import KYCScreen from '../screens/KYCScreen';
import KYCVerificationScreen from '../screens/KYCVerificationScreen';
import LocationPermissionScreen from '../screens/LocationPermissionScreen';
import NotificationPermissionScreen from '../screens/NotificationPermissionScreen';

// Phase 2 Screens
import DealsOffersScreen from '../screens/DealsOffersScreen';
import FlashSaleScreen from '../screens/FlashSaleScreen';
import TrendingProductsScreen from '../screens/TrendingProductsScreen';
import RecentlyViewedScreen from '../screens/RecentlyViewedScreen';
import PersonalizedRecommendationsScreen from '../screens/PersonalizedRecommendationsScreen';
import BrandListingScreen from '../screens/BrandListingScreen';
import AuthenticCraftScreen from '../screens/AuthenticCraftScreen';

// Phase 3 Screens
import CouponSelectionScreen from '../screens/CouponSelectionScreen';
import AddNewAddressScreen from '../screens/AddNewAddressScreen';
import AddressSelectionScreen from '../screens/AddressSelectionScreen';
import BankAccountsScreen from '../screens/BankAccountsScreen';
import WalletScreen from '../screens/WalletScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import SupportRequestDetailScreen from '../screens/SupportRequestDetailScreen';
import SalesAnalyticsScreen from '../screens/SalesAnalyticsScreen';
import TransactionHistoryScreen from '../screens/TransactionHistoryScreen';
import PackagingQCScreen from '../screens/PackagingQCScreen';
import ShippingLabelPreviewScreen from '../screens/ShippingLabelPreviewScreen';
import RouteOptimizationScreen from '../screens/RouteOptimizationScreen';
import TaxReportsScreen from '../screens/TaxReportsScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import AdminProductApprovalsScreen from '../screens/AdminProductApprovalsScreen';
import AdminOrdersScreen from '../screens/AdminOrdersScreen';
import AdminCustomersScreen from '../screens/AdminCustomersScreen';
import AdminReturnRequestsScreen from '../screens/AdminReturnRequestsScreen';
import AdminArtisanManagementScreen from '../screens/AdminArtisanManagementScreen';
import AdminCategoryManagementScreen from '../screens/AdminCategoryManagementScreen';
import AdminDeliveryAgentManagementScreen from '../screens/AdminDeliveryAgentManagementScreen';
import AdminBannerManagementScreen from '../screens/AdminBannerManagementScreen';
import AdminCommissionSettingsScreen from '../screens/AdminCommissionSettingsScreen';
import AdminPayoutManagementScreen from '../screens/AdminPayoutManagementScreen';
import AdminEmailCampaignsScreen from '../screens/AdminEmailCampaignsScreen';
import AdminFraudDetectionScreen from '../screens/AdminFraudDetectionScreen';
import AdminDisputeResolutionScreen from '../screens/AdminDisputeResolutionScreen';
import AdminModerationScreen from '../screens/AdminModerationScreen';
import AdminLiveFleetScreen from '../screens/AdminLiveFleetScreen';
import AdminPlatformRevenueScreen from '../screens/AdminPlatformRevenueScreen';
import AdminSuspiciousActivityScreen from '../screens/AdminSuspiciousActivityScreen';
import AdminAnalyticsScreen from '../screens/AdminAnalyticsScreen';

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
