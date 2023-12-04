
interface LinkButtonProps {
  children: React.ReactNode
  handleClick: () => void
}

export default function Button({ children, handleClick }: LinkButtonProps) {
  return (
    <button
      className="py-2 px-3 flex rounded-md no-underline text-foreground hover:bg-btn-background-hover border w-fit"
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
