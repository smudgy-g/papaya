"use client"

import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { ElementsType, FormElement } from "../FormElements"

const type: ElementsType = "TextField"

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id, 
    type,
    extraAttributes: {
      label: "Text field",
      helperText: "Helper text",
      required: false,
      placeholder: "Type here..."
    }
  }),
  designerBtnElement: {
    icon: PencilSquareIcon,
    label: "Text Field"
  },
  designerComponent: () => <div>designer component</div>,
  formComponent: () => <div>form component</div>,
  propertiesComponent: () => <div>porperties component</div>
}