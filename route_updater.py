import os

with open('frontend/src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

if 'StorefrontCustomizer' not in content:
    content = content.replace(
        "import MaintenanceMode from './pages/MaintenanceMode';",
        "import MaintenanceMode from './pages/MaintenanceMode';\nimport StorefrontCustomizer from './pages/StorefrontCustomizer';\nimport SubscriptionManagement from './pages/SubscriptionManagement';"
    )
    content = content.replace(
        "<Route path=\"/admin/maintenance\" element={<MaintenanceMode />} />",
        "<Route path=\"/admin/maintenance\" element={<MaintenanceMode />} />\n        <Route path=\"/seller/storefront\" element={<StorefrontCustomizer />} />\n        <Route path=\"/seller/subscription\" element={<SubscriptionManagement />} />"
    )
    with open('frontend/src/App.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
