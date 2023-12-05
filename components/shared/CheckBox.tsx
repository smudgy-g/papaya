interface CheckboxProps {
  name: string
  label: string
}

export default function Checkbox ({ name, label }: CheckboxProps) {
  return (
    <div className="flex flex-col space-y-3 items-start w-fit">
      <label 
        htmlFor={name} 
        aria-label={name}
        className="text-md capitalize text-foreground"
      >
          {label}</label>
      <input 
        type="checkbox"
        className="rounded-md p-6 bg-inherit border mb-6 text-foreground"
      />
    </div>
  )
}