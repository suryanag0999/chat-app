Real-Time Chat Application
A modern, responsive real-time messaging application built with the MERN stack and Socket.IO, featuring instant messaging, user management, and a mobile-first design.

✨ Features
🚀 Core Functionality
Real-time messaging - Instant message delivery using Socket.IO
User authentication - Secure login and registration system
Private conversations - One-on-one messaging between users
User search & discovery - Find and connect with other users
Online status indicators - See who's currently online
Message history - Persistent chat history storage
📱 User Experience
Mobile-first design - Optimized for mobile devices with responsive layout
Click-to-reveal timestamps - Clean interface with timestamps shown on demand
Message reactions - Reply functionality (expandable for future features)
Image sharing - Send and receive images in conversations
Real-time typing indicators - See when someone is typing
Message status indicators - Delivery and read receipts
🎨 Modern UI/UX
Dark/Light theme support - Customizable appearance
Smooth animations - Polished user interactions
Avatar support - Profile pictures for personalized experience
🛠️ Technologies Used
Backend
Node.js - Runtime environment
Express.js - Web application framework
MongoDB - NoSQL database for data storage
Socket.IO - Real-time bidirectional event-based communication
JWT - JSON Web Tokens for authentication
Bcrypt - Password hashing and security
Frontend
React - Frontend library for building user interfaces
React Hooks - State management and lifecycle methods
Socket.IO Client - Real-time communication on client-side
Tailwind CSS - Utility-first CSS framework
Lucide React - Beautiful icon library
React Hot Toast - Elegant notifications
🚀 Getting Started
Prerequisites
Make sure you have the following installed:

Node.js (v14.0.0 or later)
npm
MongoDB (local installation or MongoDB Atlas)
Installation
Clone the repository

git clone https://github.com/vinagsv/chatapp-sv.git
cd chat-app
Install backend dependencies

cd server
npm install
Install frontend dependencies

cd ../client
npm install
Environment Setup

Create a .env file in the backend directory:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
Start the application

Backend (from server directory):

npm run dev
Frontend (from client directory):

npm run dev
Access the application

Frontend: http://localhost:3000
Backend: http://localhost:5173
🌟 Key Features Explained
Real-Time Messaging
Instant message delivery using WebSocket connections
Automatic reconnection handling
Message persistence across sessions
User Management
Secure authentication with JWT tokens
User profile management
Online/offline status tracking
Responsive Design
Mobile-first approach with Tailwind CSS
Adaptive layouts for different screen sizes
Touch-friendly interface elements
🤝 Contributing
We welcome contributions! Please follow these steps:

Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
🔮 Future Enhancements
Group Messaging - Create and manage group conversations
Voice & Video Calls - WebRTC integration for calling features
Message Encryption - End-to-end encryption for enhanced security
Push Notifications - Browser and mobile push notifications
Message Search - Search through chat history
File Sharing - Support for documents, videos, and other file types
