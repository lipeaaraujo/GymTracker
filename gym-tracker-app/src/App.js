import { Routes, Route } from 'react-router-dom'
import Exercises from './pages/Exercises/Exercises'
import NoPage from './pages/NoPage';
import Navbar from './components/Navbar';
import Header from './components/Header';
import { useState } from 'react';
import ViewExercise from './pages/Exercises/ViewExercise';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {

  const [showNavbar, setShowNavbar] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  }

  return (
    <>
      { loggedIn ? (
        <div className='p-4 h-screen flex flex-col'>
          <Header handleShowNavbar={handleShowNavbar}/>

          <div className='flex flex-row h-full'>
            <Navbar show={showNavbar}/>

            <div className='p-4 bg-zinc-800 rounded-lg w-full h-full'>
              <Routes>
                <Route index element={<Exercises />} />
                <Route path="/viewexercise" element={<ViewExercise />} />
                <Route path="*" element={<NoPage />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </>
  );
}

export default App;
