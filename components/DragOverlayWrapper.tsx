import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core"
import { useState } from "react"
import { SidebarBtnElementDragOverlay } from "./SidebarButtonElement"
import { ElementsType, FormElements } from "./FormElements"

export default function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState<Active | null>()
  useDndMonitor({
    onDragStart: (event) => {
      console.log("DRAG", event)
      setDraggedItem(event.active)
    },
    onDragCancel: (event) => {
      setDraggedItem(null)
    },
    onDragEnd: (event) => {
      setDraggedItem(null)
    },
  })

  if (!draggedItem) return null

  let node = <div>No Drag overlay</div>
  const isSidebarBtnElement = draggedItem.data?.current?.isDesignerBtnElement
  
  if (isSidebarBtnElement) {
    const type = draggedItem.data?.current?.type as ElementsType
    node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />
  }
  return <DragOverlay>{node}</DragOverlay>
}