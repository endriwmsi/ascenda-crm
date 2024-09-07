import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type SidebarItemProps = {
  label: string;
  icon: any;
  path: string;
  active: boolean;
  isSidebarExpanded: boolean;
};

export const SidebarItem = ({
  label,
  icon,
  path,
  active,
  isSidebarExpanded,
}: SidebarItemProps) => {
  return (
    <>
      {isSidebarExpanded ? (
        <Link
          href={path}
          className={`relative flex h-full items-center whitespace-nowrap rounded-md ${
            active
              ? "font-base bg-neutral-200 text-sm text-neutral-700 shadow-sm dark:bg-neutral-800 dark:text-white"
              : "text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
          }`}
        >
          <div className="font-base relative flex flex-row items-center space-x-2 rounded-md px-2 py-1.5 text-sm duration-100">
            {icon}
            <span>{label}</span>
          </div>
        </Link>
      ) : (
        <TooltipProvider delayDuration={70}>
          <Tooltip>
            <TooltipTrigger>
              <Link
                href={path}
                className={`relative flex h-full items-center whitespace-nowrap rounded-md ${
                  active
                    ? "font-base bg-neutral-200 text-sm text-neutral-700 dark:bg-neutral-800 dark:text-white"
                    : "text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                }`}
              >
                <div className="font-base relative flex flex-row items-center space-x-2 rounded-md p-2 text-sm duration-100">
                  {icon}
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              side="left"
              className="px-3 py-1.5 text-xs"
              sideOffset={10}
            >
              <span>{label}</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
};
