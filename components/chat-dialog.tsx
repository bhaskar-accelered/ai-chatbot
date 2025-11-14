"use client";

import { useState, useEffect } from "react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Chat } from "@/components/chat";
import { DataStreamHandler } from "@/components/data-stream-handler";
import { DataStreamProvider } from "@/components/data-stream-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DEFAULT_CHAT_MODEL } from "@/lib/ai/models";
import { generateUUID } from "@/lib/utils";

interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChatDialog({ open, onOpenChange }: ChatDialogProps) {
  const [chatId] = useState(() => generateUUID());
  const [modelId, setModelId] = useState<string>(DEFAULT_CHAT_MODEL);

  useEffect(() => {
    // Get model from cookie
    const cookieModel = document.cookie
      .split("; ")
      .find((row) => row.startsWith("chat-model="))
      ?.split("=")[1];
    if (cookieModel) {
      setModelId(cookieModel);
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh] w-full p-0 flex flex-col">
        <VisuallyHidden.Root>
          <DialogTitle>AI Helper Chat</DialogTitle>
        </VisuallyHidden.Root>
        <DataStreamProvider>
          <SidebarProvider defaultOpen={false}>
            <div className="flex-1 overflow-hidden flex flex-col min-h-0 h-full">
              <div className="h-full overflow-hidden [&>div]:h-full">
                <Chat
                  autoResume={false}
                  id={chatId}
                  initialChatModel={modelId}
                  initialMessages={[]}
                  initialVisibilityType="private"
                  isReadonly={false}
                  key={chatId}
                />
              </div>
              <DataStreamHandler />
            </div>
          </SidebarProvider>
        </DataStreamProvider>
      </DialogContent>
    </Dialog>
  );
}

