// Administrator management, reporting, and platform operations.
// Aliases retain their original parameters and access rules.
import AllOrders from '../pages/admin/AllOrders';
import AdminCustomers from '../pages/admin/AdminCustomers';
import OrderTracking from '../pages/delivery/OrderTracking';
import AdminProductApprovals from '../pages/admin/AdminProductApprovals';
export default [
  {
    paths: ['/admin/bank-verifications'],
    feature: 'bank-verifications',
    access: 'signedIn',
    roles: ['ADMIN'],
  },
  {
    paths: ['/admin/payouts'],
    feature: 'admin-payouts',
    access: 'signedIn',
    roles: ['ADMIN'],
  },
  {
    paths: ['/admin/platform-revenue', '/admin/revenue-overview'],
    feature: 'revenue',
    access: 'signedIn',
    roles: ['ADMIN'],
  },
  {
    paths: ['/admin/commission-settings'],
    feature: 'commission-rates',
    access: 'signedIn',
    roles: ['ADMIN'],
  },
  {
    paths: ['/admin/gst-reports'],
    feature: 'admin-tax-documents',
    access: 'signedIn',
    roles: ['ADMIN'],
  },
  {
    paths: ['/admin/campaigns/create', '/admin/campaigns/email', '/admin/campaigns/push'],
    feature: 'campaigns',
    access: 'signedIn',
    roles: ['ADMIN'],
  },
  {
    paths: ['/admin/user/:id', '/admin/artisan-detail/:id'],
    feature: 'admin-user',
    access: 'signedIn',
    roles: ['ADMIN'],
  },
  {
    paths: ['/admin/dashboard', '/admin/analytics', '/admin/sales-analytics'],
    feature: 'admin-metrics',
    access: 'signedIn',
    roles: ['ADMIN'],
  },
  {
    paths: ['/admin/orders'],
    feature: 'admin-orders',
    access: 'signedIn',
    roles: ['ADMIN'],
  },
  {
    paths: ['/admin/all-orders'],
    component: AllOrders,
    access: 'signedIn',
    roles: ['ADMIN'],
  },
  {
    paths: ['/admin/customers'],
    component: AdminCustomers,
    access: 'signedIn',
    roles: ['ADMIN'],
  },
  {
    paths: ['/admin/artisans', '/artisan-management'],
    feature: 'admin-artisans',
    access: 'signedIn',
    roles: ['ADMIN'],
  },
  {
    paths: ['/admin/categories', '/category-management'],
    feature: 'admin-categories',
    access: 'signedIn',
    roles: ['ADMIN'],
  },
  {
    paths: ['/admin/disputes', '/admin/dispute/:id', '/dispute-resolution', '/admin/reports'],
    feature: 'disputes',
    access: 'signedIn',
    roles: ['ADMIN'],
  },
  {
    paths: ['/admin/order/:id', '/admin/order-detail/:id'],
    component: OrderTracking,
    access: 'signedIn',
    roles: ['ADMIN'],
  },
  {
    paths: ['/admin/moderation', '/admin/fraud', '/admin/fraud-detection'],
    feature: 'fraud',
    access: 'signedIn',
    roles: ['ADMIN'],
  },
  {
    paths: ['/moderation-restrictions', '/adminsuspiciousactivitylog'],
    feature: 'fraud',
  },
  {
    paths: ['/reports-queue'],
    feature: 'disputes',
  },
  {
    paths: ['/admin/banners'],
    feature: 'banners',
    access: 'signedIn',
    roles: ['ADMIN'],
  },
  {
    paths: ['/banner-management'],
    feature: 'banners',
  },
  {
    paths: ['/admin/refund-approvals'],
    feature: 'admin-refunds',
    access: 'signedIn',
    roles: ['ADMIN'],
  },
  {
    paths: ['/refund-approval'],
    feature: 'admin-refunds',
  },
  {
    paths: ['/admin/delivery-agents'],
    feature: 'admin-delivery',
    access: 'signedIn',
    roles: ['ADMIN'],
  },
  {
    paths: ['/delivery-agent-management'],
    feature: 'admin-delivery',
  },
  {
    paths: ['/admin/product-approvals'],
    component: AdminProductApprovals,
    access: 'signedIn',
    roles: ['ADMIN'],
  },
  {
    paths: ['/admin/fleet-live'],
    feature: 'live-fleet',
    access: 'signedIn',
    roles: ['ADMIN'],
  },
  {
    paths: ['/admin/delivery-assignment'],
    feature: 'delivery-queue',
    access: 'signedIn',
    roles: ['ADMIN'],
  },
  {
    paths: ['/product-review/:id', '/product-detail-review'],
    feature: 'admin-product-approvals',
  },
];
