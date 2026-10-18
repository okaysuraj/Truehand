// Delivery onboarding, assignments, tracking, and availability.
// Aliases retain their original parameters and access rules.
import OrderTracking from '../pages/delivery/OrderTracking';
import Tracking from '../pages/delivery/Tracking';
import Login from '../pages/auth/Login';
import LocationAccess from '../components/LocationAccess';
import DigitalWallet from '../pages/user/DigitalWallet';
export default [
  {
    paths: ['/track/:orderId'],
    component: OrderTracking,
    access: 'signedIn',
  },
  {
    paths: ['/tracking/:id'],
    component: Tracking,
  },
  {
    paths: ['/delivery/login'],
    component: Login,
  },
  {
    paths: ['/delivery/onboarding'],
    feature: 'delivery-kyc',
  },
  {
    paths: ['/delivery/dashboard', '/delivery/assigned'],
    feature: 'delivery-tasks',
    access: 'signedIn',
    roles: ['DELIVERY', 'DELIVERY_BOY', 'ADMIN'],
  },
  {
    paths: [
      '/delivery/details/:id',
      '/delivery/order/:id',
      '/delivery/navigation',
      '/delivery/live-map',
      '/delivery/map',
      '/delivery/agent-map',
      '/delivery/handover/:id',
      '/delivery/status-timeline/:id',
      '/delivery/status-timeline',
      '/delivery/agent-info/:id',
      '/delivery/agent-info',
    ],
    component: OrderTracking,
    access: 'signedIn',
    roles: ['DELIVERY', 'DELIVERY_BOY', 'ADMIN'],
  },
  {
    paths: ['/delivery/proof-of-delivery', '/delivery/pod/:id'],
    feature: 'delivery-evidence',
    access: 'signedIn',
    roles: ['DELIVERY', 'DELIVERY_BOY', 'ADMIN'],
  },
  {
    paths: ['/delivery/success', '/track-order'],
    component: OrderTracking,
  },
  {
    paths: ['/delivery/exception/:id', '/delivery/exception'],
    feature: 'delivery-exceptions',
    access: 'signedIn',
    roles: ['DELIVERY', 'DELIVERY_BOY', 'ADMIN'],
  },
  {
    paths: ['/delivery/profile'],
    feature: 'delivery-profile',
    access: 'signedIn',
    roles: ['DELIVERY', 'DELIVERY_BOY', 'ADMIN'],
  },
  {
    paths: ['/delivery/availability', '/delivery/availability-settings'],
    feature: 'delivery-availability',
    access: 'signedIn',
    roles: ['DELIVERY', 'DELIVERY_BOY', 'ADMIN'],
  },
  {
    paths: ['/delivery/contact/:id', '/delivery/contact'],
    feature: 'delivery-chat',
    access: 'signedIn',
  },
  {
    paths: ['/delivery/performance'],
    feature: 'delivery-performance',
    access: 'signedIn',
    roles: ['DELIVERY', 'DELIVERY_BOY', 'ADMIN'],
  },
  {
    paths: ['/location-permission', '/delivery/location-permission'],
    component: LocationAccess,
  },
  {
    paths: ['/admin/delivery-performance'],
    feature: 'delivery-performance',
    access: 'signedIn',
    roles: ['ADMIN'],
  },
  {
    paths: ['/delivery/kyc'],
    feature: 'delivery-kyc',
    access: 'signedIn',
    roles: ['DELIVERY', 'DELIVERY_BOY', 'ADMIN'],
  },
  {
    paths: ['/delivery/earnings'],
    component: DigitalWallet,
    access: 'signedIn',
    roles: ['DELIVERY', 'DELIVERY_BOY', 'ADMIN'],
  },
  {
    paths: ['/routeoptimization', '/route-optimization'],
    feature: 'delivery-routes',
    access: 'signedIn',
    roles: ['DELIVERY', 'DELIVERY_BOY', 'ADMIN'],
  },
];
