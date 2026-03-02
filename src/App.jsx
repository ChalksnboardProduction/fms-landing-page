import React from 'react';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-24 px-4 container mx-auto">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Landing Page</h1>
        <p className="text-gray-600">The Navbar is correctly imported and rendered above.</p>
        <p className="text-gray-600 mt-4">Play around with the viewport to see mobile responsiveness!</p>
      </main>
    </div>
  );
}

export default App;
