import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";

export default function PreviewDialogButton() {
  return (
    <Button variant={"outline"} className="gap-2">
      <DocumentMagnifyingGlassIcon className="w-6 h-6" />
      Preview
    </Button>
  )
}