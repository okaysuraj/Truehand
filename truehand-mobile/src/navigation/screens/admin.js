// Administrator management, reporting, and platform operations.
// Aliases retain their original parameters and access rules.
export default [
  {
    names: ['AdminDashboard'],
    feature: 'admin-metrics',
    roles: ['ADMIN'],
  },
  {
    names: ['AdminOrders'],
    feature: 'admin-orders',
    roles: ['ADMIN'],
  },
  {
    names: ['AdminArtisanManagement'],
    feature: 'admin-artisans',
    roles: ['ADMIN'],
  },
  {
    names: ['AdminCategoryManagement'],
    feature: 'admin-categories',
    roles: ['ADMIN'],
  },
  {
    names: ['AdminDisputeResolution'],
    feature: 'disputes',
    roles: ['ADMIN'],
  },
  {
    names: ['AdminDashboardScreen'],
    feature: 'admin-metrics',
    roles: ['ADMIN'],
    options: {
      title: 'AdminDashboard',
    },
  },
  {
    names: ['AdminProductApprovalsScreen'],
    feature: 'admin-product-approvals',
    roles: ['ADMIN'],
    options: {
      title: 'AdminProductApprovals',
    },
  },
  {
    names: ['AdminOrdersScreen'],
    feature: 'admin-orders',
    roles: ['ADMIN'],
    options: {
      title: 'AdminOrders',
    },
  },
  {
    names: ['AdminCustomersScreen'],
    feature: 'admin-users',
    roles: ['ADMIN'],
    options: {
      title: 'AdminCustomers',
    },
  },
  {
    names: ['AdminReturnRequestsScreen'],
    feature: 'admin-refunds',
    roles: ['ADMIN'],
    options: {
      title: 'AdminReturnRequests',
    },
  },
  {
    names: ['AdminArtisanManagementScreen'],
    feature: 'admin-artisans',
    roles: ['ADMIN'],
    options: {
      title: 'AdminArtisanManagement',
    },
  },
  {
    names: ['AdminCategoryManagementScreen'],
    feature: 'admin-categories',
    roles: ['ADMIN'],
    options: {
      title: 'AdminCategoryManagement',
    },
  },
  {
    names: ['AdminDeliveryAgentManagementScreen'],
    feature: 'admin-delivery',
    roles: ['ADMIN'],
    options: {
      title: 'AdminDeliveryAgentManagement',
    },
  },
  {
    names: ['AdminBannerManagementScreen'],
    feature: 'banners',
    roles: ['ADMIN'],
    options: {
      title: 'AdminBannerManagement',
    },
  },
  {
    names: ['AdminCommissionSettingsScreen'],
    feature: 'commission-rates',
    roles: ['ADMIN'],
    options: {
      title: 'AdminCommissionSettings',
    },
  },
  {
    names: ['BankVerification'],
    feature: 'bank-verifications',
    roles: ['ADMIN'],
  },
  {
    names: ['AdminPayoutManagementScreen'],
    feature: 'admin-payouts',
    roles: ['ADMIN'],
    options: {
      title: 'AdminPayoutManagement',
    },
  },
  {
    names: ['AdminEmailCampaignsScreen'],
    feature: 'campaigns',
    roles: ['ADMIN'],
    options: {
      title: 'AdminEmailCampaigns',
    },
  },
  {
    names: ['AdminFraudDetectionScreen'],
    feature: 'fraud',
    roles: ['ADMIN'],
    options: {
      title: 'AdminFraudDetection',
    },
  },
  {
    names: ['AdminDisputeResolutionScreen'],
    feature: 'disputes',
    roles: ['ADMIN'],
    options: {
      title: 'AdminDisputeResolution',
    },
  },
  {
    names: ['AdminModerationScreen'],
    feature: 'disputes',
    roles: ['ADMIN'],
    options: {
      title: 'AdminModeration',
    },
  },
  {
    names: ['AdminLiveFleetScreen'],
    feature: 'live-fleet',
    roles: ['ADMIN'],
    options: {
      title: 'AdminLiveFleet',
    },
  },
  {
    names: ['AdminPlatformRevenueScreen'],
    feature: 'revenue',
    roles: ['ADMIN'],
    options: {
      title: 'AdminPlatformRevenue',
    },
  },
  {
    names: ['AdminSuspiciousActivityScreen'],
    feature: 'fraud',
    roles: ['ADMIN'],
    options: {
      title: 'AdminSuspiciousActivity',
    },
  },
  {
    names: ['AdminAnalyticsScreen'],
    feature: 'admin-metrics',
    roles: ['ADMIN'],
    options: {
      title: 'AdminAnalytics',
    },
  },
  {
    names: ['CreateCampaign', 'CreateCampaignScreen'],
    feature: 'campaigns',
  },
  {
    names: ['RevenueOverview', 'RevenueOverviewScreen'],
    feature: 'revenue',
  },
];
