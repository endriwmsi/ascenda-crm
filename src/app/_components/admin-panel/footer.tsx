export function Footer() {
  return (
    <div className="z-20 w-full">
      <div className="mx-4 flex h-14 items-center justify-center md:mx-8">
        <p className="text-left text-xs leading-loose text-muted-foreground md:text-sm">
          &copy; {new Date().getFullYear()} All rights reserved. Made with ❤️ by
          Endriw Schiavenato
        </p>
      </div>
    </div>
  );
}
