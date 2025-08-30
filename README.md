Overview:

This project is a simple yet effective web application demonstrating face recognition login integrated with GPS location tracking and brute force/unusual login pattern detection. The frontend uses React and the backend uses Node.js with Express.

The face recognition authentication is intended to be powered by FACEIO, a secure facial recognition SDK/service. A mock placeholder is included for testing, which you can replace with real FACEIO calls once you have your public key.

Features
Face recognition login via FACEIO (or mock for development)

Browser GPS tracking for the login attempt location

Backend brute force detection by counting recent failed attempts

Detection of unusual login attempts based on GPS location differences

Simple status updates on the frontend for user feedback

Setup Instructions
Backend
Navigate to the backend directory:

cd backend
node server.js
The backend will listen on port 3001 by default.

Frontend
Navigate to the frontend directory.

cd frontend
npm install
npm run dev
Open your browser to the URL shown (http://localhost:5173).
