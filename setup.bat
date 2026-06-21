@echo off
REM Setup script for Grocery Delivery WebApp

echo Creating project directories...

REM Backend directories
if not exist "backend\src\main\java\com\grocery\controller" mkdir "backend\src\main\java\com\grocery\controller"
if not exist "backend\src\main\java\com\grocery\service" mkdir "backend\src\main\java\com\grocery\service"
if not exist "backend\src\main\java\com\grocery\repository" mkdir "backend\src\main\java\com\grocery\repository"
if not exist "backend\src\main\java\com\grocery\model" mkdir "backend\src\main\java\com\grocery\model"
if not exist "backend\src\main\java\com\grocery\config" mkdir "backend\src\main\java\com\grocery\config"
if not exist "backend\src\main\java\com\grocery\dto" mkdir "backend\src\main\java\com\grocery\dto"
if not exist "backend\src\main\resources" mkdir "backend\src\main\resources"
if not exist "backend\src\test\java\com\grocery" mkdir "backend\src\test\java\com\grocery"

REM Frontend directories
if not exist "frontend\src\components" mkdir "frontend\src\components"
if not exist "frontend\src\pages" mkdir "frontend\src\pages"
if not exist "frontend\src\services" mkdir "frontend\src\services"
if not exist "frontend\src\context" mkdir "frontend\src\context"
if not exist "frontend\src\utils" mkdir "frontend\src\utils"
if not exist "frontend\public" mkdir "frontend\public"

REM Database directory
if not exist "database" mkdir "database"

echo Directory structure created successfully!
echo.
echo Next steps:
echo 1. cd backend ^&^& mvn clean install
echo 2. cd frontend ^&^& npm install
echo 3. Create PostgreSQL database: createdb grocery_delivery
echo 4. Import schema: psql grocery_delivery -f database\schema.sql
