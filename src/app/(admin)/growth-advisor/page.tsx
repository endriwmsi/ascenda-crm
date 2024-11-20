"use client";
import { ContentLayout } from "@/app/_components/admin-panel/content-layout";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";

import { useChat } from "ai/react";
import { SendHorizonalIcon } from "lucide-react";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  // const sidebar = useStore(useSidebar, (x) => x);
  // if (!sidebar) return null;
  // const { settings, setSettings } = sidebar;

  const { data } = useSession();
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <ContentLayout>
      <div className="flex h-screen flex-1 flex-col space-y-2 overflow-y-hidden py-6 sm:h-fit">
        <div className="flex h-screen max-h-[600px] w-full flex-col justify-between rounded-lg bg-white p-4 shadow-lg">
          {/* CHAT */}
          <div className="h-screen max-h-[500px] overflow-y-scroll rounded-lg bg-background p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-center ${
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
                  className={`max-w-[75%] rounded-lg p-3 text-sm ${
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
                      src={data?.user?.image!}
                      alt={data?.user?.name!}
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div className="flex items-center gap-2">
            <form
              className="w-full rounded-lg bg-zinc-100 p-4"
              onSubmit={handleSubmit}
            >
              <input
                className="bg-transparent focus:outline-none"
                value={input}
                placeholder="Say something..."
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
