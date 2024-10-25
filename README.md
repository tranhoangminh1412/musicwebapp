# Music Web App

This project is a full-stack music web application that allows users to explore songs, create personalized playlists, and view their liked songs. Built with **React** and **Redux** on the front end, **Express** and **Firebase** on the back end, and implementing **JWT-based authentication**, this app provides a secure, user-focused music discovery and playlist management experience.

## Overview

The Music Web App enables users to:
- Browse and search for songs
- Like and add songs to personal playlists
- Access user-specific liked songs and playlists
- Manage account and authentication with JWT

## Technologies

- **Frontend**: React, Redux
- **Backend**: Node.js, Express, Firebase for data storage
- **Authentication**: JWT (JSON Web Tokens) for secure user login and access control
- **CSS & HTML**: Front-end styling and layout

## Project Structure

- `client/`: React front-end files
- `server/`: Express back-end files and Firebase integration
- `src/`: Shared utilities and configuration files
- `public/`: Static assets and main index.html for React app

## Setup

1. Clone the repository:
    ```bash
   git clone https://github.com/tranhoangminh1412/music-web-app
   cd music-web-app
2. Install dependencies for both client and server:
  
    ```bash
    cd soundcloud-fake
    npm install

- Set up Firebase credentials in server/config and create .env files for JWT secrets.

3. Usage
- Start the App: Run the following in the /soundcloud-fake directory:
  ```bash
  npm start
- Access the app at http://localhost:3000 in a web browser.

## Features
- JWT Authentication: Secure login and role-based access for personalized user experience
- Playlist Management: Create, view, and manage personal playlists
- Liked Songs: Track user-specific liked songs with a separate list

## Future Work
- Expand user interactions, including social features (e.g., following other users' playlists)
- Add recommendation engine based on user listening history

## License
This project is licensed under the MIT License.
