"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChatDialog } from "@/components/chat-dialog";

export function OpenAiHelperButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} size="lg" type="button">
        Open AI Helper
      </Button>
      <ChatDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}

