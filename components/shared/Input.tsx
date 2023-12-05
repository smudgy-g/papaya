interface InputProps {
  name: string
  label?: string
  type?: 'text' | 'password' | 'email'
  placeholder?: string
  required?: boolean
  value?: string
  handleChange?: (a: any) => void
}

export default function Input({ label, name, value, type='text', placeholder, required, handleChange } : InputProps ) {
  return (
    <div className="flex flex-col space-y-2">
      {label && <label className="text-md capitalize text-foreground" htmlFor={name} aria-label={name}>
        {label}
      </label>}
      <input
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={handleChange}
      className="rounded-md px-4 py-2 bg-inherit border text-foreground"
      />
    </div>
  )
}