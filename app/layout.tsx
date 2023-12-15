import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { Toaster } from '@/components/ui/toaster'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

  export const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
  })

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Papaya - AI-integrated registration forms',
  description: 'Create dynamic event registration forms and gain insight and analysis of your guests needs with AI ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
            {children}
            <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
