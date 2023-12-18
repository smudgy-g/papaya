import { DragEndEvent, useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import DesignerSideBar from "./DesignerSideBar";
import { cn } from "@/lib/utils";
import { ElementsType, FormElementInstance, FormElements } from "./FormElements";
import { useState } from "react";
import useDesigner from "@/lib/hooks/useDesigner";
import { idGenerator } from "@/lib/idGenerator";
import { Button } from "./ui/button";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function Designer() {
  const { elements, addElement, selectedElement, setSelectedElement, removeElement } = useDesigner()
  const droppable = useDroppable({
    id: 'designer-drop-area',
    data: {
      isDesignerDropArea: true
    }
  })

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event

      if (!active || !over) return

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement
      const isDroppingOverDesignerDropArea = over.data?.current?.isDesignerDropArea

      const droppingSidebarBtnOverDesignerArea = isDesignerBtnElement && isDroppingOverDesignerDropArea
      
      if (droppingSidebarBtnOverDesignerArea) {
        const type = active.data?.current?.type
        const newElement = FormElements[type as ElementsType].construct(idGenerator())
        addElement(elements.length, newElement)
        return 
      }

      const isDroppingOverDesignerElementTopHalf = over.data?.current?.isTopHalfDesignerElement
      const isDroppingOverDesignerElementBottomHalf = over.data?.current?.isBottomHalfDesignerElement

      const isDroppingOverDesignerElement = isDroppingOverDesignerElementTopHalf || isDroppingOverDesignerElementBottomHalf

      const droppingSidebarBtnOverDesignerElement = isDesignerBtnElement && isDroppingOverDesignerElement

      if (droppingSidebarBtnOverDesignerElement) {
        const type = active.data?.current?.type
        const newElement = FormElements[type as ElementsType].construct(idGenerator())

        const overId = over.data?.current?.elementId
        const overElementIndex = elements.findIndex((el) => el.id === overId)

        if (overElementIndex === -1) throw new Error("Element not found.")

        let indexForNewElement = overElementIndex

        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = indexForNewElement + 1
        }
        addElement(indexForNewElement, newElement)
        return 
      }

      const isDraggingDesignerElement = active.data?.current?.isDesignerElement
      const draggingDesignerElementOverDesignerElement = isDroppingOverDesignerElement && isDraggingDesignerElement

      if (draggingDesignerElementOverDesignerElement) {
        const activeId = active.data?.current?.elementId
        const overId = over.data?.current?.elementId

        const activeElementIndex = elements.findIndex((el) => el.id === activeId)
        const overElementIndex = elements.findIndex((el) => el.id === overId)

        if (overElementIndex === -1 || activeElementIndex === -1) throw new Error("Element not found.")
        
        const activeElement = { ...elements[activeElementIndex]}
        removeElement(activeId)

        let indexForNewElement = overElementIndex
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = indexForNewElement + 1
        }
        addElement(indexForNewElement, activeElement)
      }
    }
  })

  return (
    <div className="w-full h-full flex">
      <div 
        className="p-4 w-full"
        onClick={() => {
          if (selectedElement) setSelectedElement(null)
        }}  
      >
        <div
          ref={droppable.setNodeRef} 
          className={cn("bg-background max-w-4xl h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
          droppable.isOver && "ring-2 ring-primary/20"
          )}
        >
          {!droppable.isOver &&  elements.length === 0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
              Drop here
            </p>

          )}
          {droppable.isOver && elements.length === 0 && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col w-full gap-2 p-4">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSideBar />
    </div>
  )
}

function DesignerElementWrapper ({ element }: { element: FormElementInstance }) {
  const { removeElement, selectedElement, setSelectedElement } = useDesigner()
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false)
  const topHalf = useDroppable({
    id: `${element.id}-top`,data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true
    }
  })
  
  const bottomHalf = useDroppable({
    id: `${element.id}-bottom`,data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true
    }
  })

  const draggable = useDraggable({
    id: element.id,
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true
    }
  })

  if (draggable.isDragging) return null

  const DesignerElement = FormElements[element.type].designerComponent

  return (
    <div 
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="relative flex h-[120px] flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-insert"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={(el) => {
        el.stopPropagation()
        setSelectedElement(element)}
      }
    >
      <div 
        ref={topHalf.setNodeRef} 
        className="absolute w-full h-1/2 rounded-t-md" 
      />
      <div 
        ref={bottomHalf.setNodeRef} 
        className="absolute w-full bottom-0 h-1/2 rounded-b-md" 
      />
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full">
            <Button 
              className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500" 
              variant={"outline"}
              onClick={() => removeElement(element.id)}
            >
              <TrashIcon className="w-6 h-6 text-white" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm">Click for properties or drag to move</p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-md h-2 bg-primary rounded-b-none"></div>
      )}

      <div className={cn("flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
      mouseIsOver && "opacity-30")}>
        <DesignerElement elementInstance={element}/>
      </div>
      
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-md h-2 bg-primary rounded-t-none"></div>
      )}
    </div>
  )
}