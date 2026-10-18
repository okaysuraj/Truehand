// App entry points, feature discovery, loading, and service status.
// Aliases retain their original parameters and access rules.
import FeatureDirectory, { FeatureRoute } from '../components/FeatureDirectory';
import ServiceStatus from '../components/ServiceStatus';
import LoadingSkeleton from '../pages/common/LoadingSkeleton';
export default [
  {
    paths: ['/features'],
    component: FeatureDirectory,
  },
  {
    paths: ['/features/:feature'],
    component: FeatureRoute,
  },
  {
    paths: ['/splash', '/welcome'],
    feature: 'welcome',
  },
  {
    paths: ['/500', '/server-error', '/offline', '/no-internet', '/maintenance'],
    component: ServiceStatus,
  },
  {
    paths: ['/skeleton', '/loading-skeleton'],
    component: LoadingSkeleton,
  },
];
