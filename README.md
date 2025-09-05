# Movie DB App

A modern, high-performance web application for browsing, searching, and managing your favorite movies, built with Vite, React, and TypeScript. Integrates with TheMovieDatabase (TMDB) API for real-time film data and supports third-party TMDB login.

## Live Demo

[https://movie-db-app-five.vercel.app/](https://movie-db-app-five.vercel.app/)

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
VITE_TMDB_AUTH_REDIRECT_URI=http://localhost:5173/login
```

- Get your API key from [TMDB](https://www.themoviedb.org/settings/api).
- Set the redirect URI to match your local or deployed environment.

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

- **Clean, Reusable Code:**

  - All components are written in TypeScript with clear, explicit props and return types.
  - Logic is separated into custom hooks and usecase files, making code easy to test and reuse.
  - Compound and higher-order components (e.g., `PageContainer`) promote DRY and composability.

- **Component Structure:**

  - Components are organized by domain and responsibility (e.g., `components/`, `pages/`, `hooks/`, `usecases/`).
  - Each component is focused and follows the single responsibility principle.
  - Presentation and logic are separated for maintainability.

- **Layout Complexity:**

  - The app features a multi-section homepage with carousels, dynamic detail pages, and authentication flows.
  - Responsive layouts and skeleton loaders are used for a polished user experience.

- **CSS/SCSS Organization:**

  - All styles are written in modular SCSS, using variables and mixins for consistency.
  - Styles are colocated with components for clarity and maintainability.
  - The final CSS is clean, minimal, and follows BEM-like naming for order and predictability.

- **DRY Principles:**

  - Shared logic is abstracted into hooks and usecases.
  - Reusable UI patterns (e.g., carousels, skeletons, containers) are implemented as components.
  - No code duplication between pages or features.

- **Testing:**

  - Unit and integration tests are written for all major pages, usecases, and components.
  - Tests cover skeleton loading, data rendering, error states, and authentication flows.
  - Mocking is used for API calls and authentication to ensure isolation.
  - See `src/__tests__/` for examples.

- **SSR (Server-Side Rendering):**
  - This project is currently a client-side rendered SPA (Single Page Application) and does **not** implement SSR.
  - All SEO optimizations (titles, meta tags, robots.txt) are handled on the client side.
  - The architecture is compatible with SSR frameworks (e.g., Next.js) if future migration is desired.

---

## TMDB Third-Party Login

- Users can log in securely with their TMDB account to manage their wish list.
- OAuth flow is handled via TMDB's official API and redirect.
- No passwords are stored; only session tokens are used.

---

## Lighthouse Results

- **Performance:** 99
- **Accessibility:** 100
- **Best Practices:** 100
- **SEO:** 99

---

## License

MIT

```js
export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
