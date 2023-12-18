import useDesigner from "@/lib/hooks/useDesigner";
import { FormElements } from "./FormElements";
import { Button } from "./ui/button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Separator } from "./ui/separator";

export default function PropertiesFormSidebar() {
  const { selectedElement, setSelectedElement } = useDesigner()

  if (!selectedElement) return null

  const PropertiesForm = FormElements[selectedElement?.type].propertiesComponent

   return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">Element Properties</p>
        <Button size={"icon"} variant={"ghost"} onClick={() => setSelectedElement(null)}>
          <XMarkIcon className="w-6 h-6"/>
        </Button>
      </div>
      <Separator className="mb-4" />
      <PropertiesForm elementInstance={selectedElement}/>
    </div>
   )
}