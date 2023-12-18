import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { CgSpinner } from "react-icons/cg";
import { startTransition, useTransition } from "react";
import { toast } from "./ui/use-toast";
import { PublishForm } from "@/actions/form";
import { useRouter } from "next/navigation";

export default function PublishFormButton({ id }: { id: number }) {
  const [loading, startTransition] = useTransition()
  const router = useRouter()

  const publishForm = async () => {
    try {
      await PublishForm(id)
      toast({
        title: 'Success',
        description: 'Your form is now public and open for submissions'
      })
      router.refresh()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive'
      })
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"} className="gap-2">
          <DocumentArrowUpIcon className="w-6 h-6" />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone. After publishing you can no longer edit this form.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault()
              startTransition(publishForm)
            }}
          >Proceed {loading && <CgSpinner />}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}