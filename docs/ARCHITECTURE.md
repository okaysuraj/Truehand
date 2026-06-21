# Architecture

## System Overview

```
┌──────────────────────────────────────────────────┐
│              Web App (React 19 / Vite)           │
│  Pages ─── Components ─── Providers ─── Hooks    │
│              Axios HTTP Client                   │
└──────────────────┬───────────────────────────────┘
                   │
┌──────────────────┼───────────────────────────────┐
│           Mobile App (React Native)              │
│  Screens ── Components ── Navigators ── Context  │
│              Axios HTTP Client                   │
└──────────────────┬───────────────────────────────┘
                   │ HTTP / WebSocket
┌──────────────────▼───────────────────────────────┐
│            Backend (Spring Boot 3.1)             │
│  Controllers ─── Services ─── Repositories       │
│  Security (JWT) ─── WebSocket Handler            │
└──────────────────┬───────────────────────────────┘
                   │ JDBC (JPA/Hibernate)
┌──────────────────▼───────────────────────────────┐
│            Database (PostgreSQL)                 │
│  7 tables │ 10+ indexes │ Seed data              │
└──────────────────────────────────────────────────┘
```

---

## Architecture Breakdown

### 1. Spring Boot Backend
- **Entities & DTOs:** Heavy use of Lombok to eliminate boilerplate in JPA entities and data transfer objects.
- **Service Layer:** Houses the business logic. Independently unit tested with JUnit 5 and Mockito.
- **Controllers:** Exposes the REST API. WebMvc tests ensure reliable JSON serialization and API routing.
- **Real-Time Data:** Uses native Spring `TextWebSocketHandler` for delivering live location updates (e.g., delivery tracking).
- **Security:** Spring Security configured for stateless JWT session management.

### 2. Vite React Web App
- **Build System:** Migrated from Create React App (Webpack) to Vite (Rolldown) for significantly faster HMR and build speeds.
- **Routing:** Handled via React Router v6. Secure routes are protected by a `<PrivateRoute>` wrapper.
- **State:** Uses React Context (`AuthProvider`, `CartProvider`) for global application state.
- **Testing:** Uses Vitest and React Testing Library via `jsdom`. Emulates browser behavior safely in Node.

### 3. React Native Mobile App
- **Framework:** Built with Expo for rapid prototyping and simplified native module management.
- **Navigation:** Implements React Navigation (Stack Navigators) to flow between Shop, Cart, Profile, and Checkout.
- **State Sharing:** Mimics the web app's architecture with analogous `CartProvider` and `AuthProvider` Context APIs to ensure logic consistency.

### 4. Database & Testing Infrastructures
- **Production DB:** PostgreSQL 12+.
- **Test Database:** An ephemeral H2 in-memory database configured in `application-test.properties`. Spring Boot uses `create-drop` DDL to provide a fresh schema on every test run.

---

## Design System (Web CSS)

The web frontend uses a custom CSS design system defined in `frontend/src/styles/theme.css`.

### CSS Variables
```css
/* Colors */
--primary-color: #C0A080;
--primary-dark: #A08060;
--secondary-color: #E8DCC4;
--bg-color: #FDFBF7;
--text-dark: #2C2C2C;
```

### Component classes
- **Buttons:** `.btn-primary`, `.btn-secondary`, `.btn-outline`
- **Cards:** `.card`, `.card-body`
- **Layout:** `.container`, `.grid`, `.flex`

Auto-detected dark mode via `prefers-color-scheme: dark`.
