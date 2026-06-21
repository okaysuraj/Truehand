# Setup Guide

## Prerequisites

| Tool | Version | Check |
|------|---------|-------|
| Java | 17+ | `java -version` |
| Maven | 3.6+ | `mvn -version` |
| Node.js | 18+ | `node --version` |
| npm | 8+ | `npm --version` |
| PostgreSQL | 12+ | `psql --version` |

> **Note:** Java 25 is fully supported via ByteBuddy experimental features in Maven Surefire.

---

## 1. Database Setup (PostgreSQL)

### Create the database and load the schema

```bash
createdb truehand
psql truehand < database/schema.sql
```

### Verify tables were created

```bash
psql truehand -c "\dt"
```

You should see 7 tables: `users`, `products`, `orders`, `order_items`, `deliveries`, `locations`, `reviews`.

---

## 2. Backend Configuration (Spring Boot)

Edit `backend/src/main/resources/application.properties`:

```properties
# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/truehand
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD_HERE

# JWT
jwt.secret=change_this_to_a_secure_random_string_at_least_32_chars
jwt.expiration=86400000

# Server
server.port=8080
```

### Build and run

```bash
cd backend
mvn clean install -DskipTests
mvn spring-boot:run
```

The API starts at `http://localhost:8080`.

### Run Backend Tests

```bash
mvn test
```
This will run the JUnit and Mockito tests utilizing an isolated H2 in-memory database to prevent test pollution against your local PostgreSQL instance.

---

## 3. Web Frontend Configuration (React 19 + Vite)

### Install dependencies

```bash
cd frontend
npm install
```

### Environment variables

Vite uses `VITE_` prefixed variables. Check your `frontend/.env` file:

```
VITE_API_URL=http://localhost:8080/api
VITE_WS_URL=ws://localhost:8080/ws
```

### Start the dev server

```bash
npm run dev
```

The web app opens at `http://localhost:5173`.

### Run Frontend Tests

```bash
npm run test
```
This runs the full Vitest and React Testing Library test suite in `jsdom`.

---

## 4. Mobile App Configuration (React Native + Expo)

### Install dependencies

```bash
cd truehand-mobile
npm install
```

### Environment variables

Create `truehand-mobile/.env` if you need to connect to a remote backend.
*Note: Ensure your API URL matches your computer's local IP address if running on a physical device, because `localhost` resolves to the phone itself.*

### Start the Expo bundler

```bash
npx expo start
```
Scan the QR code in the terminal with the Expo Go app on iOS/Android, or press `a`/`i` to launch an emulator.

---

## Troubleshooting

### Maven ByteBuddy Java 25 Issues
If you encounter `Failed to load ApplicationContext` during backend tests on Java 25, ensure `<argLine>-Dnet.bytebuddy.experimental=true</argLine>` is in your `maven-surefire-plugin` configuration in `pom.xml`.

### Frontend Network Errors
- Ensure backend is running on port 8080.
- Check CORS settings in `SecurityConfig.java`.
- If on mobile, replace `localhost` with your IPv4 address (e.g., `192.168.1.10:8080`).
