"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage ({ error }: { error: Error }) {
  useEffect(() => {
    console.log(error)
  }, [error])

  return (
    <div className="flex flex-col gap-10 items-center justify-center w-full h-full">
      <h2 className="text-destructive text-4xl">Something went wrong!</h2>
      <Button asChild>
        <Link href={"/"}>Go back home</Link>
      </Button>
    </div>
  )
}