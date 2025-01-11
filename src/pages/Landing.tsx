import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      This is the landing page
      <Button variant="outline" onClick={() => navigate("/auth")}>
        Login
      </Button>
    </div>
  );
}
