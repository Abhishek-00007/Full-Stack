import React from 'react';
import './App.css';
import JsonForm from './JsonForm';  // Import the JsonForm component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>JSON Input Form</h1>  {/* A simple header */}
        <JsonForm />  {/* Render the JsonForm component */}
      </header>
    </div>
  );
}

export default App;
