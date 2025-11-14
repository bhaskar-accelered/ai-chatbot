import { auth } from "./(auth)/auth";
import { redirect } from "next/navigation";
import { OpenAiHelperButton } from "@/components/open-ai-helper-button";

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/guest");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold">Welcome</h1>
        <p className="text-muted-foreground">
          Click the button below to open the AI Helper
        </p>
        <OpenAiHelperButton />
      </div>
    </div>
  );
}

