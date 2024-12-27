import { Routes, Route } from "react-router-dom";
import Exercises from "./pages/Exercises/Exercises";
import NoPage from "./pages/NoPage";
import ViewExercise from "./pages/Exercises/ViewExercise";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/layouts/Layout";
import AuthLayout from "./components/layouts/AuthLayout";
import PublicLayout from "./components/layouts/PublicLayout";
import RequireAuth from "./components/RequireAuth";
import Routines from "./pages/Routines/Routines";
import PersonalHealth from "./pages/PersonalHealth/PersonalHealth";
import PersistLogin from "./components/PersistLogin";
import { ExerciseProvider } from "./context/ExerciseProvider";
import ViewSession from "./pages/Exercises/ViewSession";
import { SessionProvider } from "./context/SessionProvider";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route element={<PublicLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route element={<AuthLayout />}>
              <Route path="/" element={<Exercises />} />
              <Route path="routines" element={<Routines />} />
              <Route path="health" element={<PersonalHealth />} />
              <Route element={<ExerciseProvider />}>
                <Route path="exercise/:id" element={<ViewExercise />} />
                <Route element={<SessionProvider />}>
                  <Route path="session/:id" element={<ViewSession />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<NoPage />} />
      </Route>
    </Routes>
  );
}

export default App;
