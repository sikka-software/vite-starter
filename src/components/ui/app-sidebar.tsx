import {
  Link2,
  BarChart,
  CreditCard,
  ChevronUp,
  User2,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/lib/supabase";
import { useTheme } from "next-themes";

export function AppSidebar() {
  const { t, i18n } = useTranslation("common");
  const { resolvedTheme } = useTheme();
  const { state } = useSidebar();

  const location = useLocation();
  const items = [
    {
      title: t("dashboard"),
      url: "/dashboard",
      icon: Link2,
    },
    {
      title: t("page_2"),
      url: "/page_2",
      icon: BarChart,
    },
    {
      title: t("page_3"),
      url: "/page_3",
      icon: CreditCard,
    },
  ];

  return (
    <Sidebar
      collapsible="icon"
      side={i18n.language === "ar" ? "right" : "left"}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarHeader className="p-0">
            <Link to="/" className="flex items-center">
              <span className=" text-xl font-bold">
                {state === "collapsed" ? (
                  <img
                    src={
                      resolvedTheme === "dark"
                        ? "/lazim_favicon_white.png"
                        : "/lazim_favicon.png"
                    }
                    width={80}
                    className="max-w-[30px]"
                    alt="Logo Here"
                  />
                ) : (
                  <img
                    src={
                      resolvedTheme === "dark"
                        ? "/lazim-white.png"
                        : "/lazim-black.png"
                    }
                    alt="Logo Here"
                  />
                )}
              </span>
            </Link>
          </SidebarHeader>
          <SidebarGroupContent>
            <SidebarMenu className="mt-4">
              {items.map((item, i) => (
                <SidebarMenuItem key={i}>
                  <Link to={item.url}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={cn(
                        location.pathname === item.url &&
                          "bg-foreground text-background hover:bg-foreground hover:text-background"
                      )}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {state === "collapsed" ? (
                    <User2 className="!size-4" />
                  ) : (
                    <>
                      user email <ChevronUp className="ms-auto" />
                    </>
                  )}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <Link to="/account">
                  <DropdownMenuItem>
                    <User2 className="!size-4" />
                    <span>{t("account")}</span>
                  </DropdownMenuItem>
                </Link>
                <Link to="/billing">
                  <DropdownMenuItem>
                    <CreditCard className="!size-4" />
                    <span>{t("billing")}</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => supabase.auth.signOut()}>
                  <LogOut className="!size-4" /> <span>{t("sign_out")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
