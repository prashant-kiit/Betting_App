# Betting Application NeuroSpark

A full-stack sports-betting platform where users place bets on match outcomes and admins manage matches and payouts. Built with a React frontend and a two-server Node.js/Express backend (separate admin and user servers) backed by MongoDB.

## Features

- **User side:** registration, wallet top-ups, browsing matches, viewing win prospects, and placing bets (one bet per user per match, with minimum-amount and wallet-balance checks).
- **Admin side:** creating and updating matches, opening/closing matches, resolving match results, and distributing winnings to winners (with an admin share).
- **Auth:** Auth0-based authentication with JWT-secured admin routes.

## Tech Stack

**Frontend** (`frontend/`)
- React 18, React Router, Redux Toolkit, React Query
- Auth0 React SDK, Axios
- Vite, Tailwind CSS, ESLint

**Backend** (`backend/`)
- Node.js, Express (`type: module`, ESM)
- MongoDB with Mongoose
- Auth0 JWT bearer auth (`express-oauth2-jwt-bearer`), `jsonwebtoken`, `bcrypt`
- Nodemon for local development

## Project Structure

```
backend/
  src/main/javascript/
    adminServer.js         # Admin API server entrypoint
    userServer.js          # User API server entrypoint
    database/database.js   # MongoDB connection
    middleware/             # Auth & error-handling middleware
    model/                  # Mongoose schemas (admin, user, match, bet)
    repository/              # Data-access layer
    route/                   # Express routers (admin, admin login, user)
    service/                 # Business logic (admin, user)
    validationSchema/        # Request payload validation
    ErrorHandling/            # Custom error types
frontend/
  src/
    App.jsx, Home.jsx, Dashboard.jsx, DashboardBody.jsx,
    Interface.jsx, Loader.jsx, Title.jsx
    Redux/                  # Redux store & slices
```

## Getting Started

### Prerequisites
- Node.js
- A running MongoDB instance
- An Auth0 application (for authentication)

### Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env-dev` (and `.env-prod` for production) with:

```
CLIENT_DOMAIN=
CLIENT_PORT=
ADMIN_SERVER_DOMAIN=
ADMIN_SERVER_PORT=
USER_SERVER_DOMAIN=
USER_SERVER_PORT=
MONGODB_USERNAME=
MONGODB_PASSWORD=
JWT_SECRET_KEY=
AUDIENCE=
ISSUERBASEURL=
SIGNALG=
```

Run the servers (each server is started independently):

```bash
npm run dev-admin   # starts the admin API server (dev env)
npm run dev-user    # starts the user API server (dev env)

npm run prod-admin  # starts the admin API server (prod env)
npm run prod-user   # starts the user API server (prod env)
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev          # start Vite dev server
npm run build         # production build
npm run preview        # preview production build
npm run lint            # run ESLint
```

## API Overview

### User routes
| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register a new user |
| GET | `/matches` | List all matches |
| PUT | `/addMoney` | Credit money to a user's wallet |
| GET | `/prospect` | Get potential winnings for a bet |
| POST | `/placeBet` | Place a bet on a match |

### Admin routes
| Method | Endpoint | Description |
|---|---|---|
| POST | `/createMatch` | Create a new match |
| PATCH | `/updateMatch/:matchId` | Update a match |
| GET | `/matchResult/:matchId` | Resolve match result and distribute winnings |
| PATCH | `/openMatch/:id` | Activate a match |
| PATCH | `/closeMatch/:id` | Deactivate a match |
| GET | `/matches/:matchId` | Get a single match |
| GET | `/logout` | Clear admin auth cookie |

## License

No license specified yet.
