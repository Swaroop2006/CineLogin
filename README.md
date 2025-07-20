# CineLogin
A Node.js-based movie search platform with secure user authentication using Firebase. Users can sign up or log in, access a personalized dashboard, and search for movies using the OMDb API. Built with EJS templates and Express.js for a smooth server-rendered experience.
🔑 Features
🏠 Landing Page: Clean and interactive entry point for users

🔐 Authentication: Secure sign-up and login using Firebase Authentication

🧾 Dashboard: Personalized space for logged-in users to search for movies

🔍 Movie Search: Powered by the OMDb API to fetch movie details

🎞️ Movie Details: View posters, genres, ratings, and plot summaries

⛔ Protected Routes: Unauthenticated users are restricted from accessing core features

🖥️ Server-Side Rendering: UI rendered using EJS for dynamic pages

🛠️ Tech Stack
Backend:
Node.js

Express.js

Frontend Templating:
EJS (Embedded JavaScript Templates)

Authentication:
Firebase Authentication

Movie Data API:
OMDb API (Open Movie Database)

🔐 Authentication Flow
Users register or log in using their email and password through Firebase Authentication.

Upon successful login, users are redirected to a protected dashboard.

Access to dashboard and movie search is restricted to authenticated users only.

🔎 Movie Search Flow
The user enters a movie title in the search bar available on the dashboard.

The server sends a request to the OMDb API with the given title.

Movie details such as poster, title, genre, rating, and plot are fetched and displayed.
