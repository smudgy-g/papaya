"use client"
import { Form } from "@prisma/client"
import PreviewDialogButton from "./PreviewDialogButton"
import SaveFormButton from "./SaveFormButton"
import PublishFormButton from "./PublishFormButton"
import Designer from "./Designer"
import { DndContext } from "@dnd-kit/core"
import DragOverlayWrapper from "./DragOverlayWrapper"
export default function FormBuilder({ form }: { form: Form }) {
  return (
    <DndContext>
      <main className="flex flex-col w-full">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">Form:</span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogButton />
            {!form.published && (
              <>
                <SaveFormButton />
                <PublishFormButton />
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