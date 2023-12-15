import { BookmarkIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";

export default function SaveFormButton() {

  return (
    <Button variant={"outline"} className="gap-2">
      <BookmarkIcon className="w-6 h-6" />
      Save
    </Button>
  )
}
