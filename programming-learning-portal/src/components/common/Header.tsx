import React from 'react';

interface HeaderProps {
  onSignIn?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSignIn }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-primary">Programming Learning Portal</h1>
            <nav className="hidden md:flex space-x-4">
              <button className="text-gray-600 hover:text-primary">Courses</button>
              <button className="text-gray-600 hover:text-primary">Practice</button>
              <button className="text-gray-600 hover:text-primary">Community</button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={onSignIn}
              className="btn-primary"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;