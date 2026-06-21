const fs = require('fs');
const path = require('path');

const directories = [
  // Backend
  'backend/src/main/java/com/grocery/controller',
  'backend/src/main/java/com/grocery/service',
  'backend/src/main/java/com/grocery/repository',
  'backend/src/main/java/com/grocery/model',
  'backend/src/main/java/com/grocery/config',
  'backend/src/main/java/com/grocery/dto',
  'backend/src/main/resources',
  'backend/src/test/java/com/grocery',
  // Frontend
  'frontend/src/components',
  'frontend/src/pages',
  'frontend/src/services',
  'frontend/src/context',
  'frontend/src/utils',
  'frontend/public',
  // Database
  'database'
];

console.log('Creating project directories...');

directories.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✓ Created: ${dir}`);
  }
});

console.log('\n✓ Directory structure created successfully!');
console.log('\nNext steps:');
console.log('1. cd backend && mvn clean install');
console.log('2. cd frontend && npm install');
console.log('3. Create PostgreSQL database: createdb grocery_delivery');
console.log('4. Import schema: psql grocery_delivery -f database/schema.sql');
