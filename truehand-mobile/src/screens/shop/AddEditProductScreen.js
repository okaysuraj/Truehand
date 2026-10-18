import React from 'react';
import MarketplaceFeature from '../../components/MarketplaceFeature';
export default function Screen(props) {
  const params = props.route?.params || {};
  return (
    <MarketplaceFeature
      {...props}
      feature={
        params.productId || params.id || params.product?.id ? 'product-editor' : 'seller-products'
      }
    />
  );
}
