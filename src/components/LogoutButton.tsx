"use client"; // penting

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/login" })}
      variant="outline"
      size="sm"
      className="text-red-600 border-red-400 hover:bg-red-100"
    >
      Logout
    </Button>
  );
}