interface DatePickerProps {
  label: string
  name: string
}

export default function DatePicker ({ label, name }: DatePickerProps) {
  const today = new Date().toLocaleString('en-GB')
  return (
    <div className="flex flex-col space-y-2">
      <label 
        aria-label={label} 
        htmlFor={label} 
        className="text-md capitalize text-foreground">
          {label}
      </label>
      <input 
        type="date" 
        id={label} 
        name={name} 
        defaultValue={today}
        min={today}
        className="rounded-md px-4 py-2 bg-inherit border mb-6 text-foreground max-w-[200px]" />
    </div>
  )
}