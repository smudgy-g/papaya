
interface LinkButtonProps {
  children: React.ReactNode
  href: string
}

export default function LinkButton({ children, href }: LinkButtonProps) {
  return (
    <a
      className="py-2 px-3 flex rounded-md no-underline hover:bg-btn-background-hover border w-fit"
      href={href}
      target="_self"
      rel="noreferrer"
    >
      {children}
    </a>
  )
}