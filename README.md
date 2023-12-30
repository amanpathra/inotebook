# iNotebook - Notes Taking App
Welcome to the README for iNotebook, a notes-taking app built with React, Bootstrap, and the Context API. This app allows users to take notes in a title-content-tag format, and it features user authentication. Notes are saved to a local MongoDB database.

## Features
1. User Authentication: Securely log in and access your personalized notes.
2. Note-Taking Format: Create notes with a title, content, and tags.
3. Local MongoDB Storage: Save your notes to a local MongoDB database.

## Technologies Used
- React: A JavaScript library for building user interfaces.
- Bootstrap: A popular CSS framework for responsive and mobile-first design.
- Context API: A React feature for managing global state in an application.
- MongoDB: A NoSQL database for storing user notes locally.
- Express.js - A Node.js package for API requests.

## How to Use
1. Clone the repository to your local machine:
```
git clone https://github.com/your-username/inotebook.git
```
2. Navigate to the project directory:
```
cd inotebook
```
3. Install dependencies:
```
npm install
```
4. Set up your MongoDB connection:
  - Create a MongoDB database and obtain the connection URI.
  - Create a .env file in the project root and add your MongoDB URI:
  ```
  REACT_APP_MONGODB_URI=your-mongodb-uri
  ```
5. Start the application:
```
npm start
```
6. Open your web browser and go to http://localhost:3000 to access iNotebook.

## Project Structure
- src/: Directory containing the React components, styles, and utility functions.
- public/: Public assets and the index.html file.
- context/: Directory containing the Context API setup for global state management.

## User Authentication
iNotebook includes user authentication to provide a personalized experience for each user.

Contributing
Feel free to contribute to the project by submitting issues or pull requests. Your feedback and contributions are highly appreciated!

Acknowledgments
Thanks to the React community for providing a powerful framework.
Special thanks to Bootstrap for simplifying the design process.
Appreciation to the MongoDB team for their flexible and scalable database solution.
