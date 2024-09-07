import Image from "next/image";
import Link from "next/link";
import { Button } from "./components/ui/button";

export default function Home() {
  return (
    <main className="h-screen w-full">
      <div>
        <Link href={"/dashboard"}>
          <div className="font-base relative flex flex-row items-center space-x-2 rounded-md px-2 py-1.5 text-sm duration-100">
            <span>dashboard</span>
          </div>
        </Link>
      </div>
    </main>
  );
}
