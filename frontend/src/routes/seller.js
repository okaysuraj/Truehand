// Seller catalog, fulfillment, storefront, and earnings workflows.
// Aliases retain their original parameters and access rules.
import SellerDashboard from '../pages/seller/SellerDashboard';
import DigitalWallet from '../pages/user/DigitalWallet';
import SellerSignup from '../pages/seller/SellerSignup';
import CatalogAssistance from '../components/CatalogAssistance';
import ProductImport from '../components/ProductImport';
import RequestPayout from '../pages/common/RequestPayout';
export default [
  {
    paths: ['/seller/dashboard'],
    component: SellerDashboard,
    access: 'signedIn',
    roles: ['SELLER', 'ADMIN'],
  },
  {
    paths: ['/seller/kyc'],
    feature: 'seller-verification',
    access: 'signedIn',
    roles: ['SELLER', 'ADMIN'],
  },
  {
    paths: ['/seller/earnings'],
    component: DigitalWallet,
    access: 'signedIn',
    roles: ['SELLER', 'ADMIN'],
  },
  {
    paths: [
      '/seller/inventory',
      '/seller/stock-levels',
      '/stock-levels',
      '/seller/storefront',
      '/storefront-preview',
      '/storefront/:id',
      '/seller/new-listing',
      '/new-listing',
    ],
    feature: 'seller-products',
    access: 'signedIn',
    roles: ['SELLER', 'ADMIN'],
  },
  {
    paths: ['/seller/orders', '/incoming-orders'],
    feature: 'seller-orders',
    access: 'signedIn',
    roles: ['SELLER', 'ADMIN'],
  },
  {
    paths: ['/order-fulfillment-detail', '/order-fulfillment/:id'],
    feature: 'fulfillments',
    access: 'signedIn',
    roles: ['SELLER', 'ADMIN'],
  },
  {
    paths: ['/shipping-label-preview', '/shipping-label/:id'],
    feature: 'shipping-label',
    access: 'signedIn',
    roles: ['SELLER', 'ADMIN'],
  },
  {
    paths: ['/packaging-qc', '/packaging-qc/:id'],
    feature: 'fulfillment-checks',
    access: 'signedIn',
    roles: ['SELLER', 'ADMIN'],
  },
  {
    paths: ['/seller/signup'],
    component: SellerSignup,
  },
  {
    paths: ['/seller/approval-pending', '/approval-pending'],
    feature: 'seller-verification',
  },
  {
    paths: ['/artisan-concierge', '/concierge'],
    component: CatalogAssistance,
    access: 'signedIn',
    roles: ['SELLER', 'ADMIN'],
  },
  {
    paths: ['/create-discount', '/manage-coupons'],
    feature: 'coupons',
    access: 'signedIn',
    roles: ['SELLER', 'ADMIN'],
  },
  {
    paths: ['/bulk-import', '/seller/bulk-import'],
    component: ProductImport,
    access: 'signedIn',
    roles: ['SELLER', 'ADMIN'],
  },
  {
    paths: ['/managevariants', '/seller/variants'],
    feature: 'variants',
    access: 'signedIn',
    roles: ['SELLER', 'ADMIN'],
  },
  {
    paths: ['/seller/request-payout', '/seller/withdraw'],
    component: RequestPayout,
    access: 'signedIn',
    roles: ['SELLER', 'ADMIN'],
  },
  {
    paths: ['/request-payout'],
    component: RequestPayout,
    access: 'signedIn',
  },
  {
    paths: ['/seller/tax-reports'],
    feature: 'seller-tax-documents',
    access: 'signedIn',
    roles: ['SELLER', 'ADMIN'],
  },
  {
    paths: ['/seller/inventory-alerts'],
    feature: 'inventory-alerts',
    access: 'signedIn',
    roles: ['SELLER', 'ADMIN'],
  },
  {
    paths: ['/studio-details', '/seller/studio-details'],
    feature: 'seller-studio',
  },
  {
    paths: ['/admin/studio-details'],
    feature: 'seller-studio',
    access: 'signedIn',
    roles: ['ADMIN'],
  },
  {
    paths: ['/seller/analytics'],
    feature: 'seller-analytics',
  },
];
