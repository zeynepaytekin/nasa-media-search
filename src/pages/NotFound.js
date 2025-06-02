import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="App">
      <h1>404 - Page Not Found 🚀</h1>
      <Link to="/" className="button-primary">
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
