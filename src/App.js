import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Exercises from './pages/Exercises'
import NoPage from './pages/NoPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='p-4 h-screen flex flex-col'>
      <header className=''>
        teste
      </header>

      <div className='flex flex-row space-x-5 h-full'>
        <Navbar />

        <div className='p-4 bg-zinc-800 rounded-lg w-full h-full'>
          <BrowserRouter>
            <Routes>
              <Route index element={<Exercises />} />
              <Route path="/home" element={<Exercises />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>

    </div>
  );
}

export default App;
