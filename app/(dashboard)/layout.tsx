import Logo from "@/components/Logo";
import { UserButton } from "@clerk/nextjs";

export default function Layout({ children }: { children: React.ReactNode} ) {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <nav className="flex justify-between items-center border-b border-border h-14 px-4 py-2">
        <Logo />
        <UserButton afterSignOutUrl="/sign-in"/>
      </nav>
      <main className="flex w-full flex-grow">{children}</main>
    </div>
  )
}