import { Routes, Route } from 'react-router-dom'
import Exercises from './pages/Exercises'
import NoPage from './pages/NoPage';
import Navbar from './components/Navbar';
import Header from './components/Header';

function App() {
  return (
    <div className='p-4 h-screen flex flex-col'>
      <Header />

      <div className='flex flex-row space-x-5 h-full'>
        <Navbar />

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
