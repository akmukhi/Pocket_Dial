# Pocket Dial - Watch Database & Recommendation Platform

A comprehensive platform for watch enthusiasts to discover, learn about, and purchase watches from authorized retailers.

## Features

- Extensive watch database with modern and vintage timepieces
- User profiles and personalized watch recommendations
- Advanced search and filtering capabilities
- Integration with authorized watch retailers
- Responsive design for both web and mobile
- Watch specifications and detailed information
- User reviews and ratings system

## Tech Stack

- Frontend: React with TypeScript
- Backend: Node.js/Express with TypeScript
- Database: MongoDB
- Authentication: JWT
- Styling: Tailwind CSS
- State Management: Redux Toolkit

## Project Structure

```
pocket-dial/
├── client/                 # Frontend React application
├── server/                 # Backend Node.js/Express application
├── shared/                 # Shared types and utilities
└── docs/                   # Documentation
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables:
   - Create `.env` files in both client and server directories
   - Follow the `.env.example` files for required variables

4. Start the development servers:
   ```bash
   # Start backend server
   cd server
   npm run dev

   # Start frontend server
   cd ../client
   npm start
   ```

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License. 