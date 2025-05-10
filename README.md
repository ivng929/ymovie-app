# YMovie
**YMovie** is a movie and TV show browsing app built with **React.js** and styled using **Tailwind CSS**. It uses a simple **Node.js + Express** backend to securely access APIs.

## Features:
- Trending, popular, top-rated, and upcoming movies and TV shows.
- Search functionality
- Detail pages for individual movies and TV shows.
- Responsive design
- Secure API access

## Tech Stack:
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
- **API**: The Movie Database (TMDB) [https://www.themoviedb.org/]

## Setup:

### 1. Clone the repo
### 2. Setup backend
Sign up for a free API key from TMDB: https://www.themoviedb.org/

Create a `.env` file inside the `\server` folder with the following content:
```
TMDB_API_KEY="your_tmdb_api_key"
PORT="8000"
```
### 3. Install dependencies
Go to `\server` folder:
```
cd server
npm install
```

Go to `\client` folder:
```
cd client
npm install
```
### 4. Run the app
Go to `\server` folder:
```
cd server
npm start
```

Go to `\client` folder:
```
cd client
npm run dev
```


