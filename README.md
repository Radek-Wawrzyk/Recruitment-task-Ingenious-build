#  Bus stops interview task

## Introduction
Bus stops interview task is a modern Vue 3 application designed to provide a seamless and efficient user experience for browsing bus stops and lines. Every core feature of the application has been thoughtfully implemented, with careful attention to modularity, maintainability, and code quality. The project leverages TypeScript, composables, Vuex, and a robust SCSS architecture to ensure scalability and clarity.

All major parts of the application—including business logic, state management, and reusable UI components—are thoroughly unit tested using Vitest and Vue Test Utils. This comprehensive testing approach guarantees that each module works as intended and that the application as a whole is reliable and easy to extend.

Whether you are exploring the codebase, running the app, or considering future enhancements, you’ll find that every aspect of the project is well-structured, well-documented, and ready for further development.


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run serve
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Format with [prettier](https://prettier.io/)

```sh
npm run format
```

## Technologies Used
- **Framework**: Vue 3
- **Language**: TypeScript
- **Build Tool**: Webpack
- **State Management**: Composables (custom hooks) + Vuex
- **Styling**: SCSS with BEM architecture
- **API Management**: API services by Axios
- **Unit Testing**: Vitest, Vue Test Utils
- **Additional Libraries**:
  - prettier (code format)


According to the project requirements, no additional libraries or packages were to be added or changed; however, I needed to install a few extra dependencies to ensure proper integration of ESLint with Prettier and to enable a fully functional testing environment with Vitest.

## Application Architecture
The project is organized in a modular and intuitive way, making it easy to navigate and extend. At the root of the src directory, you’ll find the main application entry point (main.ts) and the root Vue component (App.vue). The rest of the source code is divided into feature-focused folders:
- **components/** -
Contains all reusable UI components, each with its own directory and scoped styles. Components are designed to be modular and follow the BEM naming convention for CSS classes.
- **composables/** -
Stores custom Vue 3 composables (hooks) that encapsulate business logic and stateful behavior, promoting code reuse and separation of concerns.
- **pages/** - 
Contains top-level page components that represent the main views of the application. Each page typically composes multiple components and hooks to deliver a complete user experience.
- **store/** - 
Includes Vuex modules for global state management. Each module is responsible for a specific domain of the application, such as the timetable.
- **api/** -
Contains all API service definitions and integrations, primarily using Axios for HTTP requests. This layer abstracts data fetching and communication with backend services.
- **utils/** -
Provides utility functions and helpers that are used throughout the application for tasks like data transformation, sorting, and deduplication.
- **constants/** -
Stores static values, enums, and configuration objects used across the app, such as locale codes and routing definitions.
- **styles/** - 
Centralizes global SCSS files, including variables, layout, typography, and animations. Component-specific styles are colocated with their respective components.
- **types/** -
Defines TypeScript interfaces and types, ensuring type safety and clarity throughout the codebase.
- **assets/** -
Contains static assets such as images and icons.

This structure encourages separation of concerns, scalability, and maintainability, making it straightforward for new developers to onboard and for the project to grow over time.


## Testing Approach
This project uses a robust unit testing strategy to ensure the reliability and maintainability of the codebase. The main tools used are Vitest and Vue Test Utils (63 unit tests), which together provide a modern and efficient environment for testing Vue 3 components, composables, and Vuex modules.

**What is covered**
   - Composables (Custom Hooks):
All business logic encapsulated in composables (such as useBusLines, useBusStops, useLoading) is thoroughly unit tested. This ensures that the core logic of filtering, sorting, and state management works as expected in isolation.
- Vuex Store Modules:
The Vuex modules, especially the timetable module, are tested for mutations, actions (including async API calls with mocked Axios services), and all getters. This guarantees that state management and data transformations are robust and predictable.
Utility Functions:
- All utility functions (e.g., removeStopDuplicates, sortStops, sleep, getUUID) are covered by unit tests to ensure their correctness and reliability.
- Components:
Key UI components are tested for rendering, props, events, and integration with composables and the store. Where appropriate, child components are stubbed to focus on the logic of the parent component.

**What is not covered**
- Pages (Router view components):
I did not write unit tests for full page components. In my experience, page-level testing is best handled with end-to-end (E2E) tools such as Cypress or Playwright. Since the logic of pages is already covered by unit tests for their modules and components, E2E tests would provide more value by verifying user flows and integration in a real browser environment.

## CSS Architecture
The project’s styling is built with SCSS and follows the BEM (Block Element Modifier) methodology, which ensures that class names are both descriptive and modular. All global design tokens—such as colors, border radii, and transition durations—are defined as CSS custom properties in a central variables.scss file. These variables are then used throughout the application to maintain a consistent look and feel.
Each Vue component has its own dedicated SCSS file, where styles are scoped and organized using BEM conventions. This approach keeps styles encapsulated, prevents conflicts, and makes it easy to understand the relationship between blocks, elements, and their modifiers.

The main SCSS entry point imports foundational modules for layout, typography, and animations, while component-specific styles are imported directly into their respective Vue files.
By combining modular SCSS, BEM naming, and CSS variables, the project achieves a maintainable and scalable CSS architecture that is easy to extend and adapt as the application grows.

## Conclusions and Potential Improvements
his project demonstrates a modern, modular approach to building Vue 3 applications with TypeScript, SCSS, and a strong emphasis on maintainability and testability. The use of composables, Vuex, and a clear separation of concerns has resulted in a codebase that is easy to navigate and extend.
Looking ahead, there are several areas where the project could be further improved. Introducing end-to-end (E2E) testing with tools like Cypress or Playwright would provide greater confidence in the user experience by validating complete user flows in a real browser environment.

Additionally, migrating from Vuex to Pinia could simplify state management and improve developer ergonomics, as Pinia offers a more modern API and better TypeScript support. For data fetching, integrating TanStack Query (formerly React Query) alongside Axios would enhance the handling of server state, caching, and background updates, making the application even more robust and responsive.

Overall, the current architecture provides a solid foundation, but these enhancements would help future-proof the project and further streamline both development and testing workflows.

## Summary
Bus stops interview task is a project that showcases a clean, modular, and testable approach to building modern Vue 3 applications. While the initial version of this app was created some time ago, I have since performed a significant refactor to improve code quality, structure, and maintainability. This refactor included the introduction of comprehensive unit tests for all key modules, composables, and components, ensuring that the application’s core logic is robust and reliable.

The project now stands as a solid foundation for further development, with a clear architecture, consistent styling, and a strong focus on best practices. This work not only demonstrates my ability to deliver production-ready code, but also my commitment to continuous improvement and code quality.