import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage'
import SafeRoutes from './components/SafeRouting';
import NewAccount from './components/NewAccount';
import Settings from './components/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="SearchPage" element={
        <SafeRoutes roles={[]}>
          <SearchPage/>
        </SafeRoutes>
          }/>
        <Route path="NewAccount" element={<NewAccount/>} />
        <Route path="Settings" element={<Settings/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
