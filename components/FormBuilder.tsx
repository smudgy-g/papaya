"use client"

import { Form } from "@prisma/client"
import PreviewDialogButton from "./PreviewDialogButton"
import SaveFormButton from "./SaveFormButton"
import PublishFormButton from "./PublishFormButton"
import Designer from "./Designer"
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import DragOverlayWrapper from "./DragOverlayWrapper"
import { useEffect } from "react"
import useDesigner from "@/lib/hooks/useDesigner"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { toast } from "./ui/use-toast"
import Link from "next/link"
import Confetti from "react-confetti"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"


export default function FormBuilder({ form }: { form: Form }) {
  const { setElements } = useDesigner()
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    }
  })

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5
    }
  })
  const sensors = useSensors(mouseSensor, touchSensor)

  useEffect(() => {
    const elements = JSON.parse(form.content)
    setElements(elements)
  }, [form, setElements])

  const shareUrl = `${window.location.origin}/submit/${form.sharedURL}`
  if (form.published) {
    return (
      <>
      <Confetti 
        height={window.innerHeight}
        width={window.innerWidth}
        recycle={false}
      />

      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="max-w-lg">
          <h1 className="text-center text-4xl font-bold text-primary mb-10">
            🎉🎉🎉 Form Published! 🎉🎉🎉
          </h1>
          <h2 className="text-2xl">Share this form?</h2>
          <h3 className="text-xl text-muted-foreground border-b pb-10">
            Anyone with the link can view and register their details
          </h3>
          <div className="my-4 flex flex-col items-center gap-2 w-full border-b pb-4">
            <Input className="w-full" readOnly value={shareUrl} />
            <Button 
              className="mt-2 w-full" 
              onClick={() => {
                navigator.clipboard.writeText(shareUrl)
                toast({
                  title: "Copied!",
                  description: "Link copied to clipboard"
                })
                }
              }
            >Copy Link</Button>
          </div>
          <div className="flex justify-between">
            <Button asChild variant={"link"} className="gap-2">
              <Link href={"/"} className="gap-2">
                <ArrowLeftIcon className="w-6 h-6" />
                Go Back Home
              </Link>
            </Button>
            <Button asChild variant={"link"} className="gap-2">
              <Link href={`/forms/${form.id}`} className="gap-2">
                Form Details
                <ArrowRightIcon className="w-6 h-6" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      </>
    )
  }
  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full">
        <nav className="flex justify-between border-b-2 py-2 px-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogButton />
            {!form.published && (
              <>
                <SaveFormButton id={form.id} />
                <PublishFormButton id={form.id} />
              </>
            )}
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/assets/jigsaw.svg)]">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  )
}