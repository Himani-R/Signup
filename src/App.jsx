import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home"; // your Dashboard component
import { useEffect, useState } from "react";
import { supabase } from "./supabase/client";

// Protected Route Component
function Protected({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;

  return session ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root "/" to /signup */}
        <Route path="/" element={<Navigate to="/signup" />} />

        {/* Signup page */}
        <Route path="/signup" element={<Signup />} />

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard (protected) */}
        <Route
          path="/dashboard"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
