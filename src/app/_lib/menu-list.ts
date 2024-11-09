import {
  Tag,
  Users,
  Settings,
  LayoutGrid,
  LucideIcon,
  BotMessageSquare,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: "/leads",
          label: "Leads",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Ferramentas",
      menus: [
        // {
        //   href: "",
        //   label: "Posts",
        //   icon: SquarePen,
        //   submenus: [
        //     {
        //       href: "/posts",
        //       label: "All Posts",
        //     },
        //     {
        //       href: "/posts/new",
        //       label: "New Post",
        //     },
        //   ],
        // },
        {
          href: "/growth-advisor",
          label: "Chatbot",
          icon: BotMessageSquare,
        },
        {
          href: "/tags",
          label: "Tags",
          icon: Tag,
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          icon: Users,
        },
        {
          href: "/account",
          label: "Account",
          icon: Settings,
        },
      ],
    },
  ];
}
