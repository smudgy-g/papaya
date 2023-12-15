"use client"
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { CgSpinner } from "react-icons/cg"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { toast } from "./ui/use-toast"
import { FormSchemaType, formSchema } from "@/schemas"
import { CreateForm } from "@/actions/form"
import { useRouter } from 'next/navigation'


export default function CreateFormButton() {
  const router = useRouter()
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema)
  })

  async function onSubmit(values: FormSchemaType) {
    console.log(values)
    try {
      const formId = await CreateForm(values)
      toast({
        title: "Success!",
        description: "Form created successfully"
      })
      router.push(`/builder/${formId}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, please try again later.",
        variant: "destructive"
      })
    }
  }

  return(
    <Dialog>
      <DialogTrigger asChild>
        <Button
        variant={"outline"}
          className="group border border-primary/60 h-48 items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
        >
          <PlusCircleIcon
            className="h-10 w-10 text-muted-forground group-hover:text-primary" 
          />
          <p className="font-bold text-muted-forground group-hover:text-primary text-xl">Create new form</p>
          </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Form</DialogTitle>
          <DialogDescription>
            Create a new registration form for your event
          </DialogDescription>
        </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea rows={5} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter>
            <Button 
              disabled={form.formState.isSubmitting} 
              className="w-full mt-4"
              onClick={form.handleSubmit(onSubmit)}
            >
              {!form.formState.isSubmitting && <span>Save</span>}
              {form.formState.isSubmitting && <CgSpinner className="animate-spin w-8 h-8"/>}
            </Button>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}