"use client"

import Button from "@/components/shared/Button";
import HorizontalRule from "@/components/shared/HorizontalRule";
import Input from "@/components/shared/Input";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function CreatePage () {
  function addInputField () {
    console.log('button clicked')
  }

  return (
    <main>
      <header className="mb-12">
        <h1 className="text-4xl">Create Page</h1>
      </header>
      <section>
        <h2 className="text-2xl">Event Details</h2>
        <div className="space-y-2 max-w-lg my-6">
          <Input name="name" required placeholder="Event Name" />
          <Input name="name" required placeholder="Event Name" />
          <Input name="name" required placeholder="Event Name" />
          <Input name="name" required placeholder="Event Name" />

        </div>
        <HorizontalRule />
        <Button handleClick={addInputField}>
          <PlusIcon className="w-6" /><span>Add Field</span>
        </Button>
      </section>
    </main>
  )
}