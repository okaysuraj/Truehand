// App entry points, feature discovery, loading, and service status.
// Aliases retain their original parameters and access rules.
import SplashScreen from '../../screens/common/SplashScreen';
import FeatureDirectoryScreen, { FeatureScreen } from '../../screens/common/FeatureDirectoryScreen';
import TabNavigator from '../TabNavigator';
import LoadingSkeletonScreen from '../../screens/common/LoadingSkeletonScreen';
import ServiceStatus from '../../components/ServiceStatus';
export default [
  {
    names: ['Splash'],
    component: SplashScreen,
  },
  {
    names: ['Welcome', 'WelcomeCarousel', 'WelcomeCarouselScreen'],
    feature: 'welcome',
  },
  {
    names: ['FeatureDirectory'],
    component: FeatureDirectoryScreen,
  },
  {
    names: ['Feature'],
    component: FeatureScreen,
  },
  {
    names: ['MainTabs'],
    component: TabNavigator,
  },
  {
    names: ['LoadingSkeleton', 'LoadingSkeletonScreen'],
    component: LoadingSkeletonScreen,
  },
  {
    names: [
      'MaintenanceMode',
      'MaintenanceModeScreen',
      'NoInternet',
      'NoInternetScreen',
      'ServerError',
      'ServerErrorScreen',
    ],
    component: ServiceStatus,
  },
];
