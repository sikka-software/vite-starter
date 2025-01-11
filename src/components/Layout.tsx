// Layout

import { supabase } from "@/lib/supabase";
import { Button } from "./ui/button";
import { useNavigate, Outlet } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Outlet />
      <Button
        onClick={() => {
          supabase.auth.signOut();
          navigate("/auth");
        }}
      >
        Logout
      </Button>
    </div>
  );
}
