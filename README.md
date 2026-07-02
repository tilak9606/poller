# PollNode

A modern polling application with real-time analytics, built with React, Express, MongoDB, and Socket.io.

**Live Demo:** [https://poller-phi.vercel.app/](https://poller-phi.vercel.app/)

## Features

- **Create Polls** - Design polls with multiple questions and customizable options
- **Anonymous & Authenticated Voting** - Choose between anonymous responses or signed-in users only
- **Poll Expiration** - Set expiry dates for polls to automatically close them
- **Real-time Analytics** - Live updates via Socket.io when new responses are submitted
- **Publish Results** - Control when results are visible to the public
- **Responsive Design** - Modern UI with Tailwind CSS
- **Authentication** - Clerk-powered authentication system

## Tech Stack

### Backend (Server)
- **Runtime:** Node.js
- **Framework:** Express 5.x
- **Database:** MongoDB with Mongoose
- **Authentication:** Clerk Express SDK
- **Real-time:** Socket.io
- **Validation:** Zod
- **Language:** TypeScript

### Frontend (Client)
- **Framework:** React 19.x with Vite
- **Routing:** React Router 7.x
- **State Management:** React Hook Form
- **UI Components:** Radix UI, Tailwind CSS
- **Charts:** Recharts
- **Authentication:** Clerk React SDK
- **Real-time:** Socket.io Client
- **Language:** TypeScript

## Project Structure

```
poller/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── main.tsx        # App entry point with Clerk provider
│   │   ├── App.tsx         # Main app with routes
│   │   ├── modules/
│   │   │   ├── home/       # Home page & 404
│   │   │   ├── polls/      # Poll creation, listing, and response
│   │   │   └── analytics/  # Analytics dashboard
│   │   └── shared/
│   │       ├── components/ # Reusable UI components
│   │       ├── hooks/      # Custom hooks (useSocket)
│   │       └── lib/        # API client and utilities
│   ├── package.json
│   └── tsconfig.json
└── server/                # Backend API
    ├── src/
    │   ├── index.ts        # Server entry point
    │   ├── app.ts          # Express app configuration
    │   ├── modules/
    │   │   ├── auth/       # Authentication routes and models
    │   │   ├── polls/      # Poll CRUD operations
    │   │   ├── responses/  # Poll response handling
    │   │   └── analytics/  # Analytics computation
    │   └── common/
    │       ├── config/     # Environment and database config
    │       ├── socket/     # Socket.io server and handlers
    │       └── utils/      # API utilities
    ├── package.json
    └── docker-compose.yml
```

## Prerequisites

- Node.js 20+
- MongoDB (local or cloud instance)
- Clerk account for authentication keys

## Environment Setup

### Server (.env)

Copy the example file and configure:

```bash
cp server/.env.example server/.env
```

Required environment variables:

```env
CLIENT_URL=http://localhost:5173
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://user:password@localhost:27017/
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

### Client (.env)

Create `client/.env` with:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_SERVER_URL=http://localhost:3000
```

## Installation

```bash
# Clone the repository
git clone git@github.com:tilak9606/poller.git
cd poller

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

## Running the Application

### Start MongoDB (using Docker)

```bash
cd server
npm run db:up
```

### Development

Run both server and client:

```bash
# Terminal 1 - Server
cd server
npm run dev

# Terminal 2 - Client
cd client
npm run dev
```

### Production Build

```bash
# Build server
cd server
npm run build
npm start

# Build client
cd client
npm run build
```

## API Endpoints

### Authentication
- `GET /api/auth/me` - Get current authenticated user

### Polls
- `GET /api/polls` - Get all polls for authenticated user
- `GET /api/polls/:pollId` - Get poll by ID (public if published)
- `POST /api/polls` - Create a new poll
- `PATCH /api/polls/:pollId/publish` - Publish poll results

### Responses
- `POST /api/polls/:pollId/responses` - Submit poll response

### Analytics
- `GET /api/polls/:pollId/analytics` - Get poll analytics

## Socket Events

- `poll:join` - Join poll room for real-time updates
- `poll:analytics:update` - Emitted when analytics data changes
- `poll:publish` - Emitted when poll is published

## Data Models

### Poll
- `creator` - Reference to User
- `title` - Poll title
- `description` - Optional description
- `responseAccess` - "anonymous" or "authenticated"
- `expiresAt` - Expiration date/time
- `publishedAt` - Published timestamp (null if unpublished)

### Question
- `poll` - Reference to Poll
- `text` - Question text
- `options` - Array of option objects
- `isRequired` - Whether question is required
- `order` - Display order

### Response
- `poll` - Reference to Poll
- `respondent` - Reference to User (null for anonymous)
- `anonymousTokenHash` - Hash for anonymous users
- `answers` - Array of question/option selections

## Available Scripts

### Server
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run db:up` - Start MongoDB container
- `npm run db:down` - Stop MongoDB container
- `npm run db:reset` - Reset MongoDB container

### Client
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## License

ISC