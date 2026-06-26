# Cinema Finder POC

A React proof-of-concept application for finding nearby cinemas using map-based interaction and geolocation-aware UI components.

This project explores how location, map visualisation, and frontend state can be combined into a practical user-facing search experience. It was originally created as a prototype and is positioned as a frontend / geospatial UI project in my portfolio.

---

## Project purpose

The goal of this project is to demonstrate a small but realistic frontend product workflow:

- Detect or use a user's location
- Display cinema-related information through a map interface
- Support interactive browsing and navigation patterns
- Build a maintainable React application with reusable UI components

---

## Tech stack

- **React 18** for frontend development
- **Material UI** for UI components
- **Leaflet / React Leaflet** for map-based rendering
- **MapLibre / Mapbox GL** for geospatial visualisation experiments
- **Turf.js** for distance and geospatial calculations
- **React Router** for client-side routing
- **notistack** for user notifications

---

## Key engineering areas

- Component-based frontend architecture
- Geolocation-aware user experience
- Interactive map UI development
- Distance calculation and location-based filtering
- State handling for search and user interaction
- Frontend prototyping from a product idea

---

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm start
```

### 3. Build for production

```bash
npm run build
```

---

## Available scripts

```bash
npm start      # Run the app locally
npm run build  # Build production assets
npm test       # Run tests
```

---

## What this project demonstrates

This project is useful as a frontend portfolio example because it shows experience with:

- React application development
- Modern UI libraries
- Map and geospatial tooling
- Location-based user flows
- Product-style frontend prototyping

---

## Future improvements

- Add a cleaner data source abstraction for cinema data
- Improve responsive layout for mobile users
- Add loading and empty-state handling
- Add Playwright tests for key user journeys
- Add deployment configuration and screenshots

---

## Notes

This is a proof-of-concept project rather than a production application. The focus is on frontend architecture, map interaction, and geospatial UI exploration.
