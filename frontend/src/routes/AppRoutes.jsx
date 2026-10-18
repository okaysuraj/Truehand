import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MarketplaceFeature from '../components/MarketplaceFeature';
import PrivateRoute from '../components/PrivateRoute';
import { useAuth } from '../context/AuthProvider';
import shopRoutes from './shop';
import systemRoutes from './system';
import accountRoutes from './account';
import deliveryRoutes from './delivery';
import sellerRoutes from './seller';
import adminRoutes from './admin';

const routes = [
  ...shopRoutes,
  ...systemRoutes,
  ...accountRoutes,
  ...deliveryRoutes,
  ...sellerRoutes,
  ...adminRoutes,
];

function RouteAccess({ definition, children }) {
  const { isAuthenticated, user } = useAuth();
  if (definition.access === 'signedOut' && isAuthenticated) {
    return <Navigate to={user?.role === 'SELLER' ? '/seller/dashboard' : '/profile'} replace />;
  }
  if (definition.access === 'signedIn') {
    return <PrivateRoute allowedRoles={definition.roles}>{children}</PrivateRoute>;
  }
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      {routes.flatMap((definition) => {
        const Page = definition.component;
        const element = definition.feature ? (
          <MarketplaceFeature feature={definition.feature} />
        ) : (
          <Page {...definition.props} />
        );
        return definition.paths.map((routePath) => (
          <Route
            key={routePath}
            path={routePath}
            element={<RouteAccess definition={definition}>{element}</RouteAccess>}
          />
        ));
      })}
    </Routes>
  );
}
