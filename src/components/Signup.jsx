import { useState } from "react";
import { supabase } from "../supabase/client";
import "./auth.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSignup = async (e) => {
  e.preventDefault();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "https://Signup.vercel.app/login",
    },
  });

  if (error) {
    if (error.message.includes("already")) {
      setMsg("Account already exists. Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } else {
      setMsg(error.message);
    }
  } else {
    setMsg("Check your email to verify 📧");
  }
};

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
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
          <button type="submit">Create Account</button>
        </form>
        <p className="auth-msg">{msg}</p>
        <p className="auth-msg">
  Already have an account?{" "}
  <span
    style={{ cursor: "pointer", fontWeight: "bold" }}
    onClick={() => window.location.href = "/login"}
  >
    Login
  </span>
</p>
      </div>
      
    </div>
  );
}

export default Signup;