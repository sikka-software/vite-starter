import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { supabase } from "@/lib/supabase";
import Layout from "@/components/Layout";

import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import Landing from "@/pages/Landing";

import { Session } from "@supabase/supabase-js";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "next-themes";

function App() {
  const { i18n } = useTranslation();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <BrowserRouter>
        <Toaster
          position="bottom-right"
          richColors
          dir={i18n.language === "ar" ? "rtl" : "ltr"}
          style={{
            fontFamily: "var(--font-family)",
          }}
        />
        <Routes>
          <Route
            element={
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                disableTransitionOnChange
              >
                <Outlet />
              </ThemeProvider>
            }
          >
            <Route path="/" element={<Landing />} />
            <Route
              path="/auth"
              element={
                !session ? (
                  <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    disableTransitionOnChange
                  >
                    <Auth />
                  </ThemeProvider>
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              }
            />
          </Route>
          <Route element={<Layout />}>
            <Route
              path="/dashboard"
              element={
                session ? <Dashboard /> : <Navigate to="/auth" replace />
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
