# Movie DB App

A modern, high-performance web application for browsing, searching, and managing your favorite movies, built with Vite, React, and TypeScript. Integrates with TheMovieDatabase (TMDB) API for real-time film data and supports third-party TMDB login.

## Live Demo

[https://movie-db-app-five.vercel.app/](https://movie-db-app-five.vercel.app/)

---

## Technologies Used

- **React** (with hooks and functional components)
- **TypeScript** (type safety and maintainability)
- **Vite** (fast build and dev server)
- **SCSS** (modular, maintainable styles)
- **React Router** (client-side routing)
- **Zustand** (state management)
- **Axios** (API requests)
- **Jest & React Testing Library** (unit and integration testing)
- **Express** (SSR server)
- **Docker** (containerization and deployment)

---

## Lighthouse Results

| Category       | Score |
| -------------- | ----- |
| Performance    | 99    |
| Accessibility  | 100   |
| Best Practices | 100   |
| SEO            | 99    |

These scores reflect a highly optimized, accessible, and SEO-friendly web application.

---

## Features

- Browse movies by category (Popular, Top Rated, Upcoming)
- View detailed information and cast for each film
- Add/remove movies to your personal wish list (requires TMDB login)
- Secure third-party authentication via TMDB
- Responsive, accessible, and fast UI
- Skeleton loading states and error handling
- SEO-optimized with dynamic titles and meta descriptions

---

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/your-username/movie-db-app.git
cd movie-db-app
```

### 2. Install dependencies

```sh
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory with the following:

```
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_TMDB_ACCESS_TOKEN=your_tmdb_access_token
```

- Get your API key and access token from [TMDB](https://www.themoviedb.org/settings/api).

### 4. Start the development server

```sh
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build and preview production

```sh
npm run build
npm run preview
```

### 6. Docker

Build and run with Docker:

```sh
docker compose up --build
```

---

## Project Structure

```
src/
  components/         // Reusable UI components (compound, HOC, presentational)
  hooks/              // Custom React hooks for data fetching and logic
  pages/              // Top-level page components (Home, FilmDetail, Login, WishList)
  services/           // API and TMDB service logic
  store/              // State management (auth, wishlist)
  usecases/           // Business logic, orchestrating services and state
  schemas/            // Data validation schemas
  types/              // TypeScript type definitions
  styles/             // SCSS variables and global styles
  assets/             // Static assets (images, icons)
  __tests__/          // Unit and integration tests
public/
  robots.txt          // SEO robots file
  ...                 // Static files
```

---

## Design Principles

## Code Quality & Architecture

### Single Responsibility Principle (SRP)

Every component, hook, and function in this project is designed to do one thing and do it well. UI components only handle rendering, hooks only handle data fetching or state logic, and usecases only orchestrate business logic. This makes the codebase easier to test, debug, and extend.

### Compound Components

Reusable UI patterns are built using the compound component pattern. For example, the `CategoryCarousel` and `FilmBox` components are composed of smaller, focused subcomponents. This allows for flexible composition and customization, letting parent components control layout and children while keeping each piece simple and reusable.

### Presentation and Logic Layer Separation

The codebase separates presentation (UI) from logic (data fetching, state, business rules):

- **Presentation Layer:** Components in `src/components/` and `src/pages/` are responsible only for rendering UI and receiving data via props.
- **Logic Layer:** Custom hooks in `src/hooks/` handle data fetching, state, and side effects. They are reused across multiple components and pages.

### Usecase Layer

The `src/usecases/` directory contains usecase files that encapsulate business logic and coordinate between services, hooks, and state. This layer acts as the "controller" for complex flows, ensuring that UI components remain simple and focused on rendering. Usecases make it easy to test business logic in isolation and adapt the app to new requirements without rewriting UI code.

### Clean, Reusable Code

- All components are written in TypeScript with clear, explicit props and return types.
- Logic is separated into custom hooks and usecase files, making code easy to test and reuse.
- Compound and higher-order components (e.g., `PageContainer`) promote DRY and composability.

### Component Structure

- Components are organized by domain and responsibility (e.g., `components/`, `pages/`, `hooks/`, `usecases/`).
- Each component is focused and follows the single responsibility principle.
- Presentation and logic are separated for maintainability.

### Layout Complexity

- The app features a multi-section homepage with carousels, dynamic detail pages, and authentication flows.
- Responsive layouts and skeleton loaders are used for a polished user experience.

### CSS/SCSS Organization

- All styles are written in modular SCSS, using variables and mixins for consistency.
- Styles are colocated with components for clarity and maintainability.
- The final CSS is clean, minimal, and follows BEM-like naming for order and predictability.

### DRY Principles

- Shared logic is abstracted into hooks and usecases.
- Reusable UI patterns (e.g., carousels, skeletons, containers) are implemented as components.
- No code duplication between pages or features.

### Testing

- Unit and integration tests are written for all major pages, usecases, and components.
- Tests cover skeleton loading, data rendering, error states, and authentication flows.
- Mocking is used for API calls and authentication to ensure isolation.
- See `src/__tests__/` for examples.

### SSR (Server-Side Rendering)

- This project is currently a client-side rendered SPA (Single Page Application) and does **not** implement SSR by default.
- All SEO optimizations (titles, meta tags, robots.txt) are handled on the client side.
- The architecture is compatible with SSR frameworks (e.g., Next.js) if future migration is desired.
