// Product discovery, cart, checkout, and customer orders.
// Aliases retain their original parameters and access rules.
import ProductDetail from '../pages/shop/ProductDetail';
import CartContents from '../components/CartContents';
import OrderSuccess from '../pages/shop/OrderSuccess';
import ImageSearch from '../components/ImageSearch';
import VoiceSearch from '../components/VoiceSearch';
import EmptyWishlist from '../pages/shop/EmptyWishlist';
import OrderSummary from '../pages/shop/OrderSummary';
import CheckoutWithPayment from '../components/CheckoutWithPayment';
import OrderDetail from '../pages/shop/OrderDetail';
import OrderTracking from '../pages/delivery/OrderTracking';
export default [
  {
    paths: ['/available-rewards', '/rewards'],
    feature: 'offers',
  },
  {
    paths: ['/artisan/:id', '/artisan-profile-1'],
    feature: 'artisan-profile',
  },
  {
    paths: ['/artisan-profile-2'],
    feature: 'artisans',
  },
  {
    paths: ['/faq'],
    feature: 'faq',
  },
  {
    paths: ['/help'],
    feature: 'help',
  },
  {
    paths: [
      '/',
      '/shop',
      '/products',
      '/recommendations',
      '/for-you',
      '/category-listing',
      '/subcategories',
      '/search',
      '/search-input',
      '/filters',
      '/sort-options',
    ],
    feature: 'catalog',
  },
  {
    paths: ['/product/:id', '/select-options'],
    component: ProductDetail,
  },
  {
    paths: ['/cart', '/empty-cart'],
    component: CartContents,
  },
  {
    paths: ['/orders'],
    feature: 'orders',
    access: 'signedIn',
  },
  {
    paths: ['/flash-sale', '/deals', '/offers'],
    feature: 'flash-sale',
  },
  {
    paths: ['/order-success'],
    component: OrderSuccess,
    access: 'signedIn',
  },
  {
    paths: ['/categories'],
    feature: 'categories',
  },
  {
    paths: ['/brands'],
    feature: 'artisans',
  },
  {
    paths: ['/trending'],
    feature: 'trending',
  },
  {
    paths: ['/sponsored-products'],
    feature: 'sponsored-products',
  },
  {
    paths: ['/image-search'],
    component: ImageSearch,
  },
  {
    paths: ['/voice-search'],
    component: VoiceSearch,
  },
  {
    paths: ['/product-gallery', '/product/:id/gallery'],
    feature: 'gallery',
  },
  {
    paths: ['/product-qa', '/product/:id/qa'],
    feature: 'questions',
  },
  {
    paths: ['/empty-wishlist'],
    component: EmptyWishlist,
  },
  {
    paths: ['/order-summary'],
    component: OrderSummary,
  },
  {
    paths: ['/shipping-details'],
    component: CheckoutWithPayment,
    access: 'signedIn',
  },
  {
    paths: ['/order/:id', '/order-detail/:id'],
    component: OrderDetail,
    access: 'signedIn',
  },
  {
    paths: ['/order-timeline/:id', '/order-timeline', '/order-journey/:id'],
    component: OrderTracking,
  },
  {
    paths: ['/cancel-order/:id', '/cancel-order'],
    feature: 'orders',
  },
  {
    paths: ['/reorder/:id', '/reorder'],
    feature: 'purchased-products',
  },
  {
    paths: ['/checkout'],
    component: CheckoutWithPayment,
    access: 'signedIn',
  },
  {
    paths: ['/product/:id/reviews', '/reviews', '/ratings-reviews'],
    feature: 'reviews',
  },
  {
    paths: ['/authentic-craft', '/authenticity'],
    feature: 'authentic-craft',
  },
];
