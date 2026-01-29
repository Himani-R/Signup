import { useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import "./auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMsg(error.message);
    } else if (!data.user.email_confirmed_at) {
      setMsg("Please verify your email first");
      await supabase.auth.signOut();
    } else {
      navigate("/Home");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="auth-msg">{msg}</p>
        <p className="auth-msg">
  Don’t have an account?{" "}
  <span
    style={{ cursor: "pointer", fontWeight: "bold" }}
    onClick={() => window.location.href = "/"}
  >
    Register
  </span>
</p>
      </div>
    </div>
  );
}

export default Login;