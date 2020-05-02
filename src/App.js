import React from 'react';
import './App.css';
import ResultsTable from './ResultsTable.js';
import firebase from './firebase';

function App() {
  return (
    <ResultsTable firebase={firebase} />
  );
}

export default App;
