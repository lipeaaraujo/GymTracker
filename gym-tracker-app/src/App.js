import { Routes, Route } from 'react-router-dom'
import Exercises from './pages/Exercises/Exercises'
import NoPage from './pages/NoPage';
import ViewExercise from './pages/Exercises/ViewExercise';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/layouts/Layout';
import AuthLayout from './components/layouts/AuthLayout';
import PublicLayout from './components/layouts/PublicLayout';
import RequireAuth from './components/RequireAuth';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public routes */}
        <Route element={<PublicLayout />} >
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>

        {/* protected routes */}
        <Route element={<RequireAuth />} >
          <Route element={<AuthLayout />} >
            <Route path='/' element={<Exercises />} />
            <Route path='view-exercise' element={<ViewExercise />} />
          </Route>
        </Route>

        {/* catch all */}
        <Route path='*' element={<NoPage />} />
      </Route>
    </Routes>
    // <>
    //   { loggedIn ? (
    //     <div className='p-4 h-screen flex flex-col'>
    //       <Header handleShowNavbar={handleShowNavbar}/>

    //       <div className='flex flex-row h-full'>
    //         <Navbar show={showNavbar}/>

    //         <div className='p-4 bg-zinc-800 rounded-lg w-full h-full'>
    //           <Routes>
    //             <Route index element={<Exercises />} />
    //             <Route path="/viewexercise" element={<ViewExercise />} />
    //             <Route path="*" element={<NoPage />} />
    //           </Routes>
    //         </div>
    //       </div>
    //     </div>
    //   ) : (
    //     <Routes>
    //       <Route path="/login" element={<Login />} />
    //       <Route path="/register" element={<Register />} />
    //     </Routes>
    //   )}
    // </>
  );
}

export default App;
