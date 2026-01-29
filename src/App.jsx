import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import { useEffect, useState } from "react";
import { supabase } from "./supabase/client";

// Protected Route
function Protected({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (loading) return <p>Loading...</p>;

  return session ? children : <Navigate to="/login" />;
}

// Component to handle Supabase email verification/magic link
function VerifyRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const access_token = urlParams.get("access_token");

    if (access_token) {
      supabase.auth
        .setSession({ access_token })
        .then(() => {
          // Email verified → redirect to login
          navigate("/login");
        })
        .catch(() => {
          // Token invalid → fallback
          navigate("/signup");
        });
    } else {
      // No token → fallback
      navigate("/signup");
    }
  }, [navigate]);

  return <p>Verifying your account...</p>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root route now handles verification links */}
        <Route path="/" element={<VerifyRedirect />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
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
