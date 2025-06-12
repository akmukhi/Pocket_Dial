import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Placeholder components for pages
const Home = () => <div>Home Page</div>;
const Search = () => <div>Search Page</div>;
const Profile = () => <div>Profile Page</div>;
const WatchDetails = () => <div>Watch Details Page</div>;
const Retailers = () => <div>Retailers Page</div>;
const Recommendations = () => <div>Recommendations Page</div>;

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav className="bg-gray-800 text-white p-4">
          <ul className="flex space-x-4">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/watch-details">Watch Details</Link></li>
            <li><Link to="/retailers">Retailers</Link></li>
            <li><Link to="/recommendations">Recommendations</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/watch-details" element={<WatchDetails />} />
          <Route path="/retailers" element={<Retailers />} />
          <Route path="/recommendations" element={<Recommendations />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App; 