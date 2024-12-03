"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useChat } from "ai/react";
import { SendHorizonalIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef } from "react";

const GrowtAdvisorPage = () => {
  const { data: session } = useSession();
  const ref = useRef<HTMLDivElement>(null);
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

      <div className="flex flex-1 flex-col space-y-2 overflow-y-hidden py-6 sm:h-fit">
        <div className="flex w-full flex-col justify-between rounded-xl border bg-background p-6 shadow-lg">
          {/* CHAT */}
          <ScrollArea
            className="h-screen max-h-[600px] rounded-xl border bg-zinc-50 p-4 dark:bg-zinc-900/20"
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
                    <AvatarImage
                      src="@/../public/images/avatar-01.jpg"
                      alt="AI Avatar"
                    />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`max-w-[75%] rounded-xl p-3 text-sm ${
                    message.role === "user"
                      ? "bg-background text-foreground"
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
          <div className="mt-2 flex items-center gap-2">
            <form className="w-full" onSubmit={handleSubmit}>
              <Input
                className="overflow-y-scroll bg-transparent focus:outline-none"
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
};

export default GrowtAdvisorPage;
