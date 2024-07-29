import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import PageBackground from './components/PageBackground';
import SafeRoutes from './components/SafeRouting';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="PageBackground" element={
        <SafeRoutes roles={[]}>
          <PageBackground/>
        </SafeRoutes>
          }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
