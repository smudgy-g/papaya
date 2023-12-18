import { BookmarkIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import useDesigner from "@/lib/hooks/useDesigner";
import { UpdateFormContent } from "@/actions/form";
import { toast } from "./ui/use-toast";
import { useTransition } from "react";
import { CgSpinner } from "react-icons/cg";

export default function SaveFormButton({ id }: { id: number }) {
  const {elements} = useDesigner()
  const [loading, startTransition] = useTransition()
  
  const updateFormContent = async () => {
    try {
      const stringifiedData = JSON.stringify(elements)
      await UpdateFormContent(id, stringifiedData)
      toast({
        title: "Success!",
        description: "Your form has been saved"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive"
      })
    }
  }
  return (
    <Button 
      variant={"outline"} 
      className="gap-2" 
      disabled={loading}
      onClick={updateFormContent}
    >
      {loading ? (
        <CgSpinner className="animate-spin h-6 w-6" />
        ):(
        <BookmarkIcon className="w-6 h-6" />
      )}
      Save
    </Button>
  )
}
