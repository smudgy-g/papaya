export default function Layout({ children }: { children: React.ReactNode} ) {
  return (
    <div className="flex flex-grow mx-auto">
      {children}
    </div>
  )
}