#!/bin/bash
# Setup script for Grocery Delivery WebApp

set -e

echo "Creating project directories..."

# Backend directories
mkdir -p backend/src/main/java/com/grocery/{controller,service,repository,model,config,dto}
mkdir -p backend/src/main/resources
mkdir -p backend/src/test/java/com/grocery

# Frontend directories
mkdir -p frontend/src/{components,pages,services,context,utils}
mkdir -p frontend/public

# Database directory
mkdir -p database

echo "Directory structure created successfully!"
echo ""
echo "Next steps:"
echo "1. cd backend && mvn clean install"
echo "2. cd frontend && npm install"
echo "3. Create PostgreSQL database: createdb grocery_delivery"
echo "4. Import schema: psql grocery_delivery < database/schema.sql"
