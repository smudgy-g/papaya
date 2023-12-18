import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import useDesigner from "@/lib/hooks/useDesigner";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { FormElements } from "./FormElements";

export default function PreviewDialogButton() {
  const { elements } = useDesigner()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="gap-2">
          <DocumentMagnifyingGlassIcon className="w-6 h-6" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-h-screen mawx-w-full flex flex-col flex-grow p-0 gap-0">
        <div className="px-4 py-2 border-b">
          <p className="text-lg font-bold text-muted-foreground">Form Preview</p>
          <p className="text0sm text-muted-foreground">
            This is how your form will look like to your guests.
          </p>
        </div>
        <div className="bg-accent flex flex-col flex-grow items-center justify-center p-4 bg-[url(/assets/jigsaw.svg)]">
          <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background h-full w-full rounded-2xl p-8 overflow-y-auto">
            {
              elements.map(element => {
                const FormComponent = FormElements[element.type].formComponent
                return <FormComponent key={element.id} elementInstance={element} />
              })
            }
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}