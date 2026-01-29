import { useEffect, useState } from "react";
import { supabase } from "../supabase/client";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome {user?.email}</p>
    </div>
  );
}

export default Dashboard;