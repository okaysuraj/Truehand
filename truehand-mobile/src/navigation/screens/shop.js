// Product discovery, cart, checkout, and customer orders.
// Aliases retain their original parameters and access rules.
import { ShippingCheckout, OrderReview, PaymentSelection } from '../../components/CheckoutFlow';
import ProductDetailScreen from '../../screens/shop/ProductDetailScreen';
import ImageSearch from '../../components/ImageSearch';
import VoiceSearch from '../../components/VoiceSearch';
import OrderDetailScreen from '../../screens/shop/OrderDetailScreen';
import OrderSuccessConfirmationScreen from '../../screens/shop/OrderSuccessConfirmationScreen';
import AddEditProductScreen from '../../screens/shop/AddEditProductScreen';
import CartContents from '../../components/CartContents';
export default [
  {
    names: ['HelpCenter', 'HelpCenterScreen'],
    feature: 'help',
  },
  {
    names: ['AuthenticCraft'],
    feature: 'authentic-craft',
  },
  {
    names: ['AddressSelection'],
    component: ShippingCheckout,
  },
  {
    names: ['ArtisanProfile', 'ArtisanProfileScreen'],
    feature: 'artisan-profile',
  },
  {
    names: ['CategoryGrid'],
    feature: 'categories',
  },
  {
    names: [
      'CategoryListing',
      'Subcategories',
      'SearchResults',
      'PersonalizedRecommendations',
      'HomeFeed',
      'HomeFeedScreen',
      'SearchInput',
      'SearchInputScreen',
    ],
    feature: 'catalog',
  },
  {
    names: ['ProductDetail'],
    component: ProductDetailScreen,
  },
  {
    names: ['Checkout'],
    component: ShippingCheckout,
    roles: null,
  },
  {
    names: ['OrderSummary'],
    component: OrderReview,
    roles: null,
  },
  {
    names: ['Orders'],
    feature: 'orders',
    roles: null,
  },
  {
    names: ['ImageSearchUpload'],
    component: ImageSearch,
  },
  {
    names: ['VoiceSearch'],
    component: VoiceSearch,
    options: {
      presentation: 'transparentModal',
    },
  },
  {
    names: ['ProductImageGallery'],
    feature: 'gallery',
    options: {
      presentation: 'transparentModal',
      headerShown: false,
    },
  },
  {
    names: ['ProductQA'],
    feature: 'questions',
  },
  {
    names: ['OrderDetail'],
    component: OrderDetailScreen,
    roles: null,
  },
  {
    names: ['OrderSuccessConfirmation'],
    component: OrderSuccessConfirmationScreen,
    roles: null,
  },
  {
    names: ['DealsOffers', 'FlashSale'],
    feature: 'flash-sale',
  },
  {
    names: ['TrendingProducts'],
    feature: 'trending',
  },
  {
    names: ['BrandListing'],
    feature: 'artisans',
  },
  {
    names: ['CancelOrder', 'OrdersList', 'OrdersListScreen'],
    feature: 'orders',
  },
  {
    names: ['AddEditProduct'],
    component: AddEditProductScreen,
  },
  {
    names: ['EmptyCart', 'EmptyCartScreen'],
    component: CartContents,
  },
  {
    names: ['ProductImageGalleryFullscreen', 'ProductImageGalleryFullscreenScreen'],
    feature: 'gallery',
  },
  {
    names: ['Reorder', 'ReorderScreen'],
    feature: 'purchased-products',
  },
  {
    names: ['SponsoredProducts', 'SponsoredProductsScreen'],
    feature: 'sponsored-products',
  },
  {
    names: ['PaymentMethodSelection'],
    component: PaymentSelection,
    roles: null,
  },
  {
    names: ['RatingsReviews', 'ReviewsRatingsScreen', 'ReviewsRatingsScreenScreen'],
    feature: 'reviews',
  },
  {
    names: ['Filters', 'SortOptions'],
    feature: 'catalog',
    options: {
      presentation: 'modal',
    },
  },
  {
    names: ['FrequentlyAskedQuestions', 'FrequentlyAskedQuestionsScreen'],
    feature: 'faq',
  },
  {
    names: ['RequestTh7721', 'RequestTh7721Screen'],
    feature: 'commissions',
  },
  {
    names: ['SocialFeed', 'SocialFeedScreen'],
    feature: 'social-feed',
  },
  {
    names: ['SortOptionsScreen'],
    feature: 'catalog',
  },
];
