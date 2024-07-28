## Creating a comprehensive README is crucial for documenting our project and providing guidance for users and developers. Here's an example README based on our project requirements:

## CryptoCurrency Tracker
## Overview
## CryptoCurrency Tracker is a web application built with TypeScript and React that displays real-time cryptocurrency data. It fetches data from the CoinCap API and provides features such as sorting, pagination, and favoriting. Users can also view detailed information and historical price data for individual cryptocurrencies.

## Features
## Table Page (Home Page):

## Fetch Real-Time Cryptocurrency Data:
## Displays the top 100 cryptocurrencies with columns for symbol, name, price, and market cap in USD.
## Utilizes CoinCap API for fetching data.
## Listens to WebSockets for real-time updates on prices.
## Supports pagination with 10 items per page.
## Table Features:
## Allows sorting by symbol or name.
## Sorting persists even when data is refreshed.
## Clicking on a cryptocurrency name redirects to the details page.
## Favorites Feature:
## Toggle button for favoriting/unfavoriting cryptocurrencies.
## Favorite status persists across sessions using local storage.
## Details Page:

## Displays detailed information about the selected cryptocurrency.
## Fetches data using CoinCap API based on the cryptocurrency ID.
## Shows a graph of daily average prices for the last 30 days.
## Installation
## Prerequisites
## Node.js (>= 14.x)
## npm (>= 6.x)
## Setup

## Clone the repository:
## bash
## Copy code
## git clone https://github.com/manik8/cryptocurrency.git
## cd cryptocurrency-tracker

## Install dependencies:
## bash
## Copy code
## npm install

## Start the development server:
## bash
## Copy code
## npm run dev

## Build the project for production:
## bash
## Copy code
## npm run build

## Serve the production build:
## bash
## Copy code
## npm run serve
## Usage
## Development
## The application will be available at http://localhost:5173.
## Navigate to the homepage to view the list of cryptocurrencies.
## Click on a cryptocurrency name to view detailed information on the details page.
## Production
## The production build will be output to the dist folder.
## Serve the contents of the dist folder using a static file server or your preferred hosting solution.
## API Reference
## CoinCap API:
## Base URL: https://api.coincap.io/v2
## Endpoints:
## /assets: Fetches the top 100 cryptocurrencies.
## /assets/<id>: Fetches details of a specific cryptocurrency.
## Testing

## Technology Stack

## React: For building the user interface.
## TypeScript: For type safety and enhanced development experience.
## Vite: For fast build times and modern development features.
## Material-UI (MUI5): For UI components and styling.
## Chart.js: For rendering charts in the details view.

## The project uses Jest for testing. To run the tests, use:
## bash
## Copy code
## npm test
## Tests cover various components and functionality, including data fetching, state management, and UI interactions.

## Project Structure
## bash
## Copy code
## src/
## ├── assets/                # Static assets like images, fonts, etc.
## ├── components/            # Reusable components (Atoms, Molecules, Organisms)
## ├── styles/                # Global styles and theme
## ├── utils/                 # Utility functions and API services
## ├── App.tsx                # Main app component
## ├── index.tsx              # Entry point for React
## └── ...

## Contact
## For questions or suggestions, please contact Manik Sharma.
