# Contributing

## Development Workflow

1. Ensure the backend and frontend are both running (see [docs/SETUP.md](docs/SETUP.md))
2. Make changes in a feature branch
3. Test locally before committing
4. Keep commits focused and descriptive

---

## Adding a New API Endpoint

1. **Model** — If you need a new table, create a JPA entity in `backend/src/main/java/com/grocery/model/`
2. **Repository** — Create a Spring Data interface in `repository/`
3. **DTO** — Create request/response DTOs in `dto/`
4. **Service** — Add business logic in `service/`
5. **Controller** — Expose the endpoint in `controller/`
6. **Update docs** — Add the endpoint to `docs/API.md`

---

## Adding a New Frontend Page

1. **Page component** — Create in `frontend/src/pages/NewPage.js`
2. **Route** — Add a `<Route>` in `App.js` (wrap with `<PrivateRoute>` if auth-required)
3. **Navigation** — Add a link in `components/Navbar.js`
4. **Styles** — Add page-specific CSS in `styles/` or use existing utility classes

---

## Code Style

### Java (Backend)
- Use Lombok annotations (`@Data`, `@Builder`, `@RequiredArgsConstructor`) to reduce boilerplate
- Follow the existing package structure: `model → dto → repository → service → controller`
- Use constructor injection (via `@RequiredArgsConstructor`) over field injection

### JavaScript (Frontend)
- Functional components with hooks
- Use React Context for global state (`AuthProvider`, `CartProvider`)
- Use the shared `api.js` Axios instance for all HTTP calls (handles JWT automatically)

### CSS
- Use CSS variables from `theme.css` — don't hardcode colors, spacing, or font sizes
- Use existing utility classes before writing custom CSS
- Follow mobile-first responsive design

---

## Project Commands

```bash
# Backend
cd backend
mvn clean install          # Build
mvn spring-boot:run        # Run dev server
mvn test                   # Run tests

# Frontend
cd frontend
npm install                # Install deps
npm start                  # Dev server
npm run build              # Production build
npm test                   # Run tests

# Database
# Use your Neon Cloud Postgres connection string to load schema or connect
psql "postgresql://[user]:[password]@[neon-hostname]/neondb?sslmode=require" -f database/schema.sql   # Load schema
psql "postgresql://[user]:[password]@[neon-hostname]/neondb?sslmode=require"                          # Connect
```
