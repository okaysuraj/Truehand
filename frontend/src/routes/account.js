// Sign-in, profile, saved records, payments, and customer support.
// Aliases retain their original parameters and access rules.
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import VerifyEmail from '../pages/auth/VerifyEmail';
import Profile from '../pages/user/Profile';
import AddAddress from '../pages/user/AddAddress';
import PaymentMethods from '../pages/user/PaymentMethods';
import PaymentMethod from '../pages/user/PaymentMethod';
import AddressSelection from '../pages/user/AddressSelection';
import DigitalWallet from '../pages/user/DigitalWallet';
import BankAccounts from '../pages/user/BankAccounts';
import AccountSettings from '../components/AccountSettings';
import EditProfile from '../pages/user/EditProfile';
import MySupportRequests from '../pages/user/MySupportRequests';
import SupportRequestDetail from '../pages/user/SupportRequestDetail';
export default [
  {
    paths: ['/login'],
    component: Login,
    access: 'signedOut',
  },
  {
    paths: ['/register'],
    component: Register,
    access: 'signedOut',
  },
  {
    paths: ['/forgot-password'],
    component: ForgotPassword,
    access: 'signedOut',
  },
  {
    paths: ['/reset-password'],
    component: ResetPassword,
    access: 'signedOut',
  },
  {
    paths: ['/verify-email', '/verify-otp'],
    component: VerifyEmail,
  },
  {
    paths: ['/delivery/verify-otp'],
    component: Login,
  },
  {
    paths: ['/profile'],
    component: Profile,
    access: 'signedIn',
  },
  {
    paths: ['/addresses'],
    feature: 'addresses',
    access: 'signedIn',
  },
  {
    paths: ['/add-address', '/add-new-address'],
    component: AddAddress,
    access: 'signedIn',
  },
  {
    paths: ['/payment-methods'],
    component: PaymentMethods,
  },
  {
    paths: ['/payment-method'],
    component: PaymentMethod,
  },
  {
    paths: ['/address-selection'],
    component: AddressSelection,
  },
  {
    paths: ['/wallet', '/digital-wallet', '/the-vault'],
    component: DigitalWallet,
  },
  {
    paths: ['/bank-accounts'],
    component: BankAccounts,
  },
  {
    paths: ['/bank-details'],
    feature: 'bank-accounts',
  },
  {
    paths: ['/settings/language'],
    component: AccountSettings,
    props: {
      section: 'region',
    },
  },
  {
    paths: ['/edit-profile'],
    component: EditProfile,
  },
  {
    paths: ['/notifications/settings'],
    component: AccountSettings,
    props: {
      section: 'notifications',
    },
  },
  {
    paths: ['/notifications'],
    feature: 'notifications',
  },
  {
    paths: ['/notifications/:id', '/notification-detail'],
    feature: 'notification-detail',
  },
  {
    paths: ['/security-settings'],
    component: AccountSettings,
    props: {
      section: 'security',
    },
  },
  {
    paths: ['/settings'],
    component: AccountSettings,
    props: {
      section: '',
    },
  },
  {
    paths: ['/support/requests', '/support-requests'],
    component: MySupportRequests,
  },
  {
    paths: ['/report-issue', '/report-an-issue'],
    feature: 'support',
  },
  {
    paths: ['/support-request/:ticketId', '/support-detail'],
    component: SupportRequestDetail,
  },
  {
    paths: ['/seller/daily-weekly-earnings'],
    feature: 'wallet-transactions',
    access: 'signedIn',
    roles: ['SELLER', 'ADMIN'],
  },
  {
    paths: ['/wishlist'],
    feature: 'wishlist',
    access: 'signedIn',
  },
  {
    paths: ['/recently-viewed'],
    feature: 'recent',
  },
  {
    paths: ['/price-drops'],
    feature: 'alerts',
  },
  {
    paths: ['/compare', '/compare-products'],
    feature: 'compare',
  },
  {
    paths: ['/wishlist/:collectionId', '/wishlist-collections/:collectionId'],
    feature: 'collection-products',
  },
  {
    paths: ['/wishlist-collections'],
    feature: 'collections',
  },
  {
    paths: ['/return-request/:orderId', '/refund-status/:orderId'],
    feature: 'refunds',
    access: 'signedIn',
  },
  {
    paths: ['/back-in-stock'],
    feature: 'alerts',
  },
  {
    paths: ['/save-for-later', '/saved-for-later'],
    feature: 'saved',
  },
  {
    paths: ['/return-requests'],
    feature: 'refunds',
  },
  {
    paths: ['/transactionhistory', '/transaction-history'],
    feature: 'wallet-transactions',
  },
];
