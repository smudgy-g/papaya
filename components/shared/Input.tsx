interface InputProps {
  name: string
  type?: 'text' | 'password' | 'email'
  placeholder?: string
  required: boolean
}

export default function Input({ name, type='text', placeholder, required } : InputProps ) {
  return (
    <div className="flex flex-col space-y-6">
      <label className="text-md capitalize text-foreground" htmlFor={name} aria-label={name}>
        {name}:
      </label>
      <input
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      className="rounded-md px-4 py-2 bg-inherit border mb-6 text-foreground"
      />
    </div>
  )
}