import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";

export default function PublishFormButton() {
  return (
    <Button variant={"outline"} className="gap-2">
      <DocumentArrowUpIcon className="w-6 h-6" />
      Publish
    </Button>
  )
}