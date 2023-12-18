"use client"

import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { ElementsType, FormElement, FormElementInstance } from "../FormElements"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import useDesigner from "@/lib/hooks/useDesigner"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Switch } from "../ui/switch"

const type: ElementsType = "TextField"

const extraAttributes = {
  label: "Text field",
  helperText: "Helper text",
  required: false,
  placeholder: "Type here..."
}

const propertiesSchema = z.object({
  label: z.string().min(4).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeholder: z.string().max(50)
})

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id, 
    type,
    extraAttributes
  }),
  designerBtnElement: {
    icon: PencilSquareIcon,
    label: "Text Field"
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent
}

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes
}

type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>

function PropertiesComponent({
  elementInstance
}: {
  elementInstance: FormElementInstance
}) {
  const { updateElement } = useDesigner()
  const element = elementInstance as CustomInstance
  const { label, helperText, placeholder, required} = element.extraAttributes
  const form = useForm<PropertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      label,
      helperText,
      placeholder,
      required
    }
  })

  useEffect(() => {
    form.reset(element.extraAttributes)
  }, [element, form])

  function applyChanges (data: PropertiesFormSchemaType) {
    const { helperText, label, placeholder, required} = data
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        helperText, label, placeholder, required
      }
    })
  }

  return (
    <Form {...form}>
      <form 
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => e.preventDefault()}
      >
        <FormField
          control={form.control}
          name="label"
          render={({field}) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input {...field} 
                  onKeyDown={(e) => {
                    if (e.key ==="Enter") e.currentTarget.blur()
                  }}
                />
              </FormControl>
              <FormDescription>
                The text label displayed above the field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="placeholder"
          render={({field}) => (
            <FormItem>
              <FormLabel>Placeholder</FormLabel>
              <FormControl>
                <Input {...field} 
                  onKeyDown={(e) => {
                    if (e.key ==="Enter") e.currentTarget.blur()
                  }}
                />
              </FormControl>
              <FormDescription>
                The temporary text displayed in the text field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="helperText"
          render={({field}) => (
            <FormItem>
              <FormLabel>Helper Text</FormLabel>
              <FormControl>
                <Input {...field} 
                  onKeyDown={(e) => {
                    if (e.key ==="Enter") e.currentTarget.blur()
                  }}
                />
              </FormControl>
              <FormDescription>
                The text to help the user input the data displayed below the field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="required"
          render={({field}) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-8">
                <FormLabel>Required</FormLabel>
                <FormDescription>
                  Is this field required to be filled out.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

function FormComponent({
  elementInstance
}: {
  elementInstance: FormElementInstance
}) {
  const element = elementInstance as CustomInstance
  const { label, placeholder, required, helperText } = element.extraAttributes
  return (
    <div className="flex flex-col w-full gap-2">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Input placeholder={placeholder} />
      {helperText && <p className="text-sm text-muted-foreground">{helperText}</p>}
    </div>
  )
}

function DesignerComponent({
  elementInstance
}: {
  elementInstance: FormElementInstance
}) {
  const element = elementInstance as CustomInstance
  const { label, placeholder, required, helperText } = element.extraAttributes
  return (
    <div className="flex flex-col w-full gap-2">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Input readOnly disabled placeholder={placeholder} />
      {helperText && <p className="text-sm text-muted-foreground">{helperText}</p>}
    </div>
  )
}