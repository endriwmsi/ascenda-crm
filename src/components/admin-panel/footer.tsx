export function Footer() {
  return (
    <div className="bottom-0 z-20 w-full">
      <div className="flex h-14 items-center justify-center bg-zinc-50 dark:bg-zinc-900/20">
        <p className="text-left text-xs leading-loose text-muted-foreground md:text-sm">
          &copy; {new Date().getFullYear()} All rights reserved. Made with ❤️ by
          Endriw Schiavenato
        </p>
      </div>
    </div>
  );
}
