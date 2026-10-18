// Delivery onboarding, assignments, tracking, and availability.
// Aliases retain their original parameters and access rules.
import LoginScreen from '../../screens/auth/LoginScreen';
import TrackingScreen from '../../screens/delivery/TrackingScreen';
import LocationAccess from '../../components/LocationAccess';
export default [
  {
    names: ['DeliveryLogin'],
    component: LoginScreen,
  },
  {
    names: ['Tracking', 'LiveMapTracking', 'LiveMapTrackingScreen'],
    component: TrackingScreen,
  },
  {
    names: [
      'DeliveryDashboard',
      'DeliveryHome',
      'AssignedDeliveriesList',
      'OTPDeliveryVerification',
    ],
    feature: 'delivery-tasks',
    roles: ['DELIVERY', 'ADMIN'],
  },
  {
    names: [
      'DeliveryDetail',
      'DeliveryLiveMap',
      'DeliverySuccess',
      'DeliveryMap',
      'DeliveryMapScreen',
      'DeliveryStatusTimeline',
      'DeliveryStatusTimelineScreen',
      'TrackOrderScreen',
      'TrackOrderScreenScreen',
    ],
    component: TrackingScreen,
    roles: ['DELIVERY', 'ADMIN'],
  },
  {
    names: ['ProofOfDeliveryUpload'],
    feature: 'delivery-evidence',
    roles: ['DELIVERY', 'ADMIN'],
  },
  {
    names: ['RouteOptimizationScreen'],
    feature: 'delivery-routes',
    roles: ['DELIVERY', 'ADMIN'],
    options: {
      title: 'RouteOptimization',
    },
  },
  {
    names: ['AgentProfile', 'AgentProfileScreen'],
    feature: 'delivery-profile',
    roles: ['DELIVERY', 'ADMIN'],
  },
  {
    names: ['ContactDeliveryAgent', 'ContactDeliveryAgentScreen'],
    feature: 'delivery-chat',
    roles: null,
  },
  {
    names: ['DeliveryAgentInfo', 'DeliveryAgentInfoScreen'],
    feature: 'delivery-partner',
    roles: ['DELIVERY', 'ADMIN'],
  },
  {
    names: ['DeliveryFailedRetryScreen', 'DeliveryFailedRetryScreenScreen'],
    feature: 'delivery-exceptions',
    roles: ['DELIVERY', 'ADMIN'],
  },
  {
    names: ['OrderTimeline'],
    component: TrackingScreen,
  },
  {
    names: ['LocationPermission'],
    component: LocationAccess,
    options: {
      presentation: 'modal',
    },
  },
  {
    names: ['KYC', 'KYCVerification'],
    feature: 'delivery-kyc',
  },
  {
    names: ['NavigationScreenMapView', 'NavigationScreenMapViewScreen'],
    component: TrackingScreen,
  },
];
