# Truehand

A full-stack e-commerce application tailored for handcrafted, artisanal goods. Truehand features a responsive web frontend, a native mobile application, and a robust Spring Boot backend with real-time order tracking and secure JWT authentication.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Web Frontend** | React 19, Vite, React Router 6, Axios, Leaflet |
| **Mobile App** | React Native, Expo, React Navigation, Axios |
| **Backend API** | Spring Boot 3.1, Spring Security, JPA/Hibernate |
| **Database** | Neon Cloud Postgres (Production/Dev) / H2 (Testing) |
| **Testing** | JUnit 5, Mockito, Spring Boot Test, Vitest, React Testing Library |
| **Auth** | JWT (jjwt 0.12) with BCrypt |
| **Build/Runtime**| Maven 3.6+, Node.js 18+, npm |

## Features

- **Authentication:** Secure JWT-based registration and login.
- **Product Catalog:** Browse, search, and filter artisan products seamlessly.
- **Shopping Cart:** Persistent state management with Context API across both web and mobile.
- **Order Management:** Place orders, view history, and check statuses.
- **Full-Stack Testing Infrastructure:** Robust automated test suites covering backend business logic and frontend component rendering.
- **Cross-Platform:** Beautiful, responsive React web app combined with a seamless React Native mobile experience.

## Project Structure

```
Truehand/
├── backend/                        # Spring Boot REST API
│   ├── pom.xml
│   └── src/main/java/com/truehand/
│       ├── model/                  # JPA entities
│       ├── dto/                    # Request/response DTOs
│       ├── repository/             # Spring Data repositories
│       ├── service/                # Business logic & Unit tests
│       ├── controller/             # REST endpoints & WebMvc tests
│       └── config/                 # Security & CORS configuration
│
├── frontend/                       # React 19 SPA powered by Vite
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── pages/                  # Web Views (Home, Checkout, Tracking)
│       ├── components/             # Reusable UI components
│       └── services/               # Context Providers & Axios setup
│
└── truehand-mobile/                # React Native Expo App
    ├── package.json
    ├── app.json
    └── src/
        ├── screens/                # Mobile Screens (Home, Cart, Profile)
        ├── navigation/             # Stack Navigators
        └── components/             # Mobile-specific UI elements
```

## Quick Start

> **Prerequisites:** Java 17+, Node.js 18+, Neon Cloud PostgreSQL database, Maven 3.6+

