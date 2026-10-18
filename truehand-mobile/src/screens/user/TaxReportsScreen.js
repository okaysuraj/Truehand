import React from 'react';
import MarketplaceFeature from '../../components/MarketplaceFeature';
import { useAuthStore } from '../../store/useAuthStore';
export default function TaxReportsScreen(props) {
  const role = useAuthStore((s) => s.user?.role);
  return (
    <MarketplaceFeature
      {...props}
      feature={
        role === 'SELLER'
          ? 'seller-tax-documents'
          : role === 'ADMIN'
            ? 'admin-tax-documents'
            : 'order-tax-documents'
      }
    />
  );
}
