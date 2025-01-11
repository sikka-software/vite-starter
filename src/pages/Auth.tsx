import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const { t } = useTranslation("common");
  // const { resolvedTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
          setLoading(false);
          return;
        }

        const { data: signUpData, error: signUpError } =
          await supabase.auth.signUp({ email, password });

        if (signUpError) throw signUpError;

        // Create profile for new user
        if (signUpData.user) {
          const { error: profileError } = await supabase
            .from("users")
            .insert([{ id: signUpData.user.id }]);

          if (profileError) throw profileError;
        }

        toast.success("Account created successfully!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Welcome back!");
      }

      // Check if there's a pending URL to shorten
      const pendingUrl = sessionStorage.getItem("pendingShortUrl");
      if (pendingUrl) {
        // Navigate to dashboard with state to open create dialog
        navigate("/dashboard", {
          state: { openCreateDialog: true, pendingUrl },
        });
        // Clear the pending URL
        sessionStorage.removeItem("pendingShortUrl");
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 items-center">
      {/* <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img
            src={
              resolvedTheme === "dark" ? "/lazim-white.png" : "/lazim-black.png"
            }
            alt="Lazim"
            className="h-12"
          />
        </div>
      </div> */}

      <div className="mt-8 flex flex-col gap-2 sm:mx-auto sm:w-full sm:max-w-md  max-w-[90%] w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {isSignUp
                ? t("create_your_account")
                : t("sign_in_to_your_account")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">{t("email_address")}</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password">{t("password")}</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {isSignUp && (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="confirm-password">
                    {t("confirm_password")}
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              )}

              <Button type="submit" disabled={loading} className="w-full">
                {loading
                  ? t("loading")
                  : isSignUp
                  ? t("sign_up")
                  : t("sign_in")}
              </Button>
            </form>

            <div className="mt-6">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="w-full text-sm text-muted-foreground cursor-pointer hover:text-primary"
              >
                {isSignUp
                  ? t("already_have_an_account") + " " + t("sign_in")
                  : t("dont_have_an_account") + " " + t("sign_up")}
              </button>
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-row justify-between">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
}
