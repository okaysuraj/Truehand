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
