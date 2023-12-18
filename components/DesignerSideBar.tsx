import useDesigner from "@/lib/hooks/useDesigner";
import { FormElements } from "./FormElements";
import SidebarButtonElement from "./SidebarButtonElement";
import FormElementsSidebar from "./FormElementsSideBar";
import PropertiesFormSidebar from "./PropertiesFormSidebar";

export default function DesignerSideBar() {
  const { selectedElement } = useDesigner()
  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      {
        selectedElement ? (
          <PropertiesFormSidebar />
        ) : (
          <FormElementsSidebar />
        )
      }
    </aside>
  )
}