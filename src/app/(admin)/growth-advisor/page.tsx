"use client";

import { ContentLayout } from "@/app/_components/admin-panel/content-layout";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/_components/ui/breadcrumb";
import { Button } from "@/app/_components/ui/button";
import { ScrollArea } from "@/app/_components/ui/scroll-area";

import { useChat } from "ai/react";
import { SendHorizonalIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function DashboardPage() {
  // const sidebar = useStore(useSidebar, (x) => x);
  // if (!sidebar) return null;
  // const { settings, setSettings } = sidebar;

  const { data: session } = useSession();
  const ref = useRef<HTMLDivElement>(null);
  const [companyInfo, setCompanyInfo] = useState<any>(null);

  const { messages, input, handleInputChange, handleSubmit } = useChat();

  useEffect(() => {
    if (ref.current === null) return;
    ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [messages]);

  return (
    <ContentLayout>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Growth Advisor</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <span className="text-3xl font-bold">Growth Advisor</span>

      <div className="flex h-screen flex-1 flex-col space-y-2 overflow-y-hidden py-6 sm:h-fit">
        <div className="flex h-screen max-h-[600px] w-full flex-col justify-between rounded-lg bg-primary-foreground p-4 shadow-lg">
          {/* CHAT */}
          <ScrollArea
            className="h-screen max-h-[500px] rounded-lg bg-background p-4"
            ref={ref}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mt-6 flex items-start ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <Avatar className="mr-2">
                    <AvatarImage src="/path-to-ai-avatar.png" alt="AI Avatar" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`max-w-[75%] rounded-xl p-3 text-sm ${
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {message.content}
                </div>

                {message.role === "user" && (
                  <Avatar className="ml-2">
                    <AvatarImage
                      src={session?.user?.image!}
                      alt={session?.user?.name!}
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </ScrollArea>

          {/* INPUT */}
          <div className="flex items-center gap-2">
            <form
              className="w-full rounded-lg bg-background p-4"
              onSubmit={handleSubmit}
            >
              <input
                className="w-full overflow-y-scroll bg-transparent focus:outline-none"
                value={input}
                placeholder="Digite algo..."
                onChange={handleInputChange}
              />
            </form>

            <Button onClick={handleSubmit} className="h-full">
              <SendHorizonalIcon size={24} />
            </Button>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}
