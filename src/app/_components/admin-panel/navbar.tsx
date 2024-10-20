import { ModeToggle } from "../ui/mode-toggle";
import { SheetMenu } from "./sheet-menu";
import { UserNav } from "./user-nav";

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 w-full shadow backdrop-blur-sm supports-[backdrop-filter]:bg-background/0 dark:shadow-secondary">
      <div className="mx-4 flex h-14 items-center sm:mx-8">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
        </div>
        <div className="flex flex-1 items-center justify-end">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
