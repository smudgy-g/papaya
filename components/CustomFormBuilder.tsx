"use client"

import Button from "@/components/shared/Button";
import DatePicker from "@/components/shared/DatePicker";
import HorizontalRule from "@/components/shared/HorizontalRule";
import Input from "@/components/shared/Input";
import { PlusIcon, TrashIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, SyntheticEvent, useState } from "react";

type Input = {
  label: string,
  type: string
}

export default function CustomFormBuilder () {
  const [inputs, setInputs] = useState<Input[]>([{label: '', type: ''}])

  function addInputField (event: SyntheticEvent<HTMLButtonElement>) {
    event.preventDefault()
    setInputs([...inputs, {label: '', type: ''}])
  }

  function deleteInput (index: number, event: SyntheticEvent<HTMLButtonElement>) {
    event.preventDefault()
    const updatedInputs = [...inputs]
    updatedInputs.splice(index, 1)
    setInputs(updatedInputs)
  }

  function handleInputChange (index: number, event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target
    const updatedInputs = [...inputs]
    updatedInputs[index][name as keyof Input] = value
    setInputs(updatedInputs)
  }

  return (
    <>
      <form>
        <h2 className="text-4xl">Event Details</h2>
        <div className="space-y-3 max-w-lg my-6">
          <Input name="title" label="Title" required placeholder="Funding for Fun" />
          <DatePicker label="Date of your event:" name="event-date"/>
          <Input name="description" label="Describe you event" required placeholder="A fundraiser for charity" />
        </div>
        <HorizontalRule />
        <h3 className="text-3xl">Create your registration form</h3>
        <div className="my-4 space-y-3">

          {inputs.map((input, index) => (
            <div 
              key={index}
              className="flex space-x-4 max-h-fit"
            >
              <Input
                label=""
                type="text"
                name="label"
                value={input.label}
                placeholder="eg. Full name or special needs"
                handleChange={(event) => handleInputChange(index, event)}
              />
              <select
                name="type"
                value={input.type}
                className="rounded-md px-4 py-2 bg-inherit border text-foreground"
                onChange={(event) => handleInputChange(index, event)}
              >
                <option value="">Select Input Type</option>
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="email">Email</option>
                <option value="date">Date</option>
              </select>
              <Button handleClick={(event) => deleteInput(index, event)} type="danger">
                <TrashIcon className="w-6" />
              </Button>
            </div>
          ))}
        </div>

          <div className="flex space-x-3">
            <Button handleClick={addInputField} type="secondary">
              <PlusIcon className="w-6" /><span>Add Another Field</span>
            </Button>
            <Button handleClick={addInputField} type="primary">
              <span>Submit</span><ArrowRightIcon className="ml-2 w-6" />
            </Button>
          </div>
      </form>
    </>
  )
}