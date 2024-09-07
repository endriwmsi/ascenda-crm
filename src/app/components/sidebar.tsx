"use client";

import { Fragment, useState } from "react";
import { ChevronLeft, ChevronRight, Sidebar } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "../lib/utils";
import { SidebarItem } from "./sidebar-item";
import { SidebarItems } from "../config/SidebarItems";

export default function SideNav() {
  const sidebarItems = SidebarItems();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className="z-50 pr-4">
      <div
        className={cn(
          isSidebarExpanded ? "w-[200px]" : "w-[68px]",
          "hidden h-full transform rounded-lg border-r bg-card shadow-lg transition-all duration-300 ease-in-out sm:flex",
        )}
      >
        <aside className="flex h-full w-full columns-1 flex-col overflow-x-hidden break-words px-4">
          {/* Top */}
          <div className="relative mt-4 pb-2">
            <div className="flex flex-col space-y-1">
              {sidebarItems.map((item, idx) => {
                if (item.position === "top") {
                  return (
                    <div className="space-y-1" key={idx}>
                      <SidebarItem
                        label={item.name}
                        icon={item.icon}
                        path={item.href}
                        active={item.active}
                        isSidebarExpanded={isSidebarExpanded}
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>

          {/* Bottom */}
          <div className="sticky bottom-0 mb-4 mt-auto block whitespace-nowrap transition duration-200">
            <ThemeToggle isDropDown={true} />
            {sidebarItems.map((item, idx) => {
              if (item.position === "bottom") {
                return (
                  <div className="space-y-1" key={idx}>
                    <SidebarItem
                      label={item.name}
                      icon={item.icon}
                      path={item.href}
                      active={item.active}
                      isSidebarExpanded={isSidebarExpanded}
                    />
                  </div>
                );
              }
            })}
          </div>
        </aside>
        <div className="relative mt-[calc(calc(90vh)-40px)]">
          <button
            type="button"
            className="absolute bottom-32 right-[-12px] flex h-6 w-6 items-center justify-center rounded-full border border-muted-foreground/20 bg-accent shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg"
            onClick={toggleSidebar}
          >
            {isSidebarExpanded ? (
              <ChevronLeft size={16} className="stroke-foreground" />
            ) : (
              <ChevronRight size={16} className="stroke-foreground" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
