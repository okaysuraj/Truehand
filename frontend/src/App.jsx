import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { CartProvider } from './context/CartProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';

// Full-screen flows provide their own navigation and page layout.
const fullScreenPaths = [
  '/splash',
  '/welcome',
  '/delivery/navigation',
  '/delivery/live-map',
  '/delivery/agent-map',
  '/admin/fleet-live',
];

function AppLayout() {
  const { pathname } = useLocation();
  const fullScreen = fullScreenPaths.some((routePath) => pathname.startsWith(routePath));
  return (
    <div className="flex flex-col min-h-screen">
      {!fullScreen && <Navbar />}
      <div className="flex-1">
        <AppRoutes />
      </div>
      {!fullScreen && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
