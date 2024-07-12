# Vite Web Scraper

## Overview
This Vite application is a custom web scraper designed to scrape data from [Hacker News](https://news.ycombinator.com/). It utilizes CORS Anywhere, a NodeJS proxy, to add CORS headers to the proxied requests.

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm (v9 or later)

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/DenizAgisuna/scraper.git
    cd scraper
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application
1. Start the CORS Anywhere proxy server:
    ```bash
    node proxy.ejs
    ```

2. Run the development server:
    ```bash
    npm run dev
    ```

## Usage
- Open your browser and navigate to `http://localhost:5173` to use the web scraper.

## Notes
- This project 's proxy uses CORS Anywhere to handle CORS issues by adding the necessary CORS headers to the proxied requests. This allows the application to successfully fetch data from `https://news.ycombinator.com/`.


