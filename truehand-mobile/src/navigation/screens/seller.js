// Seller catalog, fulfillment, storefront, and earnings workflows.
// Aliases retain their original parameters and access rules.
import SellerSignupScreen from '../../screens/seller/SellerSignupScreen';
import ProductDetailScreen from '../../screens/shop/ProductDetailScreen';
import SellerDashboardScreen from '../../screens/seller/SellerDashboardScreen';
import WalletScreen from '../../screens/user/WalletScreen';
import CatalogAssistance from '../../components/CatalogAssistance';
import ProductImport from '../../components/ProductImport';
import RequestPayoutScreen from '../../screens/common/RequestPayoutScreen';
export default [
  {
    names: ['AvailabilitySettings', 'AvailabilitySettingsScreen'],
    feature: 'seller-availability',
  },
  {
    names: ['SellerSignup', 'SellerSignupScreen'],
    component: SellerSignupScreen,
    roles: ['SELLER', 'ADMIN'],
  },
  {
    names: ['ProductVariantSelection'],
    component: ProductDetailScreen,
    roles: ['SELLER', 'ADMIN'],
    options: {
      presentation: 'transparentModal',
      headerShown: false,
    },
  },
  {
    names: ['CouponSelection'],
    feature: 'coupons',
    roles: ['SELLER', 'ADMIN'],
    options: {
      presentation: 'modal',
    },
  },
  {
    names: ['SellerDashboard'],
    component: SellerDashboardScreen,
    roles: ['SELLER', 'ADMIN'],
  },
  {
    names: ['InventoryManagement'],
    feature: 'seller-products',
    roles: ['SELLER', 'ADMIN'],
  },
  {
    names: [
      'EarningsDashboard1',
      'EarningsDashboard1Screen',
      'EarningsDashboard2',
      'EarningsDashboard2Screen',
    ],
    component: WalletScreen,
    roles: ['SELLER', 'ADMIN'],
  },
  {
    names: ['InventoryAlerts', 'InventoryAlertsScreen'],
    feature: 'inventory-alerts',
    roles: ['SELLER', 'ADMIN'],
  },
  {
    names: ['ManageCoupons', 'ManageCouponsScreen'],
    feature: 'coupons',
    roles: ['SELLER', 'ADMIN'],
  },
  {
    names: ['ManageVariants', 'ManageVariantsScreen'],
    feature: 'variants',
    roles: ['SELLER', 'ADMIN'],
  },
  {
    names: ['SellerInfoScreen', 'SellerInfoScreenScreen'],
    feature: 'seller-verification',
    roles: ['SELLER', 'ADMIN'],
  },
  {
    names: [
      'StorefrontCustomizer',
      'StorefrontCustomizerScreen',
      'StorefrontPreview',
      'StorefrontPreviewScreen',
    ],
    feature: 'seller-storefront',
    roles: ['SELLER', 'ADMIN'],
  },
  {
    names: ['OrderFulfillment', 'OrderFulfillmentDetail', 'OrderFulfillmentDetailScreen'],
    feature: 'fulfillments',
  },
  {
    names: ['IncomingOrders', 'IncomingOrdersScreen'],
    feature: 'seller-orders',
  },
  {
    names: ['SalesAnalyticsScreen'],
    feature: 'seller-analytics',
    options: {
      title: 'SalesAnalytics',
    },
  },
  {
    names: ['PackagingQCScreen'],
    feature: 'fulfillment-checks',
    options: {
      title: 'PackagingQC',
    },
  },
  {
    names: ['ShippingLabelPreviewScreen'],
    feature: 'shipping-label',
    options: {
      title: 'ShippingLabelPreview',
    },
  },
  {
    names: ['ApprovalPending', 'ApprovalPendingScreen', 'BusinessDetails', 'BusinessDetailsScreen'],
    feature: 'seller-verification',
  },
  {
    names: ['ArtisanConciergeAi', 'ArtisanConciergeAiScreen'],
    component: CatalogAssistance,
  },
  {
    names: ['AvailabilityToggleScreen', 'AvailabilityToggleScreenScreen'],
    feature: 'seller-availability',
  },
  {
    names: ['BulkImport', 'BulkImportScreen'],
    component: ProductImport,
  },
  {
    names: ['CreateDiscount', 'CreateDiscountScreen'],
    feature: 'coupons',
  },
  {
    names: ['EditListing', 'EditListingScreen'],
    feature: 'product-editor',
  },
  {
    names: [
      'NewListing',
      'NewListingScreen',
      'StockLevels',
      'StockLevelsScreen',
      'YourCatalog',
      'YourCatalogScreen',
    ],
    feature: 'seller-products',
  },
  {
    names: ['RequestPayout', 'RequestPayoutScreen'],
    component: RequestPayoutScreen,
    roles: null,
  },
  {
    names: ['SubscriptionPlans', 'SubscriptionPlansScreen'],
    feature: 'subscription-plans',
  },
  {
    names: ['WithdrawalRequest', 'WithdrawalRequestScreen'],
    component: RequestPayoutScreen,
  },
];
