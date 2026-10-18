// Sign-in, profile, saved records, payments, and customer support.
// Aliases retain their original parameters and access rules.
import ResetPasswordScreen from '../../screens/auth/ResetPasswordScreen';
import RegisterScreen from '../../screens/auth/RegisterScreen';
import OTPVerificationScreen from '../../screens/auth/OTPVerificationScreen';
import LoginScreen from '../../screens/auth/LoginScreen';
import ForgotPasswordScreen from '../../screens/auth/ForgotPasswordScreen';
import EditProfileScreen from '../../screens/user/EditProfileScreen';
import AccountSettings from '../../components/AccountSettings';
import AddAddressScreen from '../../screens/user/AddAddressScreen';
import BankAccountsScreen from '../../screens/user/BankAccountsScreen';
import WalletScreen from '../../screens/user/WalletScreen';
import MySupportRequestsScreen from '../../screens/user/MySupportRequestsScreen';
import SupportRequestDetailScreen from '../../screens/user/SupportRequestDetailScreen';
import TaxReportsScreen from '../../screens/user/TaxReportsScreen';
import ProfileScreen from '../../screens/user/ProfileScreen';
import PaymentMethodsScreen from '../../screens/common/PaymentMethodsScreen';
import TransactionHistoryScreen from '../../screens/common/TransactionHistoryScreen';
export default [
  {
    names: ['ResetPassword'],
    component: ResetPasswordScreen,
  },
  {
    names: ['Register', 'SignUp', 'SignUpScreen'],
    component: RegisterScreen,
  },
  {
    names: ['OTPVerification'],
    component: OTPVerificationScreen,
  },
  {
    names: ['Login', 'LoginScreen'],
    component: LoginScreen,
  },
  {
    names: ['ForgotPassword', 'ForgotPasswordScreen'],
    component: ForgotPasswordScreen,
  },
  {
    names: ['EditProfile'],
    component: EditProfileScreen,
  },
  {
    names: ['ManageAddresses'],
    feature: 'addresses',
    roles: null,
  },
  {
    names: ['Settings'],
    component: AccountSettings,
    props: {
      section: '',
    },
  },
  {
    names: ['LanguageSettings'],
    component: AccountSettings,
    props: {
      section: 'region',
    },
  },
  {
    names: ['SecuritySettings'],
    component: AccountSettings,
    props: {
      section: 'security',
    },
  },
  {
    names: ['NotificationPermission'],
    component: AccountSettings,
    props: {
      section: 'notifications',
    },
    options: {
      presentation: 'modal',
    },
  },
  {
    names: ['AddNewAddress', 'AddAddress', 'AddAddressScreen'],
    component: AddAddressScreen,
    roles: null,
  },
  {
    names: ['BankAccounts'],
    component: BankAccountsScreen,
  },
  {
    names: ['Wallet'],
    component: WalletScreen,
  },
  {
    names: ['ReportIssue'],
    feature: 'support',
  },
  {
    names: ['MySupportRequestsScreen'],
    component: MySupportRequestsScreen,
  },
  {
    names: ['ResetPasswordScreen'],
    component: ResetPasswordScreen,
    options: {
      title: 'ResetPassword',
    },
  },
  {
    names: ['SupportRequestDetailScreen'],
    component: SupportRequestDetailScreen,
    options: {
      title: 'SupportRequestDetail',
    },
  },
  {
    names: ['TaxReportsScreen'],
    component: TaxReportsScreen,
    options: {
      title: 'TaxReports',
    },
  },
  {
    names: ['NotificationDetail', 'NotificationDetailScreen'],
    feature: 'notification-detail',
  },
  {
    names: ['NotificationsList', 'NotificationsListScreen'],
    feature: 'notifications',
  },
  {
    names: ['ProfileDashboard'],
    component: ProfileScreen,
  },
  {
    names: ['SellerEarningsPayout'],
    feature: 'wallet',
    roles: ['SELLER', 'ADMIN'],
  },
  {
    names: ['DailyWeeklyEarnings', 'DailyWeeklyEarningsScreen'],
    feature: 'wallet-transactions',
    roles: ['SELLER', 'ADMIN'],
  },
  {
    names: ['Wishlist'],
    feature: 'wishlist',
  },
  {
    names: ['RecentlyViewed'],
    feature: 'recent',
  },
  {
    names: ['PriceDropAlerts'],
    feature: 'alerts',
  },
  {
    names: ['CompareProducts', 'CompareProductsScreen'],
    feature: 'compare',
  },
  {
    names: ['WishlistCollection', 'WishlistCollectionScreen'],
    feature: 'collection-products',
  },
  {
    names: ['PaymentMethods'],
    component: PaymentMethodsScreen,
  },
  {
    names: ['ReturnRequest', 'RefundStatus', 'ReturnRequests', 'ReturnRequestsScreen'],
    feature: 'refunds',
  },
  {
    names: ['BackInStockAlerts'],
    feature: 'alerts',
  },
  {
    names: ['TransactionHistoryScreen'],
    component: TransactionHistoryScreen,
    options: {
      title: 'TransactionHistory',
    },
  },
  {
    names: ['SaveForLater', 'SaveForLaterScreen'],
    feature: 'saved',
  },
];
