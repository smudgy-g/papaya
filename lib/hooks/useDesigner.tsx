import { DesignerContext } from "@/components/context/DesignerContext"
import { useContext } from "react"

export default function useDesigner() {
  const context = useContext(DesignerContext)

  if (!context) throw new Error('useDesigner must be used within a Designer Context')

  return context
}