### 1. Database Setup
1. Create a PostgreSQL project on [Neon Cloud](https://neon.tech/).
2. Copy your connection details and set them in a `backend/.env` file (see `backend/.env.example`).
3. Load the schema into your Neon database:
   ```bash
   psql "postgresql://[user]:[password]@[neon-hostname]/neondb?sslmode=require" -f database/schema.sql
   ```

### 2. Backend (Spring Boot)
Ensure your database credentials are set as environment variables (`DATABASE_URL`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`) or configured in the environment, then start the backend server (runs on `http://localhost:8080`):
```bash
cd backend
mvn spring-boot:run
```

### 3. Web Frontend (Vite)
Open a second terminal and start the web app (runs on `http://localhost:5173`):
```bash
cd frontend
npm install
npm run dev
```

### 4. Mobile App (Expo)
Open a third terminal and start the Metro bundler:
```bash
cd truehand-mobile
npm install
npx expo start
```
Scan the QR code with the Expo Go app on your physical device, or press `a` or `i` to open in an Android/iOS emulator.

## Testing

Truehand includes comprehensive automated testing suites.

**Run Backend Tests (JUnit + Mockito):**
```bash
cd backend
mvn test
```

**Run Frontend Tests (Vitest + React Testing Library):**
```bash
cd frontend
npm run test
```

## License
MIT

---

# TrueHand Comprehensive System Audit & Deployment Guide

This document provides a final architectural audit of the TrueHand platform across the **Spring Boot Backend**, **React Web App**, and **React Native Mobile App**. It also includes a detailed checklist of configurations and API keys required for production deployment.

## 1. Feature Implementation Audit

I have reviewed the original requirements against the current codebase. The vast majority of the core E-Commerce loop is fully implemented and functioning. Below is the detailed breakdown:

### Fully Implemented Core Features ✅
* **Onboarding & Authentication:** Firebase Email/Password Auth is fully wired across Backend, Web, and Mobile. JWT tokens are verified server-side. Role-based access control (CUSTOMER, SELLER, DELIVERY, ADMIN) is strictly enforced via Spring Security.
* **Home & Discovery:** Trending products, "You Might Also Like" smart AI recommendations, and category browsing are implemented on both Web and Mobile.
* **Product Search & Filters:** Advanced `ProductSpecification` filtering (Search, Category, Price Range, Ratings) is live via the backend `/api/products/filter` endpoint.
* **Product Detail Page (PDP):** Images, prices, stock availability, seller info, and a robust Customer Review/Rating system are fully functional on Web and Mobile.
* **Checkout & Payment:** Cart management, Promo Code validation engine, and Order instantiation are complete. 
* **Seller App:** Seller Dashboard and KYC approval workflow are functional. Sellers can manage inventory and track their store's orders.
* **Logistics & Admin:** Admin platform metrics, Delivery Partner KYC, and real-time GPS tracking (via WebSockets/Simulated endpoints) are fully implemented.

### Stubbed / Partially Implemented Features ⚠️
* **Payment Gateway:** The frontend currently uses a Stripe "Stub" that instantly marks orders as paid. The backend has a `PaymentService.java` that generates actual Stripe `PaymentIntents`, but the frontend needs the `@stripe/react-stripe-js` Element wired to process real cards.
* **Media Uploads:** Images currently default to `https://picsum.photos` placeholders. You will need to wire a Cloudinary or AWS S3 bucket to handle actual image uploads from Sellers.
* **Multi-address Management:** Currently, checkout uses a single text-area for the address. A true multi-address book is not built.

### Missing / Non-Essential Features ❌
* **Voice Search & Image-based Search:** Not implemented. Search is text/filter-based.
* **Wishlist & Compare Products:** The UI has placeholders, but there are no backend entities to save wishlists.
* **Q&A Section:** Not implemented on the PDP.

---

## 2. Deployment & Configuration Checklist

To take this project from a local development environment to a **fully functional, production-deployable state**, you must configure the following external services and API keys.

### A. Firebase Authentication (Identity Provider)
You must create a Firebase Project to handle user identities.
* **Backend:** Generate a new Private Key from Firebase Console (Project Settings > Service Accounts) and save it as `serviceAccountKey.json` in `backend/src/main/resources/`.
* **Web App:** Add your Firebase web config to `frontend/.env`:
  ```env
  REACT_APP_FIREBASE_API_KEY="your-api-key"
  REACT_APP_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
  REACT_APP_FIREBASE_PROJECT_ID="your-project-id"
  ```
* **Mobile App:** Add the same config to `truehand-mobile/.env` (using the `EXPO_PUBLIC_` prefix).

### B. PostgreSQL (Database)
The backend is configured for PostgreSQL in `application.properties`. For production (e.g., AWS RDS, Heroku Postgres, Supabase), inject these environment variables:
* `DATABASE_URL` (e.g., `jdbc:postgresql://<host>:5432/truehand`)
* `DATABASE_USERNAME`
* `DATABASE_PASSWORD`

### C. Stripe (Payments)
To process real credit cards, you need a Stripe Developer account.
* **Backend:** Add your Secret Key to the backend environment variables:
  * `STRIPE_SECRET_KEY=sk_test_...`
* **Web/Mobile App:** Provide your Publishable Key to the frontend environments:
  * `REACT_APP_STRIPE_PUBLIC_KEY=pk_test_...`

### D. Google Maps API (Logistics Tracking)
For the mobile app's `TrackingScreen.js` to render maps properly in production standalone builds (APK/IPA):
* Obtain a **Google Maps API Key** from the Google Cloud Console.
* Add it to `truehand-mobile/app.json` under `android.config.googleMaps.apiKey` and `ios.config.googleMapsApiKey`.

### E. Security & Networking
* **Backend JWT Secret:** Set a secure, random 32+ character string as `JWT_SECRET` for the backend environment.
* **CORS Config:** Update `CORS_ALLOWED_ORIGINS` in the backend to point to your deployed frontend domain (e.g., `https://www.truehand.com`) to prevent cross-origin blocking.
* **SMTP Config:** If you want the backend to send real emails (e.g., for KYC approvals), configure the `MAIL_HOST`, `MAIL_USERNAME`, and `MAIL_PASSWORD` variables in the backend.
