import { Routes, Route } from 'react-router-dom'
import Exercises from './pages/Exercises'
import NoPage from './pages/NoPage';
import Navbar from './components/Navbar';
import Header from './components/Header';
import { useState } from 'react';

function App() {

  const [showNavbar, setShowNavbar] = useState(true)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  }

  return (
    <div className='p-4 h-screen flex flex-col'>
      <Header handleShowNavbar={handleShowNavbar}/>

      <div className='flex flex-row h-full'>
        <Navbar show={showNavbar}/>

        <div className='p-4 bg-zinc-800 rounded-lg w-full h-full'>
          <Routes>
            <Route index element={<Exercises />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
