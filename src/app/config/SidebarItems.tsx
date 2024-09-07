import { Home, Settings, User, Users } from "lucide-react";
import { usePathname } from "next/navigation";

export const SidebarItems = () => {
  const pathname = usePathname();

  function isActive(pathname: string, nav: string) {
    return pathname.includes(nav);
  }

  return [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <Home size={20} />,
      active: pathname === "/dashboard",
      position: "top",
    },
    {
      name: "Leads",
      href: "/dashboard/leads",
      icon: <Users size={20} />,
      active: isActive(pathname, "/dashboard/leads"),
      position: "top",
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings size={20} />,
      active: isActive(pathname, "/dashboard/settings"),
      position: "bottom",
    },
  ];
};
